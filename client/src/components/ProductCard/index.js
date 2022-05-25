import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductCard({
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
    <div className="product-card w-1/5">
      <div className="product-card-content m-2 max-w-sm bg-white dark:bg-[#494949] rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        <Link to={`/product/${_id}`}>
          <img
            className="rounded-t-lg product-card-image"
            src={primaryImage}
            alt={`${name} ${category}`}
          />
        </Link>
        <div className="p-5 product-card-details">
          <Link to={`/product/${_id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name} {category}
            </h5>
          </Link>
          <p className="product-card-description mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <div className="product-card-action flex flex-row justify-between w-full">
            <p className="price text-xl text-white font-bold">${price}</p>
            <button
              className="text-white"
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

export default ProductCard;
