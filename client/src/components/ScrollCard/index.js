import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ScrollCard({
  product,
  _id,
  name,
  description,
  price,
  primaryImage,
  category,
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="new-products-card">
      <div className="new-products-card-content m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${_id}`}>
          <div>
            <img
              className="rounded-t-lg new-products-card-image"
              src={primaryImage}
              alt={`${name} ${category}`}
            />
          </div>
        </Link>
        <div className="title-container">
          <Link to={`/product/${_id}`}>
            <h5 className="new-products-title text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <div className="flex flex-row justify-between w-full">
            <p className="price text-xl font-bold text-white">${price}</p>
            <button
              className="py-2 px-4 hover:shadow-white hover:shadow-inner rounded-md"
              onClick={() => {
                const itemInCart = cartItems.find((item) => item._id === _id);

                dispatch(addToCart({ product, purchaseQuantity: 1, _id }));

                if (itemInCart) {
                  idbPromise("cart", "put", {
                    ...itemInCart,
                    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                  });
                } else {
                  idbPromise("cart", "put", {
                    product,
                    purchaseQuantity: 1,
                    _id,
                  });
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollCard;
