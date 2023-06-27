import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBokings: [],
  id: "",
  dataById: {
    kode: "",
    pelanggan: "",
    noHp: "",
    bus: "",
    rute: "",
    seats: "",
    harga: "",
    w_keberangkatan: "",
    w_pemesanan: "",
  },
};

const bokingsSlice = createSlice({
  initialState,
  name: "bokings",
  reducers: {
    setDataBokings: (state, action) => {
      state.dataBokings = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setDataById: (state, action) => {
      state.dataById = action.payload;
    },
  },
});

export const { setDataBokings, setId, setDataById } = bokingsSlice.actions;
export default bokingsSlice.reducer;
