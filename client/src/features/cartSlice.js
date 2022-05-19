import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
