import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cartSlice";
import Modal from "../Modal";
import { XIcon } from "@heroicons/react/outline";
import { toggleCart, addMultipleItems } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleItems([...cart]));
    }

    if (!cartItems.length) {
      getCart();
    }
  }, [cartItems.length, dispatch]);

  function toggle() {
    dispatch(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.product.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cartItems.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleItems([...cart]));
    }

    if (!cartItems.length) {
      getCart();
    }
  }, [cartItems.length, dispatch]);

  if (!cartOpen) {
    return <li onClick={() => toggle()}>Cart ({cartItems.length})</li>;
  }

  return (
    <>
      <li>Cart ({cartItems.length})</li>

      {/* Make this a modal with absolute positioning... */}
<<<<<<< HEAD
      <div className="max-h-screen" onBlur={() => toggle()}>
        <div
          id="cart-modal"
          className="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          onBlur={() => toggle()}
        >
          <div class="relative p-4 w-full max-w-lg max-h-screen md:h-auto">
            <div className="modal-content ">
              <div className="modal-header flex items-start justify-between">
                <h1 className="modal-title text-4xl font-bolder">
                  Shopping Cart
                </h1>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => toggle()}
                  >
                    <span className="sr-only">Close panel</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
=======
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div onClick={() => toggle()}>[close]</div>
            <h4 className="modal-title">Shopping Cart</h4>
          </div>
          {cartItems.length ? (
            <div className="modal-body">
              {cartItems.map((item) => {
                return <CartItem key={item.product._id} item={item} />;
              })}
              <div>
                <strong>Total: ${calculateTotal()}</strong>
                {Auth.loggedIn() ? (
                  <button onClick={submitCheckout}>Checkout</button>
                ) : (
                  <span>(log in to check out)</span>
                )}
>>>>>>> 07af8500787a5ed4ddd49071883924ce368b1049
              </div>
              {cartItems.length ? (
                <div className="modal-body">
                  {cartItems.map((item) => {
                    return <CartItem key={item.product._id} item={item} />;
                  })}
                  <div className="footer float-right">
                    <strong>Total: ${calculateTotal()}</strong>
                  </div>
                  <div>
                    <div className="modal-footer">
                      <button onClick={() => toggle()}>Close</button>
                    </div>
                    {Auth.loggedIn() ? (
                      <button>Checkout</button>
                    ) : (
                      <span>
                        (
                        <a href="/login" className="text-lime-600">
                          Log in
                        </a>{" "}
                        to check out)
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <h3>You haven't added anything to your cart yet!</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
