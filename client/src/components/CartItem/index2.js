import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";
import { CheckIcon, ClockIcon } from "@heroicons/react/solid";

const CartItem2 = ({ item }) => {
  const dispatch = useDispatch();
  const { product, purchaseQuantity } = item;

  function onChange(e) {
    const change = parseInt(e.target.value) - purchaseQuantity;

    if (change === -1 && purchaseQuantity === 1) {
      dispatch(removeFromCart(item));
      idbPromise("cart", "delete", { _id: product._id });
      return;
    }

    dispatch(
      addToCart({
        product,
        purchaseQuantity: change,
      })
    );

    idbPromise("cart", "put", {
      product,
      purchaseQuantity: parseInt(e.target.value),
      _id: product._id,
    });
  }

  return (
    <li key={product.id} className="flex py-6">
      <div className="flex-shrink-0">
        <img
          src={require(`../../assets/images/${product.primaryImage}.jpg`)}
          alt={`${product.name} ${product.category.categoryName}`}
          className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <a
                href={product.href}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {product.name}
              </a>
            </h4>
            <div className="ml-4 ">
              <p className="mb-4 text-sm font-medium text-gray-900">
                {product.price}
              </p>
              <label htmlFor={`quantity-`} className="sr-only">
                Quantity, {product.name}
              </label>
              <select
                id={`quantity-`}
                name={`quantity-`}
                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={purchaseQuantity}
                onChange={onChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          <p className="mt-1 text-sm text-gray-500">{product.size}</p>
        </div>

        <div className="mt-4 flex-1 flex items-end justify-between">
          <p className="flex items-center text-sm text-gray-700 space-x-2">
            {product.inStock ? (
              <CheckIcon
                className="flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ClockIcon
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            )}

            <span>
              {product.inStock
                ? "In stock"
                : `Will ship in ${product.leadTime}`}
            </span>
          </p>
          <div className="ml-4">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <span
                aria-label="trash"
                onClick={() => {
                  dispatch(removeFromCart(item));
                  idbPromise("cart", "delete", { _id: product._id });
                }}
              >
                Remove
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem2;
