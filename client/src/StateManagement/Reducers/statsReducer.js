import { createSlice } from "@reduxjs/toolkit";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";

const universalState = {
  tried: false,
  loading: false,
  status: false,
  error: null,
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

export const getStats = () => async (dispatch) => {
  dispatch(statsSlice.actions.getStats({ loading: true, tried: true }));

  call({ url: `/statistics/getStats`, data: {}, method: "GET" })
    .then((response) => {
      dispatch(statsSlice.actions.getStats({ stats: response.data }));
      success(dispatch, statsSlice.actions.getStats);
    })
    .catch((error) => {
      fail(dispatch, statsSlice.actions.getStats, error);
    });
};

export default statsSlice.reducer;
