import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // usernames will be unique
  },
  reducers: {
    signupUser: (state, action) => {
      //   state.users.push({});
    },

    deleteUser: (state, action) => {},
  },
});
