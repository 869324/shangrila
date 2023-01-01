import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/userReducer";
import modalReducer from "../Reducers/modalReducer";
import notificationReducer from "../Reducers/notificationReducer";
import readingReducer from "../Reducers/readingReducer";
import creditReducer from "../Reducers/creditReducer";
import billReducer from "../Reducers/billReducer";
import pricesReducer from "../Reducers/pricesReducer";
import statsReducer from "../Reducers/statsReducer";
import utilsReducer from "../Reducers/utilsReducer";

const appReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  notification: notificationReducer,
  reading: readingReducer,
  credit: creditReducer,
  bill: billReducer,
  prices: pricesReducer,
  stats: statsReducer,
  utils: utilsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
