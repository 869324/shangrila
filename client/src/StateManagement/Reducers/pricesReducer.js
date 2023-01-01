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
  getPrices: { ...universalState, prices: null },
  updatePrices: { ...universalState },
};

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    updatePrices(state, action) {
      return {
        ...state,
        updatePrices: { ...state.updatePrices, ...action.payload },
      };
    },

    getPrices(state, action) {
      return {
        ...state,
        getPrices: { ...state.getPrices, ...action.payload },
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

export const updatePrices = (prices) => async (dispatch) => {
  dispatch(priceSlice.actions.updatePrices({ loading: true, tried: true }));

  call({ url: `/prices/updatePrices`, data: prices, method: "POST" })
    .then((response) => {
      success(dispatch, priceSlice.actions.updatePrices);
      dispatch(
        showNotification("Prices have been updated!", INFO_TYPES.SUCCESS)
      );
    })
    .catch((error) => {
      fail(dispatch, priceSlice.actions.updatePrices, error);
      dispatch(
        showNotification(error.response.data.message || "Internal Server Error")
      );
    });
};

export const getPrices = () => async (dispatch) => {
  dispatch(priceSlice.actions.getPrices({ loading: true, tried: true }));

  call({ url: `/prices/getPrices`, data: {}, method: "GET" })
    .then((response) => {
      success(dispatch, priceSlice.actions.getPrices);
      dispatch(
        priceSlice.actions.getPrices({
          prices: response.data,
        })
      );
    })
    .catch((error) => {
      fail(dispatch, priceSlice.actions.getPrices, error);
    });
};

export default priceSlice.reducer;
