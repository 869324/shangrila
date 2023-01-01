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
  create: { ...universalState },
  getUserReadings: { ...universalState, readings: [] },
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

    getUserReadings(state, action) {
      return {
        ...state,
        getUserReadings: { ...state.getUserReadings, ...action.payload },
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

export const createReading = (reading) => async (dispatch) => {
  dispatch(readingSlice.actions.create({ loading: true, tried: true }));

  call({ url: `/readings/create`, data: reading, method: "POST" })
    .then((response) => {
      success(dispatch, readingSlice.actions.create);
      dispatch(
        showNotification("Readings have been submitted", INFO_TYPES.SUCCESS)
      );
    })
    .catch((error) => {
      fail(dispatch, readingSlice.actions.create, error);
      dispatch(
        showNotification(error.response.data.message || "Internal Server Error")
      );
    });
};

export const getUserReadings = (userId) => async (dispatch) => {
  dispatch(
    readingSlice.actions.getUserReadings({ loading: true, tried: true })
  );

  call({ url: `/readings/getUserReadings/${userId}`, data: {}, method: "GET" })
    .then((response) => {
      dispatch(
        readingSlice.actions.getUserReadings({ readings: response.data })
      );
      success(dispatch, readingSlice.actions.getUserReadings);
    })
    .catch((error) => {
      fail(dispatch, readingSlice.actions.getUserReadings, error);
    });
};

export default readingSlice.reducer;
