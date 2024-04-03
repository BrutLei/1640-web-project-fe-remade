import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  access_token: "",
  faculty: "",
  id: "",
  group: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { username, email, avatar, id, faculty, access_token, group } =
        action.payload;
      state.username = username;
      state.email = email;
      state.faculty = faculty;
      state.access_token = access_token;
      state.avatar = avatar;
      state.id = id;
      state.group = group;
      state.isLogin = true;
    },
    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.faculty = "";
      state.access_token = "";
      state.avatar = "";
      state.id = "";
      state.group = "";
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
