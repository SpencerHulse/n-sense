/* This example requires Tailwind CSS v2.0+ */
import React, { useRef, useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleBurgerCart, addMultipleItems } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, cartOpenBurger } = useSelector((state) => state.cart);

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

  function toggleBurger() {
    dispatch(toggleBurgerCart());
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

  let cartBurgerRef = useRef();
  let cartBurgerTabRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!cartOpenBurger) {
        return;
      }

      if (
        !cartBurgerRef.current.contains(event.target) &&
        !cartBurgerTabRef.current.contains(event.target)
      ) {
        toggleBurger();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  if (!cartOpenBurger) {
    return (
      <li onClick={() => toggleBurger()}>
        <button id="cart-nav-btn">Cart ({cartItems.length})</button>
      </li>
    );
  }

  return (
    <>
      <li ref={cartBurgerTabRef}>
        <button id="cart-nav-btn">Cart ({cartItems.length})</button>
      </li>
      <div
        className="cart dark:bg-[#606060] dark:text-white"
        ref={cartBurgerRef}
      >
        <div>
          <div className="mb-5" onClick={() => toggleBurger()}>
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
                    <dt className="text-base font-medium text-gray-900 dark:text-white">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900 dark:text-white">
                      ${calculateTotal()}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500 dark:text-[#bababa]">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              {Auth.loggedIn() ? (
                cartItems.length ? (
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
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="add-button disabled-button"
                      onClick={submitCheckout}
                      disabled
                    >
                      Checkout
                    </button>
                  </div>
                )
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
