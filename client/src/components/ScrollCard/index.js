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
          <div >
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
        </div>
      </div>
    </div>
  );
}

export default ScrollCard;
