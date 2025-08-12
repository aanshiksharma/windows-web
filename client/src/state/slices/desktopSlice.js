import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  desktopApps: ["this-pc", "recycle-bin", "readme"],
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.desktopApps.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.desktopApps = state.desktopApps.filter(app !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = desktopSlice.actions;

export default desktopSlice.reducer;
