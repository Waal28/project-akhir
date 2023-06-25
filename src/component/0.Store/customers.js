import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCustomers: [],
  id: "",
  dataById: {
    idCustomers: "",
    nama: "",
    noHp: "",
  },
};

const customersSlice = createSlice({
  initialState,
  name: "customers",
  reducers: {
    setDataCustomers: (state, action) => {
      state.dataCustomers = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setDataById: (state, action) => {
      state.dataById = action.payload;
    },
  },
});

export const { setDataCustomers, setId, setDataById } = customersSlice.actions;
export default customersSlice.reducer;
