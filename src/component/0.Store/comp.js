import { createSlice } from "@reduxjs/toolkit";
import { cyan } from "@mui/material/colors";

const initialState = {
  color1: cyan[800],
  color2: cyan[900],
  color3: "#ffdc00",
  color4: "#ffffff",
  login: false,
  user: {
    name: "",
    picture: "",
  },
  alertOpen: false,
  alertStatus: true,
  alertText: "Login Berhasil",
};

const compSlice = createSlice({
  initialState,
  name: "color",
  reducers: {
    setColor: (state, action) => {
      state.color1 = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAlertOpen: (state, action) => {
      state.alertOpen = action.payload;
    },
    setAlertStatus: (state, action) => {
      state.alertStatus = action.payload;
    },
    setAlertText: (state, action) => {
      state.alertText = action.payload;
    },
  },
});

export const {
  setColor,
  setLogin,
  setUser,
  setAlertOpen,
  setAlertStatus,
  setAlertText,
} = compSlice.actions;
export default compSlice.reducer;
