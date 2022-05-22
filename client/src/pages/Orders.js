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
        const { _id, name, price, primaryImage, category } = product;
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
              category: category.categoryName,
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
      <div className="section">
        <div className="container mx-auto my-1">
          <Link to="/">← Back to Products</Link>

          {groupedOrders && data && (
            <>
              <h2 className="mb-10">My Orders</h2>
              {groupedOrders.map((order) => (
                <div className="order-details" key={order._id}>
                  <div className="order-info flex items-center">
                    <p className="order-id-badge">
                      Order <span className="order-id">#{order._id}</span>
                    </p>
                    <p className="light">
                      Order placed:{" "}
                      {new Date(
                        parseInt(order.purchaseDate)
                      ).toLocaleDateString()}{" "}
                    </p>
                  </div>
                  <hr />
                  <div className="flex-row">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between">
                        <Link
                          to={`/product/${product[0]._id}`}
                          className="w-full"
                        >
                          <div className="flex items-center w-full justify-between">
                            <div className="flex items-center">
                              <img
                                className="orderlist-img"
                                src={require(`../assets/images/${product[0].primaryImage}.jpg`)}
                                alt={product[0].name}
                              />
                              <div>
                                <p className="order-product-name">
                                  {product[0].name}
                                </p>
                                <p className="light">{product[0].category}</p>
                              </div>
                            </div>
                            {/* The below is good for production... uses public folder
                          <img alt={name} src={`/images/${primaryImage}`} /> */}
                            <div>
                              <p className="order-details-title">Quantity</p>
                              <p className="order-details-info">
                                {product[0].quantityPurchased}
                              </p>
                            </div>
                            <div>
                              <p className="order-details-title">Unit price</p>
                              <p className="order-details-info">
                                ${product[0].price}
                              </p>
                            </div>
                            <div className="w-32 grid justify-items-end">
                              <p className="order-details-title">Total</p>
                              <p className="order-details-info font-bold">
                                $
                                {(
                                  product[0].price *
                                  product[0].quantityPurchased
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <hr />
                  <div className="flex justify-end">
                    <h3 className="order-details-info font-bold">
                      Order Total: ${calculateTotal(order)}
                    </h3>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
