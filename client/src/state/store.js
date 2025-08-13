import { configureStore } from "@reduxjs/toolkit";

import appsReducer from "./slices/appsSlice";
import windowReducer from "./slices/windowSlice";
import taskbarReducer from "./slices/taskbarSlice";
import usersReducer from "./slices/usersSlice";
import notificationsReducer from "./slices/notificationsSlice";

const store = configureStore({
  reducer: {
    apps: appsReducer,
    window: windowReducer,
    taskbar: taskbarReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export default store;
