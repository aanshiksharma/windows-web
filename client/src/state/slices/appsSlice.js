import { createSlice } from "@reduxjs/toolkit";

const appsSlice = createSlice({
  name: "apps",
  initialState: {
    installedApps: [], // [{id, icon, component}]
  },
  reducers: {
    installApp: (state, action) => {
      state.installedApps.push(action.payload);
    },

    uninstallApp: (state, action) => {
      state.installedApps = state.installedApps.filter((app) => {
        return app.id === action.payload;
      });
    },
  },
});

export const { installApp, uninstallApp } = appsSlice.actions;
export default appsSlice.reducer;
