import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinnedApps: ["explorer", "readme"], // array of appIds
  openApps: [], // { appId, openWindowsCount, isFocused }
};

const taskbarSlice = createSlice({
  name: "taskbar",
  initialState,
  reducers: {
    pinApp: (state, action) => {
      // action.payload = appId
      state.pinnedApps.push(action.payload);
    },

    unpinApp: (state, action) => {
      // action.payload = appId
      state.pinnedApps.filter((app) => app !== action.payload);
    },

    openApp: (state, action) => {
      // action.payload = appId
      const app = state.openApps.find((app) => app.appId === action.payload);

      // Unfocus all the apps
      state.openApps.forEach((app) => (app.isFocused = false));

      if (app) {
        app.openWindowsCount++;
        app.isFocused = true;
      } else {
        state.openApps.push({
          appId: action.payload,
          openWindowsCount: 1,
          isFocused: true,
        });
      }
    },

    closeApp: (state, action) => {
      // action.payload = appId
      const app = state.openApps.find((app) => app.appId === action.payload);

      app.openWindowsCount--;

      if (app.openWindowsCount <= 0) {
        state.openApps = state.openApps.filter(
          (app) => app.appId !== action.payload
        );
      }
    },

    focusApp: (state, action) => {
      const app = state.openApps.find((app) => app.appId === action.payload);

      // Unfocus all the apps
      state.openApps.forEach((app) => (app.isFocused = false));

      if (app) app.isFocused = true;
    },

    unFocusApp: (state, action) => {
      const app = state.openApps.find((app) => app.appId === action.payload);

      app.isFocused = false;
    },

    unFocusAllApps: (state) => {
      state.openApps.forEach((app) => (app.isFocused = false));
    },
  },
});

export const {
  pinApp,
  unpinApp,
  openApp,
  closeApp,
  focusApp,
  unFocusApp,
  unFocusAllApps,
} = taskbarSlice.actions;

export default taskbarSlice.reducer;
