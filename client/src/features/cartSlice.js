import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.cartOpen = !state.cartOpen;
    },
    addToCart: (state, { payload }) => {
      const { product, purchaseQuantity } = payload;
      let updated = false;

      state.cartItems.map((item) => {
        if (item.product._id === product._id) {
          item.purchaseQuantity += purchaseQuantity;
          updated = true;
        }
        return item;
      });

      if (!updated) {
        state.cartItems.push({ product, purchaseQuantity });
      }

      state.cartOpen = true;
    },
    removeFromCart: (state, { payload }) => {
      console.log(payload);
      const newCart = state.cartItems.filter((item) => {
        if (item.product._id !== payload.product._id) {
          return item;
        }
      });

      state.cartItems = newCart;
    },
  },
});

export const { toggleCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
