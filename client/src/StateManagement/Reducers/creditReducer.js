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
  topup: { ...universalState },
};

const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    topup(state, action) {
      return {
        ...state,
        topup: { ...state.topup, ...action.payload },
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

export const topup = (credit) => async (dispatch) => {
  dispatch(creditSlice.actions.topup({ loading: true, tried: true }));

  call({ url: `/credit/topup`, data: credit, method: "POST" })
    .then((response) => {
      success(dispatch, creditSlice.actions.topup);
      dispatch(showNotification("Credit has been added", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, creditSlice.actions.topup, error);
      dispatch(
        showNotification(error.response.data.message || "Internal Server Error")
      );
    });
};

export default creditSlice.reducer;
