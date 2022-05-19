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
      const { currentProduct, quantitySelected } = payload;
      let updated = false;

      state.cartItems.map((item) => {
        if (item.product._id === currentProduct._id) {
          item.purchaseQuantity += quantitySelected;
          updated = true;
        }
        return item;
      });

      if (!updated) {
        state.cartItems.push({
          product: currentProduct,
          purchaseQuantity: quantitySelected,
        });
      }
    },
  },
});

export const { toggleCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
