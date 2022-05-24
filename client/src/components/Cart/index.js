/* This example requires Tailwind CSS v2.0+ */
import React, { useRef, useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, addMultipleItems } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Cart() {
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

  function submitCheckout(event) {
    event.preventDefault();
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

  let cartRef = useRef();
  let cartTabRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!cartOpen) {
        return;
      }

      if (
        !cartRef.current.contains(event.target) &&
        !cartTabRef.current.contains(event.target)
      ) {
        toggle();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  if (!cartOpen) {
    return (
      <li onClick={() => toggle()}>
        <button id="cart-nav-btn">Cart ({cartItems.length})</button>
      </li>
    );
  }

  return (
    <>
      <li ref={cartTabRef}>
        <button id="cart-nav-btn">Cart ({cartItems.length})</button>
      </li>
      <div className="cart" ref={cartRef}>
        <div>
          <div className="mb-5" onClick={() => toggle()}>
            <button id="close-cart-btn">Close cart</button>
          </div>
          <form>
            <section>
              <ul className="cart-list-container">
                {cartItems.map((item) => {
                  return <CartItem key={item.product._id} item={item} />;
                })}
              </ul>
              {!cartItems.length && "There's nothing here yet!"}
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      ${calculateTotal()}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              {Auth.loggedIn() ? (
                <div className="mt-10">
                  <button
                    type="submit"
                    className="add-button"
                    onClick={submitCheckout}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <span>
                  (
                  <a className="text-lime-600" href="/login">
                    Log in
                  </a>{" "}
                  to check out)
                </span>
              )}
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
