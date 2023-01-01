import { createSlice } from "@reduxjs/toolkit";
import { INFO_TYPES } from "../../Constants/constants";

const initialState = {
  show: false,
  message: "",
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const { type, message } = action.payload;
      return { show: true, type, message };
    },

    resetNotification(state, action) {
      return initialState;
    },
  },
});

export const showNotification = (message, type) => async (dispatch) => {
  dispatch(
    notificationSlice.actions.showNotification({
      type: type || INFO_TYPES.ERROR,
      message,
    })
  );
};

export const { resetNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
