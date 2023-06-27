import { configureStore } from "@reduxjs/toolkit";
import bussesSlice from "./busses";
import compSlice from "./comp";
import routesSlice from "./routes";
import customersSlice from "./customers";
import bokingsSlice from "./bokings";

export default configureStore({
  reducer: {
    comp: compSlice,
    busses: bussesSlice,
    routes: routesSlice,
    customers: customersSlice,
    bokings: bokingsSlice,
  },
});
