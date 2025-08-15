import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    data: null,
    selectedData: null,
    filteredData: null,
    searchTerm: "",
  },
  reducers: {
    productList: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    show: (state, action) => {
      state.selectedData = action.payload;
    },
    filterData: (state, action) => {
      const searchTerm = action.payload;
      state.filteredData = state.data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm?.trim().toLowerCase())
      );
      state.searchTerm = searchTerm;
    },
  },
});

export const { productList, show, filterData } = counterSlice.actions;
export default counterSlice.reducer;
