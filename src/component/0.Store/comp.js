import { createSlice } from "@reduxjs/toolkit";
import { cyan } from "@mui/material/colors";

const initialState = {
  color1: cyan[800],
  color2: cyan[900],
  login: false,
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
  },
});

export const { setColor, setLogin } = compSlice.actions;
export default compSlice.reducer;
