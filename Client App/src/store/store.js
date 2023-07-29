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
      state.roomsSelected = [...state.roomsSelected].filter(
        (room) => action.payload.room !== room
      );
      state.totalPrice -= action.payload.price;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,

    roomList: listRoomSlice.reducer,
  },
});
export const loginActions = loginSlice.actions;

export const roomListActions = listRoomSlice.actions;
export default store;
