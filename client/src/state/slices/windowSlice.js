import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const windowSlice = createSlice({
  name: "window",
  initialState: {
    openWindows: [],
  },
  reducers: {
    openWindow: (state, action) => {
      // action.payload = { appId, title }
      const { appId, title } = action.payload;

      const newWindow = {
        windowId: uuidv4(),
        appId,
        title: title || appId,
        position: {
          top: `${30 + state.openWindows.length * 50}px`,
          left: `${80 + state.openWindows.length * 50}px`,
        },
        size: { width: "800px", height: "600px" },
        zIndex: state.openWindows.length
          ? Math.max(...state.openWindows.map((win) => win.zIndex)) + 1
          : 1,
        isFocused: true,
        isMinimized: false,
        isMaximized: false,
        createdAt: Date.now(),
      };

      // Unfocus all pre-existing windows
      state.openWindows.forEach((window) => (window.isFocused = false));

      // Add the new window
      state.openWindows.push(newWindow);
    },

    closeWindow: (state, action) => {
      // action.payload = windowId
      state.openWindows = state.openWindows.filter(
        (window) => window.windowId !== action.payload
      );
    },

    focusWindow: (state, action) => {
      // action.payload = windowId
      const window = state.openWindows.find(
        (win) => win.windowId === action.payload
      );

      if (window) {
        // Unfocus all pre-existing windows
        state.openWindows.forEach((win) => (win.isFocused = false));

        window.isFocused = true;
        window.zIndex =
          Math.max(...state.openWindows.map((win) => win.zIndex)) + 1;
      }
    },

    unFocusAllWindows: (state) => {
      state.openWindows.forEach((window) => (window.isFocused = false));
    },

    minimizeWindow: (state, action) => {
      // action.payload = windowId
      const window = state.openWindows.find(
        (win) => win.windowId === action.payload
      );

      if (window) {
        window.isFocused = false;
        window.isMinimized = true;
      }
    },

    unMinimizeWindow: (state, action) => {
      // action.payload = windowId
      const window = state.openWindows.find(
        (win) => win.windowId === action.payload
      );

      // Unfocus all pre-existing windows0
      state.openWindows.forEach((window) => (window.isFocused = false));

      window.isFocused = true;
      window.isMinimized = false;
    },
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  unFocusAllWindows,
  minimizeWindow,
  unMinimizeWindow,
} = windowSlice.actions;

export default windowSlice.reducer;
