import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBusses: [],
  id: "",
  dataById: {
    kode: "",
    nama: "",
    plat: "",
  },
};

const bussesSlice = createSlice({
  initialState,
  name: "busses",
  reducers: {
    setDataBusses: (state, action) => {
      state.dataBusses = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setDataById: (state, action) => {
      state.dataById = action.payload;
    },
  },
});

export const { setDataBusses, setId, setDataById } = bussesSlice.actions;
export default bussesSlice.reducer;
