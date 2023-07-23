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
  adult: 0,
  children: 0,
  room: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialStateSearch,
  reducers: {
    GETSEARCH: (state, action) => {
      state.destination = action.payload.destination;
      state.adult = action.payload.adult;
      state.date = action.payload.date;
      state.children = action.payload.children;
      state.room = action.payload.room;
    },
  },
});

//initialState and slice cho phần tính giá trong detail hotel khi chọn rooms

const initialStateListRoom = {
  roomsSelected: [],
  totalPrice: 0,
};
const listRoomSlice = createSlice({
  name: "listRoom",
  initialState: initialStateListRoom,
  reducers: {
    addRoom: (state, action) => {
      state.roomsSelected.push(action.payload.room);
      state.totalPrice += action.payload.price;
    },
    removeRoom: (state, action) => {
      state.roomsSelected.filter((room) => action.payload.room !== room);
      state.totalPrice -= action.payload.price;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    search: searchSlice.reducer,
    roomList: listRoomSlice.reducer,
  },
});
export const loginActions = loginSlice.actions;
export const searchActions = searchSlice.actions;
export const roomListActions = listRoomSlice.actions;
export default store;
