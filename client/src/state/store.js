import { configureStore } from "@reduxjs/toolkit";

import appsReducer from "./slices/appsSlice";
import windowReducer from "./slices/windowSlice";
import taskbarReducer from "./slices/taskbarSlice";
import usersReducer from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    apps: appsReducer,
    window: windowReducer,
    taskbar: taskbarReducer,
    users: usersReducer,
  },
});

export default store;
