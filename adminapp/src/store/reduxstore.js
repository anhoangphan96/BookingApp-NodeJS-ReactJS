import { configureStore, createSlice } from "@reduxjs/toolkit";

// initial state and slcie of modal popup

const modalInitialState = {
  showPopup: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    SHOWPOPUP: (state, action) => {
      state.showPopup = true;
    },
    CLOSEPOPUP: (state, action) => {
      state.showPopup = false;
    },
  },
});
export const modalActions = modalSlice.actions;

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
});

export default store;
