import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "window",
  initialState: {
    openWindows: [], // [{id, appName, zIndex, position, size}]
    appRegistry: {
      readme: {
        id: "readme",
        title: "README.md",
        component: "ReadmeApp",
      },
      highestZ: 10,
    },
  },
  reducers: {
    openWindow: (state, action) => {
      const newWindow = {
        ...action.payload,
        id: Date.now(),
        zIndex: ++state.highestZ,
      };
      state.openWindows.push(newWindow);
    },

    closeWindow: (state, action) => {
      state.openWindows = state.openWindows.filter((window) => {
        return window.id === action.payload;
      });
    },

    focusWindow: (state, action) => {
      const window = state.openWindows.find((window) => {
        window.id === action.payload;
      });

      if (window) {
        window.zIndex = ++state.highestZ;
      }
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
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  resizeWindow,
  moveWindow,
} = windowSlice.actions;
export default windowSlice.reducer;
