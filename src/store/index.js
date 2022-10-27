import { configureStore } from "@reduxjs/toolkit";
import typeSlice from "./type-slice";
import nameUserSlice from "./nameSliceUser";
const store = configureStore({
  reducer: { type: typeSlice.reducer, nameUser: nameUserSlice.reducer },
});
export default store;
