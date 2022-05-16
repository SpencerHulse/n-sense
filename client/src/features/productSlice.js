import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({ name: "product", initialState });

export default productSlice.reducer;
