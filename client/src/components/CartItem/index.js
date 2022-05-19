import React, { useEffect } from "react";

const CartItem = ({ item }) => {
  return (
    <div>
      <div>
        <img src={`/images/${item.primaryImage}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={""}
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
