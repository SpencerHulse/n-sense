import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>Previous orders for {user.username}</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(
                    ({ _id, primaryImage, name, price }, index) => (
                      <div key={index} className="card px-1 py-1">
                        <Link to={`/product/${_id}`}>
                          <img
                            src={require(`../assets/images/${primaryImage}.jpg`)}
                            alt={name}
                          />
                          {/* The below is good for production... uses public folder
                          <img alt={name} src={`/images/${primaryImage}`} /> */}
                          <p>{name}</p>
                        </Link>
                        <div>
                          <span>${price}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
