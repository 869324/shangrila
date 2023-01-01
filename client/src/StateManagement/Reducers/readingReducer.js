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
  create: { ...universalState },
  getReadings: { ...universalState, readings: [] },
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    create(state, action) {
      return {
        ...state,
        create: { ...state.create, ...action.payload },
      };
    },

    getReadings(state, action) {
      return {
        ...state,
        getReadings: { ...state.getReadings, ...action.payload },
      };
    },
  },
});

export const createReading = (reading) => async (dispatch) => {
  dispatch(readingSlice.actions.create({ loading: true, tried: true }));

  call({ url: `/readings/create`, data: reading, method: "POST" })
    .then((response) => {
      success(dispatch, readingSlice.actions.create);
      dispatch(showNotification("Submission successful", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, readingSlice.actions.create, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
      );
    });
};

export const getReadings = (userId) => async (dispatch) => {
  dispatch(readingSlice.actions.getReadings({ loading: true, tried: true }));

  call({ url: `/readings/getReadings`, data: { userId }, method: "POST" })
    .then((response) => {
      dispatch(readingSlice.actions.getReadings({ readings: response.data }));
      success(dispatch, readingSlice.actions.getReadings);
    })
    .catch((error) => {
      fail(dispatch, readingSlice.actions.getReadings, error);
    });
};

export default readingSlice.reducer;
