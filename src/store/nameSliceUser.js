import { createSlice } from "@reduxjs/toolkit";
const nameUserSlice = createSlice({
  name: "nameUser",
  initialState: {
    name: "",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
  },
});
export const nameUserActions = nameUserSlice.actions;
export default nameUserSlice;
