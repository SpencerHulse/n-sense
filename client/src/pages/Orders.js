import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { loading, data } = useQuery(QUERY_USER);
  let groupedOrders = [];

  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }

  if (!loading) {
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
        <div className="container mx-auto my-1 text-green-700 hover:text-green-700 dark:text-green-600">
          <Link to="/">← Back to Products</Link>

          {groupedOrders && data && (
            <>
              <h2 className="mb-10 dark:text-white">Order history for {data.user.username}:</h2>
              {groupedOrders.map((order) => (
                <div className="order-details mb-5 dark:bg-[#494949]" key={order._id}>
                  <div className="order-info flex items-center">
                    <p className="order-id-badge dark:bg-[#333333]">
                      Order <span className="order-id">#{order._id}</span>
                    </p>
                    <p className="light">
                      Order placed:{" "}
                      {new Date(
                        parseInt(order.purchaseDate)
                      ).toLocaleDateString()}{" "}
                    </p>
                  </div>
                  {/* <hr /> */}
                  <ul className="w-full order-items dark:border-[#1a1a1a]">
                    {order.products.map((product, index) => (
                      <li
                        key={index}
                        className="order-item dark:hover:bg-[#333333] dark:border-[#1a1a1a] flex justify-between"
                      >
                        <Link
                          to={`/product/${product[0]._id}`}
                          className="w-full"
                        >
                          <div className="flex items-center w-full justify-between">
                            <div className="flex w-5/12 items-center">
                              <img
                                className="orderlist-img"
                                src={product[0].primaryImage}
                                alt={product[0].name}
                              />
                              <div>
                                <p className="order-product-name dark:text-white">
                                  {product[0].name}
                                </p>
                                <p className="light dark:text-[#bababa]">{product[0].category}</p>
                              </div>
                            </div>
                            <table className="table-fixed w-7/12">
                              <thead>
                                <tr>
                                  <th>
                                    <p className="order-details-title dark:text-white">
                                      Quantity
                                    </p>
                                  </th>
                                  <th>
                                    <p className="order-details-title dark:text-white">
                                      Unit price
                                    </p>
                                  </th>
                                  <th>
                                    <p className="order-details-title dark:text-white">Total</p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <p className="order-details-info dark:text-[#bababa]">
                                      {product[0].quantityPurchased}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="order-details-info dark:text-[#bababa]">
                                      ${product[0].price.toFixed(2)}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="order-details-info font-bold dark:text-[#bababa]">
                                      $
                                      {(
                                        product[0].price *
                                        product[0].quantityPurchased
                                      ).toFixed(2)}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* <hr /> */}
                  <div className="flex justify-end">
                    <h3 className="order-details-info font-bold dark:text-white">
                      Order Total: ${calculateTotal(order).toFixed(2)}
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
