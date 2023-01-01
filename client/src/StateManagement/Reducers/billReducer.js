import { createSlice } from "@reduxjs/toolkit";
import { INFO_TYPES } from "../../Constants/constants";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showNotification } from "./notificationReducer";

const universalState = {
  loading: false,
  status: false,
};

const initialState = {
  getBills: { ...universalState, bills: [] },
  pay: { ...universalState, currentBill: {} },
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
  },
});

export const pay = (bill) => async (dispatch) => {
  dispatch(
    billSlice.actions.pay({ loading: true, tried: true, currentBill: bill })
  );

  call({ url: `/bills/pay`, data: bill, method: "POST" })
    .then((response) => {
      dispatch(billSlice.actions.pay({ currentBill: {} }));
      success(dispatch, billSlice.actions.pay);
      dispatch(getBills(bill.userId));
      dispatch(showNotification("Payment successfull", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      dispatch(billSlice.actions.pay({ currentBill: {} }));
      fail(dispatch, billSlice.actions.pay, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
      );
    });
};

export const getBills = (userId) => async (dispatch) => {
  dispatch(billSlice.actions.getBills({ loading: true, tried: true }));

  call({ url: `/bills/getBills`, data: { userId }, method: "POST" })
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

export default billSlice.reducer;
