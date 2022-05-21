import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function SuccessfulPurchase() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");

      let products = [];
      // Get an array of the product IDs in the cart
      cart.forEach((product) => {
        for (let i = 0; i < product.purchaseQuantity; i++) {
          products.push(product._id);
        }
      });

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });

        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise("cart", "delete", { _id: item._id });
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the homepage</h2>
    </div>
  );
}

export default SuccessfulPurchase;
