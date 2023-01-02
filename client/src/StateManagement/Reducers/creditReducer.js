import { createSlice } from "@reduxjs/toolkit";
import { INFO_TYPES } from "../../Constants/constants";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showNotification } from "./notificationReducer";
import { getUserData } from "./userReducer";

const universalState = {
  loading: false,
  status: false,
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
  },
});

export const topup = (credit) => async (dispatch) => {
  dispatch(creditSlice.actions.topup({ loading: true, tried: true }));

  call({ url: `/users/topup`, data: credit, method: "POST" })
    .then((response) => {
      const token = localStorage.getItem("token");
      dispatch(getUserData(token));
      success(dispatch, creditSlice.actions.topup);
      dispatch(showNotification("Topup successful!", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, creditSlice.actions.topup, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
      );
    });
};

export default creditSlice.reducer;
