import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
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

  if (!cartOpen) {
    return <li onClick={() => toggle()}>Cart ({cartItems.length})</li>;
  }

  return (
    <>
      <li>Cart ({cartItems.length})</li>

      <div className="modal bg-white">
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
              </div>
            </div>
          ) : (
            <h3>You haven't added anything to your cart yet!</h3>
          )}
        </div>
        <div className="modal-footer">
          <button>Close</button>
        </div>
      </div>
    </>
  );
};

//       <div>
//         <div onClick={() => toggle()}>[close]</div>
//         <h2>Shopping Cart</h2>
//         {cartItems.length ? (
//           <div>
//             {cartItems.map((item) => {
//               return <CartItem key={item.product._id} item={item} />;
//             })}
//             <div>
//               <strong>Total: ${calculateTotal()}</strong>
//               {Auth.loggedIn() ? (
//                 <button>Checkout</button>
//               ) : (
//                 <span>(log in to check out)</span>
//               )}
//             </div>
//           </div>
//         ) : (
//           <h3>You haven't added anything to your cart yet!</h3>
//         )}
//       </div>
//     </>
//   );
// };
export default Cart;
