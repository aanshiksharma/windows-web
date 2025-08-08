import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  pinnedApps: [
    {
      id: uuidv4(),
      appId: "explorer",
      icon: "/icons/explorer.png",
      bootstrapIcon: null,
      isFocused: false,
      isOpen: false,
    },
  ],
};

const unFocus = (apps) => {
  apps.forEach((app) => {
    app.isFocused = false;
  });
};

const taskbarSlice = createSlice({
  name: "taskbar",
  initialState, // [ { id, appId, icon, bootstrapIcon, isFocused, isOpen } ]
  reducers: {
    addToPinnedApps: (state, action) => {
      const newApp = {
        id: uuidv4(),
        appId: action.payload.id,
        ...action.payload,
      };

      unFocus(state.pinnedApps);

      state.pinnedApps.push(newApp);
    },

    removeFromPinnedApps: (state, action) => {
      state.pinnedApps = state.pinnedApps.filter(
        (pinnedApp) => pinnedApp.appId !== action.payload
      );
    },

    setTaskbarAppFocus: (state, action) => {
      unFocus(state.pinnedApps);

      const app = state.pinnedApps.find(
        (pinnedApp) => pinnedApp.appId === action.payload
      );

      if (app) app.isFocused = true;
    },

    setTaskbarAppUnFocus: (state, action) => {
      const app = state.pinnedApps.find(
        (pinnedApp) => pinnedApp.appId === action.payload
      );

      if (app) app.isFocused = false;
    },

    setTaskbarAppOpen: (state, action) => {
      const { appId, isOpen } = action.payload;

      const app = state.pinnedApps.find(
        (pinnedApp) => pinnedApp.appId === appId
      );

      if (app) app.isOpen = isOpen;
    },
  },
});

export const {
  addToPinnedApps,
  removeFromPinnedApps,
  setTaskbarAppFocus,
  setTaskbarAppUnFocus,
  setTaskbarAppOpen,
} = taskbarSlice.actions;

export default taskbarSlice.reducer;
