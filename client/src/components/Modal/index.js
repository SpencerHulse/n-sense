/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import CartItem from "../CartItem";
import { useEffect } from "react";
import CartItem2 from "../CartItem/index2";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { toggleCart, addMultipleItems } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front side of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front side of charcoal cotton t-shirt.",
  },
  // More products...
];

export default function Modal() {
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
      <div className="bg-white absolute z-50">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0  overflow-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <div onClick={() => toggle()}>[close]</div>
          </div>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {cartItems.map((item) => {
                  return <CartItem2 key={item.product._id} item={item} />;
                })}
              </ul>
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
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
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

              <div className="mt-6 text-sm text-center">
                <p>
                  or{" "}
                  <a
                    href="/"
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
