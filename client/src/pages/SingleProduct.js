import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { addToCart } from "../features/cartSlice";

import { idbPromise } from "../utils/helpers";

const SingleProduct = () => {
  const [currentProduct, setCurrentProduct] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  const { data: productData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (productData) {
      dispatch(updateProducts(productData.products));
    }
  }, [productData, id, products, dispatch]);

  function addItemsToCart() {
    const quantitySelected = parseInt(
      document.getElementById("quantity").value
    );
    if (quantitySelected) {
      const itemInCart = cartItems.find(
        (item) => item._id === currentProduct._id
      );

      dispatch(
        addToCart({
          product: currentProduct,
          purchaseQuantity: quantitySelected,
          _id: currentProduct._id,
        })
      );

      if (itemInCart) {
        idbPromise("cart", "put", {
          ...itemInCart,
          purchaseQuantity:
            parseInt(itemInCart.purchaseQuantity) + quantitySelected,
        });
      } else {
        idbPromise("cart", "put", {
          product: currentProduct,
          purchaseQuantity: quantitySelected,
          _id: currentProduct._id,
        });
      }
    }
  }

  return (
    <>
      {currentProduct ? (
        <div>
          <div className="product-hero-container bg-gradient-to-b from-[#e2e2e2] to-[#cccccc] dark:from-[#494949] dark:to-[#2F2F2F]">
            <div className="container mx-auto">
              <div className="flex justify-between product-hero mx-auto gap-9">
                <div className="product-image mx-auto">
                  <img
                    src={currentProduct.primaryImage}
                    alt={`${currentProduct.name} ${currentProduct.category.categoryName}`}
                  />
                </div>
                <div className="product-info dark:bg-[#7D7D7D]">
                  <div className="w-full">
                    <div className="details-item">
                      <h2 className="text-2xl bold block dark:text-white">
                        {currentProduct.name}
                      </h2>
                    </div>
                    <div className="details-item mb-5">
                      <h3 className="text-slate-600 block dark:text-white">
                        {currentProduct.category.categoryName}
                      </h3>
                    </div>
                    <div className="details-item mb-5 dark:text-white">
                      <p className="price light dark:text-white">
                        $ {currentProduct.price}
                      </p>
                    </div>
                    <div className="details-item mb-5">
                      <ul>
                        {currentProduct.details.map((detail, i) => {
                          return (
                            <li key={i} className="dark:text-white">
                              {detail}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="details-item quantity-btn"></div>
                  </div>
                  <br />
                  {currentProduct.stock <= 0
                    ? "Out of stock!"
                    : currentProduct.stock <= 20 && (
                        <p className="dark:text-white">Only a few left!</p>
                      )}
                  <div className="add-button-container gap-4 flex w-full">
                    <select
                      id="quantity"
                      className="w-1/2 bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Quantity</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {currentProduct.stock <= 0 ? (
                      <button
                        className="mt-5 add-button text-white rounded-md w-1/2 disabled-button"
                        type="button"
                        onClick={addItemsToCart}
                        disabled
                      >
                        Unavailable
                      </button>
                    ) : (
                      <button
                        className="mt-5 add-button text-white rounded-md w-1/2"
                        type="button"
                        onClick={addItemsToCart}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section w-full flex flex-row">
            <div className="container mx-auto">
              <h1 className="text-3xl font-extrabold mb-8 dark:text-white">
                Product Description
              </h1>
              <p className="dark:text-white mb-4">
                {currentProduct.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SingleProduct;
