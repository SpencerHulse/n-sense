import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);

  function toggle() {
    dispatch(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  if (!cartOpen) {
    return <li onClick={() => toggle()}>Cart ({cartItems.length})</li>;
  }

  return (
    <>
      <li>Cart ({cartItems.length})</li>

      {/* Make this a modal with absolute positioning... */}
      <div>
        <div onClick={() => toggle()}>[close]</div>
        <h2>Shopping Cart</h2>
        {cartItems.length ? (
          <div>
            {cartItems.map((item) => {
              return <CartItem key={item._id} item={item} />;
            })}
            <div>
              <strong>Total: ${calculateTotal()}</strong>
              {Auth.loggedIn() ? (
                <button>Checkout</button>
              ) : (
                <span>(log in to check out)</span>
              )}
            </div>
          </div>
        ) : (
          <h3>You haven't added anything to your cart yet!</h3>
        )}
      </div>
    </>
  );
};

export default Cart;
