import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  allUsers: JSON.parse(localStorage.getItem("users")) || [], // usernames will be unique
  guestUser: JSON.parse(sessionStorage.getItem("guest")) || null,
  currentUser: JSON.parse(sessionStorage.getItem("current-user")) || null,
};

const randomNumber = Math.floor(1000 + Math.random() * 8999);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // =============
    // AUTH REDUCERS
    // =============
    signupUser: (state, action) => {
      const { name, username, password } = action.payload;
      const newUser = {
        id: uuidv4(),
        name,
        username,
        password,
        preferences: {
          theme: "dark",
          desktopWallpaper: "/wallpapers/default.jpg",
          lockScreenWallpaper: "/wallpapers/default.jpg",
        },
        layout: {
          desktopApps: ["this-pc", "recycle-bin", "readme"],
          taskbarPinnedApps: ["explorer", "readme"], // order of items matters
          startMenuPinnedApps: ["explorer", "settings", "readme"],
        },
        installedApps: [], // subset of appsSlice
      };

      state.allUsers.push(newUser);
      state.currentUser = newUser;

      localStorage.setItem("users", JSON.stringify(state.allUsers));
      sessionStorage.setItem("current-user", JSON.stringify(state.currentUser));
    },

    deleteUser: (state, action) => {
      // action.payload = id
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== action.payload
      );
    },

    loginUser: (state, action) => {
      // action.payload = username

      const currUser = state.allUsers.find(
        (user) => user.username === action.payload
      );

      if (currUser) {
        state.currentUser = currUser;
        sessionStorage.setItem(
          "current-user",
          JSON.stringify(state.currentUser)
        );
      }
    },

    guestLogin: (state) => {
      const newGuest = {
        id: uuidv4(),
        name: "Guest",
        username: `guest-${randomNumber}`, // includes a random number for uniqueness
        password: "",
        preferences: {
          theme: "dark",
          desktopWallpaper: "/wallpapers/default.jpg",
          lockScreenWallpaper: "/wallpapers/default.jpg",
        },
        layout: {
          desktopApps: ["this-pc", "recycle-bin", "readme"],
          taskbarPinnedApps: ["explorer", "readme"], // order of items matters
          startMenuPinnedApps: ["explorer", "settings", "readme"],
        },
        installedApps: [],
      };

      state.guestUser = newGuest;
      state.currentUser = newGuest;

      sessionStorage.setItem("guest", JSON.stringify(state.guestUser));
      sessionStorage.setItem("current-user", JSON.stringify(state.currentUser));
    },

    // =========================
    // USER DATA CONFIG REDUCERS
    // =========================

    // TASKBAR

    pinToTaskBar: (state, action) => {
      // action.paylaod = appId
      state.currentUser.layout.taskbarPinnedApps.push(action.payload);

      persistUser(state);
    },

    unPinFromTaskbar: (state, action) => {
      // action.paylaod = appId
      state.currentUser.layout.taskbarPinnedApps =
        state.currentUser.layout.taskbarPinnedApps.filter(
          (app) => app !== action.payload
        );

      persistUser(state);
    },

    // STARTMENU

    pinToStart: (state, action) => {},
  },
});

// Helper function to persist changes for currentUser
function persistUser(state) {
  // Update in allUsers
  state.allUsers = state.allUsers.map(
    (user) => user.id === state.currentUser.id && state.currentUser
  );

  localStorage.setItem("users", JSON.stringify(state.allUsers));
  sessionStorage.setItem("current-user", JSON.stringify(state.currentUser));
}

export const { signupUser, deleteUser, loginUser, guestLogin } =
  usersSlice.actions;

export default usersSlice.reducer;
