import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  popUpNotifications: [], // { id, type, head, body, appIcon }
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { type, head, body, notifIcon } = action.payload;
      const newNotification = { id: uuidv4(), type, head, body, notifIcon };

      state.popUpNotifications.push(newNotification);
    },

    removeNotification: (state, action) => {
      // action.payload = id
      state.popUpNotifications = state.popUpNotifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
