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
  getPrices: { ...universalState, prices: {} },
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
  },
});

export const updatePrices = (prices) => async (dispatch) => {
  dispatch(priceSlice.actions.updatePrices({ loading: true, tried: true }));

  call({ url: `/prices/updatePrices`, data: prices, method: "POST" })
    .then((response) => {
      dispatch(getPrices());
      success(dispatch, priceSlice.actions.updatePrices);
      dispatch(
        showNotification("Prices have been updated!", INFO_TYPES.SUCCESS)
      );
    })
    .catch((error) => {
      fail(dispatch, priceSlice.actions.updatePrices, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
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
