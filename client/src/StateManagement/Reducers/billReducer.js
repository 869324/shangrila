import { createSlice } from "@reduxjs/toolkit";
import { INFO_TYPES } from "../../Constants/constants";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showNotification } from "./notificationReducer";

const universalState = {
  tried: false,
  loading: false,
  status: false,
  error: null,
};

const initialState = {
  getBills: { ...universalState, bills: null },
  pay: { ...universalState },
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    pay(state, action) {
      return {
        ...state,
        pay: { ...state.pay, ...action.payload },
      };
    },

    getBills(state, action) {
      return {
        ...state,
        getBills: { ...state.getBills, ...action.payload },
      };
    },

    universalReset(state, action) {
      const target = action.payload.state;
      return {
        ...state,
        [target]: {
          ...state[target],
          tried: false,
          loading: false,
          status: false,
          error: null,
        },
      };
    },
  },
});

export const pay = (bill) => async (dispatch) => {
  dispatch(billSlice.actions.pay({ loading: true, tried: true }));

  call({ url: `/bill/pay`, data: bill, method: "POST" })
    .then((response) => {
      success(dispatch, billSlice.actions.pay);
      dispatch(showNotification("Payment successfull", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, billSlice.actions.pay, error);
      dispatch(
        showNotification(error.response.data.message || "Internal Server Error")
      );
    });
};

export const getBills = (userId) => async (dispatch) => {
  dispatch(billSlice.actions.getBills({ loading: true, tried: true }));

  call({ url: `/bill/get`, data: { id: userId }, method: "POST" })
    .then((response) => {
      success(dispatch, billSlice.actions.getBills);
      dispatch(
        billSlice.actions.getBills({
          bills: response.data,
        })
      );
    })
    .catch((error) => {
      fail(dispatch, billSlice.actions.getBills, error);
    });
};

export const billReset = (state) => async (dispatch) => {
  dispatch(billSlice.actions.universalReset({ state: state }));
};

export default billSlice.reducer;
