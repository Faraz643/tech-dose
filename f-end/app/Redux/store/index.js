import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slice/filterMonthSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});
