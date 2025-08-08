import { configureStore } from "@reduxjs/toolkit";

import appsReducer from "./slices/appsSlice";
import windowReducer from "./slices/windowSlice";
import taskbarReducer from "./slices/taskbarSlice";

const store = configureStore({
  reducer: {
    apps: appsReducer,
    window: windowReducer,
    taskbar: taskbarReducer,
  },
});

export default store;
