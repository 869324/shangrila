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
  getPropertyTypes: { ...universalState, propertyTypes: [] },
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    getPropertyTypes(state, action) {
      return {
        ...state,
        getPropertyTypes: { ...state.getPropertyTypes, ...action.payload },
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

export const getPropertyTypes = () => async (dispatch) => {
  dispatch(utilsSlice.actions.getPropertyTypes({ loading: true }));

  call({ url: `/utils/getPropertyTypes`, data: {}, method: "GET" })
    .then((response) => {
      success(dispatch, utilsSlice.actions.getPropertyTypes);
      dispatch(
        utilsSlice.actions.getPropertyTypes({ propertyTypes: response.data })
      );
    })
    .catch((error) => {
      fail(dispatch, utilsSlice.actions.getPropertyTypes, error);
    });
};

export default utilsSlice.reducer;
