import { configureStore } from "@reduxjs/toolkit";
import compSlice from "./comp";

export default configureStore({
  reducer: {
    comp: compSlice,
  },
});
