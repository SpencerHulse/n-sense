import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

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

  return (
    <div className="product-card mx-12">
      <div className="scale-75 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${_id}`}>
          <img
            className="rounded-t-lg"
            src={require(`../../assets/images/${primaryImage}.jpg`)}
            alt={`${name} ${category}`}
          />
        </Link>
        <div className="p-5">
          <Link to={`/product/${_id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name} {category}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <div className="flex flex-row justify-between w-full">
            <p className="price text-xl font-bold text-white">${price}</p>
            <button
              className="text-white"
              onClick={() => {
                console.log(product);
                dispatch(addToCart({ product, purchaseQuantity: 1 }));
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
