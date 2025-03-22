import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMonth: "Show All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredMonth: (state, action) => {
      state.filteredMonth = action.payload;
    },
  },
});

export const { setFilteredMonth } = filterSlice.actions;
export default filterSlice.reducer;
