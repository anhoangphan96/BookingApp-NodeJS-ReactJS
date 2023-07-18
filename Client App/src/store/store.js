import { configureStore, createSlice } from "@reduxjs/toolkit";

//initialState va slice cho loggin state
const initialStateLogin = {
  isLoggedIn: false,
  username: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    LOGIN: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    LOGOUT: (state, action) => {
      state.isLoggedIn = false;
      state.username = "";
    },
  },
});
//initialState và slice cho phần search

const initialStateSearch = {
  destination: "",
  date: "",
  person: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialStateSearch,
  reducers: {
    GETSEARCH: (state, action) => {
      state.destination = action.payload.destination;
      state.person = action.payload.person;
      state.date = action.payload.date;
    },
  },
});

const store = configureStore({
  reducer: { login: loginSlice.reducer, search: searchSlice.reducer },
});
export const loginActions = loginSlice.actions;
export const searchActions = searchSlice.actions;
export default store;
