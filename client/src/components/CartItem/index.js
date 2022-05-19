import React, { useEffect } from "react";

const CartItem = ({ item }) => {
  const { product, purchaseQuantity } = item;

  console.log(product, purchaseQuantity);

  function onChange() {
    return;
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
          <span role="img" aria-label="trash">
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
