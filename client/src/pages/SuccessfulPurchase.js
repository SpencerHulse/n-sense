import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER, UPDATE_PRODUCT } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function SuccessfulPurchase() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.assign("/");
    }

    async function saveOrder() {
      const cart = await idbPromise("cart", "get");

      let products = [];
      // Get an array of the product IDs in the cart
      cart.forEach((product) => {
        for (let i = 0; i < product.purchaseQuantity; i++) {
          products.push(product._id);
        }

        updateProduct({
          variables: {
            id: product._id,
            stock: product.product.stock - product.purchaseQuantity,
          },
        });
      });

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise("cart", "delete", { _id: item._id });
        });
      }
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <div className="section">
        <div className="container mx-auto">
          <div className="minidialog mx-auto">
            <div className="minicontent mx-auto">
              <div className="items-center">
                <img
                  className="mx-auto h-12 w-auto"
                  src={require(`../assets/images/nsense-logo.png`)}
                  alt="n-Sense logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Thank you for your purchase!
                </h2>
                <p className="mt-2 mb-5 text-center text-sm text-gray-600">
                  The order was created successfully.
                </p>
                <div>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    <Link to="/">Continue shopping</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPurchase;
