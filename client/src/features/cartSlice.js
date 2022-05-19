import { createSlice } from "@reduxjs/toolkit";
import { idbPromise } from "../utils/helpers";

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
      const _id = product._id; // For entire object. Used to make IndexedDB simpler.

      state.cartItems.map((item) => {
        if (item.product._id === product._id) {
          item.purchaseQuantity += purchaseQuantity;
          updated = true;
        }
        return item;
      });

      if (!updated) {
        state.cartItems.push({ product, purchaseQuantity, _id });
      }

      state.cartOpen = true;
    },
    removeFromCart: (state, { payload }) => {
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
