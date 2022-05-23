import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
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
    <div className="flex py-6 border-b-2 border-gray-400 w-full">
      <div className="h-24 w-24 flex flex-row flex-shrink-0 rounded-md border border-gray-200">
        <img
          src={require(`../../assets/images/${product.primaryImage}.jpg`)}
          alt={`${product.name} ${product.category.categoryName}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">${product.price}</p>
          </div>
          <p>Category</p>
        </div>

        <div className="flex flex-1 justify-between items-end text-sm">
          <p className="mr-4">Qty:</p>
          <input
            type="number"
            placeholder="1"
            value={purchaseQuantity}
            onChange={onChange}
          />
          <div className="flex hover:font-extrabold">
            <span
              className="hover:border-b-2 border-black"
              role="img"
              aria-label="trash"
              onClick={() => {
                dispatch(removeFromCart(item));
                idbPromise("cart", "delete", { _id: product._id });
              }}
            >
              Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
