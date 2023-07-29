import { configureStore, createSlice } from "@reduxjs/toolkit";

//initialState va slice cho loggin/loggout state
const initialStateLogin = {
  isLoggedIn: false,
  username: "",
  isAdmin: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    LOGIN: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
    },
    LOGOUT: (state, action) => {
      state.isLoggedIn = false;
      state.username = "";
      state.isAdmin = false;
    },
  },
});
export const loginActions = loginSlice.actions;

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export default store;
