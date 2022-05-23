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

      // setTimeout(() => {
      //   window.location.assign("/");
      // }, 3000);
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
                  <p class="mt-2 text-center text-sm text-gray-600">
                  <a href="./">Continue shopping</a>
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
