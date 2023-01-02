import { createSlice } from "@reduxjs/toolkit";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";

const universalState = {
  loading: false,
  status: false,
};

const initialState = {
  getStats: { ...universalState, stats: {} },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    getStats(state, action) {
      return {
        ...state,
        getStats: { ...state.getStats, ...action.payload },
      };
    },
  },
});

export const getStats = () => async (dispatch) => {
  dispatch(statsSlice.actions.getStats({ loading: true, tried: true }));

  call({ url: `/stats/getStats`, data: {}, method: "GET" })
    .then((response) => {
      dispatch(statsSlice.actions.getStats({ stats: response.data }));
      success(dispatch, statsSlice.actions.getStats);
    })
    .catch((error) => {
      fail(dispatch, statsSlice.actions.getStats, error);
    });
};

export default statsSlice.reducer;
