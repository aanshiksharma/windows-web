import { configureStore } from "@reduxjs/toolkit";

import appsReducer from "./slices/appsSlice";
import windowReducer from "./slices/windowSlice";

const store = configureStore({
  reducer: {
    apps: appsReducer,
    window: windowReducer,
  },
});

export default store;
