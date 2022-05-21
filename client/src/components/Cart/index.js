import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cartSlice";
import Modal from "../Modal";
import { XIcon } from "@heroicons/react/outline";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);

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

  if (!cartOpen) {
    return <li onClick={() => toggle()}>Cart ({cartItems.length})</li>;
  }

  return (
    <>
      <li>Cart ({cartItems.length})</li>

      {/* Make this a modal with absolute positioning... */}
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
