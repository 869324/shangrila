import { createSlice } from "@reduxjs/toolkit";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showNotification } from "./notificationReducer";
import { INFO_TYPES } from "../../Constants/constants";

const universalState = {
  loading: false,
  status: false,
};

const initialState = {
  getUsers: { ...universalState, users: [] },
  signup: { ...universalState },
  login: { ...universalState, token: null },
  verifyToken: { ...universalState, isValid: false },
  getUserData: { ...universalState, user: {} },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      return {
        ...state,
        login: { ...state.login, ...action.payload },
      };
    },

    verifyToken(state, action) {
      return {
        ...state,
        verifyToken: { ...state.verifyToken, ...action.payload },
      };
    },

    getUserData(state, action) {
      return {
        ...state,
        getUserData: { ...state.getUserData, ...action.payload },
      };
    },

    logout(state, action) {
      return {
        ...state,
        login: initialState.login,
        verifyToken: initialState.verifyToken,
        getUserData: initialState.getUserData,
      };
    },

    getUsers(state, action) {
      return {
        ...state,
        getUsers: { ...state.getUsers, ...action.payload },
      };
    },

    signup(state, action) {
      return {
        ...state,
        signup: { ...state.signup, ...action.payload },
      };
    },
    universalReset(state, action) {
      const target = action.payload.state;
      return {
        ...state,
        [target]: {
          ...state[target],
          loading: false,
          status: false,
        },
      };
    },
  },
});

export const login = (user) => async (dispatch) => {
  dispatch(userSlice.actions.login({ loading: true, tried: true }));

  call({ url: `/public/login`, data: user, method: "POST" })
    .then((response) => {
      dispatch(
        userSlice.actions.login({
          token: response.data,
        })
      );
      localStorage.setItem("token", response.data);
      success(dispatch, userSlice.actions.login);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.login, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
      );
    });
};

export const verifyToken = (token) => async (dispatch) => {
  dispatch(userSlice.actions.verifyToken({ loading: true, tried: true }));

  call({
    url: `/public/verifyToken`,
    data: { token },
    method: "POST",
  })
    .then((response) => {
      console.log(response.status);
      if (response.data) {
        dispatch(
          userSlice.actions.verifyToken({
            isValid: true,
          })
        );
        success(dispatch, userSlice.actions.verifyToken);
      } else {
        localStorage.removeItem("token");
        dispatch(
          userSlice.actions.verifyToken({
            isValid: false,
            tried: true,
            loading: false,
            status: false,
            error: null,
          })
        );
      }
    })
    .catch((error) => {
      localStorage.removeItem("token");
      dispatch(
        userSlice.actions.verifyToken({
          isValid: false,
        })
      );
      fail(dispatch, userSlice.actions.verifyToken, error);
    });
};

export const getUserData = (token) => async (dispatch) => {
  dispatch(userSlice.actions.getUserData({ loading: true, tried: true }));

  call({ url: `/users/getUserData`, data: { token }, method: "POST" })
    .then((response) => {
      dispatch(
        userSlice.actions.getUserData({
          user: response.data,
        })
      );
      success(dispatch, userSlice.actions.getUserData);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.getUserData, error);
    });
};

export const getUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.getUsers({ loading: true, tried: true }));

  call({ url: `/users/getUsers`, data: {}, method: "GET" })
    .then((response) => {
      dispatch(
        userSlice.actions.getUsers({
          users: response.data,
        })
      );
      success(dispatch, userSlice.actions.getUserData);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.getUserData, error);
    });
};

export const signup = (user) => async (dispatch) => {
  dispatch(userSlice.actions.signup({ loading: true, tried: true }));

  call({ url: `/public/createUser`, data: user, method: "POST" })
    .then((response) => {
      success(dispatch, userSlice.actions.signup);
      dispatch(showNotification("Sign up successful!", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.signup, error);
      dispatch(
        showNotification(error.response.data || "Internal Server Error")
      );
    });
};

export const userReset = (state) => async (dispatch) => {
  dispatch(userSlice.actions.universalReset({ state: state }));
};

export const logout = (state) => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(userSlice.actions.logout({ state: state }));
};

export default userSlice.reducer;
