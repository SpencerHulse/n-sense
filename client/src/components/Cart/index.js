import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartOpen, amount, total } = useSelector(
    (state) => state.cart
  );

  function toggle() {
    dispatch(toggleCart());
  }

  if (!cartOpen) {
    return <li onClick={() => toggle()}>Cart ({amount})</li>;
  }

  return (
    <>
      <li>Cart ({amount})</li>

      {/* Make this a modal with absolute positioning... */}
      <div>
        <div onClick={() => toggle()}>[close]</div>
        <h2>Shopping Cart</h2>
        {cartItems.length ? (
          <div>
            {cartItems.map((item) => ({
              /* <CartItem key={item._id} item={item} /> */
            }))}
            <div>
              <strong>Total: ${total}</strong>
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
