import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./slices/favSlice";

export const store = configureStore({
  reducer: favSlice,
});
