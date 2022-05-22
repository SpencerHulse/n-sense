import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let groupedOrders = [];

  if (data) {
    const userData = data.user;
    const { orders } = userData;
    orders.forEach((order) => {
      const { products } = order;
      const orderSummary = [];
      products.forEach((product) => {
        const { _id, name, price, primaryImage } = product;
        let updated = false;

        orderSummary.map((orderProduct) => {
          if (orderProduct[0]._id === _id) {
            orderProduct[0].quantityPurchased += 1;
            updated = true;
          }
          return orderProduct;
        });

        if (!updated) {
          const productSummary = [
            {
              _id,
              name,
              price,
              primaryImage,
              quantityPurchased: 1,
            },
          ];
          orderSummary.push(productSummary);
        }
      });
      groupedOrders.push({
        _id: order._id,
        purchaseDate: order.purchaseDate,
        products: orderSummary,
      });
    });
  }

  const calculateTotal = ({ products }) => {
    const total = products.reduce((accumulator, currentValue) => {
      return (
        accumulator + currentValue[0].price * currentValue[0].quantityPurchased
      );
    }, 0);

    return total;
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {groupedOrders && data && (
          <>
            <h2>Previous orders for {data.user.username}</h2>
            {groupedOrders.map((order) => (
              <div key={order._id}>
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}{" "}
                  - Order Total: ${calculateTotal(order)}
                </h3>
                <div className="flex-row">
                  {order.products.map((product, index) => (
                    <div key={index} className="card">
                      <Link to={`/product/${product[0]._id}`}>
                        <img
                          src={require(`../assets/images/${product[0].primaryImage}.jpg`)}
                          alt={product[0].name}
                        />
                        {/* The below is good for production... uses public folder
                          <img alt={name} src={`/images/${primaryImage}`} /> */}
                        <p>
                          {product[0].name} x {product[0].quantityPurchased}
                        </p>
                      </Link>
                      <div>
                        <span>
                          $
                          {(
                            product[0].price * product[0].quantityPurchased
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default OrderHistory;
