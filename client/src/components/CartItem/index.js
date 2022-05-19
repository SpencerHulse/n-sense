import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../features/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, purchaseQuantity } = item;

  function onChange(e) {
    const change = parseInt(e.target.value) - purchaseQuantity;

    if (change === -1 && purchaseQuantity === 1) {
      dispatch(removeFromCart(item));
      return;
    }

    dispatch(
      addToCart({
        currentProduct: product,
        quantitySelected: change,
      })
    );
  }

  return (
    <div>
      <div>
        <img
          src={require(`../../assets/images/${product.primaryImage}.jpg`)}
          alt={`${product.name} ${product.category.categoryName}`}
        />
      </div>
      <div>
        <div>
          {product.name}, ${product.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => dispatch(removeFromCart(item))}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
