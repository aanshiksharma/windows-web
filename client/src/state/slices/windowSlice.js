import { createSlice } from "@reduxjs/toolkit";
import { setTaskbarAppUnFocus } from "./taskbarSlice";

import { v4 as uuidv4 } from "uuid";

const windowSlice = createSlice({
  name: "window",
  initialState: {
    openWindows: [], // [{appId, icon, bootstrapIcon, id, isMinimized, transform, title, zIndex, position, size}]
    highestZ: 5,
  },
  reducers: {
    openWindow: (state, action) => {
      const newWindow = {
        ...action.payload,
        id: uuidv4(),
        zIndex: ++state.highestZ,
        isMinimized: false,
      };
      state.openWindows.push(newWindow);
    },

    closeWindow: (state, action) => {
      state.openWindows = state.openWindows.filter(
        (window) => window.appId !== action.payload
      );
    },

    focusWindow: (state, action) => {
      const win = state.openWindows.find(
        (window) => window.appId === action.payload
      );

      if (win) win.zIndex = ++state.highestZ;
    },

    moveWindow: (state, action) => {
      const { id, position } = action.payload;
      const window = state.openWindows.find((window) => window.id === id);
      if (window) window.position = position;
    },

    resizeWindow: (state, action) => {
      const { id, size } = action.payload;
      const window = state.openWindows.find((window) => window.id === id);
      if (window) window.size = size;
    },

    minimizeWindow: (state, action) => {
      const win = state.openWindows.find(
        (window) => window.appId === action.payload
      );

      if (win) win.isMinimized = true;
    },

    maximizeWindow: (state, action) => {
      const win = state.openWindows.find(
        (window) => window.appId === action.payload
      );

      if (win) win.isMinimized = false;
    },
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  resizeWindow,
  moveWindow,
  minimizeWindow,
  maximizeWindow,
} = windowSlice.actions;

export default windowSlice.reducer;
