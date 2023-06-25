import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataRoutes: [],
  id: "",
  dataById: {
    idRoute: "",
    jalur: "",
    bus: "",
    tanggal: "",
    jam: "",
    harga: "",
  },
};

const routesSlice = createSlice({
  initialState,
  name: "busses",
  reducers: {
    setDataRoutes: (state, action) => {
      state.dataRoutes = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setDataById: (state, action) => {
      state.dataById = action.payload;
    },
  },
});

export const { setDataRoutes, setId, setDataById } = routesSlice.actions;
export default routesSlice.reducer;
