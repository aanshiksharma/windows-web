import { configureStore } from "@reduxjs/toolkit";

import appsReducer from "./slices/appsSlice";
import windowReducer from "./slices/windowSlice";
import taskbarReducer from "./slices/taskbarSlice";
import desktopReducer from "./slices/desktopSlice";

const store = configureStore({
  reducer: {
    apps: appsReducer,
    window: windowReducer,
    taskbar: taskbarReducer,
    desktop: desktopReducer,
  },
});

export default store;
