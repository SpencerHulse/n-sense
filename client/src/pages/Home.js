import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import ScrollCardCarousel from "../components/ScrollCardCarousel";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { currentCategory } = useSelector((state) => state.category);

  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (productData) {
      dispatch(updateProducts(productData.products));
    }
  }, [productData, loading, updateProducts, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="h-96 bg-slate-300">
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          <div className="product-card object-contain">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card mx-12">
            <div className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt={`choco brownie`}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card mx-12">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card mx-12">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card mx-12">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card mx-12">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card mx-12">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={require(`../assets/images/chocolate-brownie.jpg`)}
                  alt="choco brownie"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    choco brownie
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Big black candle (BBC)
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p className="price text-xl font-bold text-white">$6.69</p>
                </div>
              </div>
            </div>
          </div>

          {/* {products.length ? (
            // Needs to be flex
            <div className="">
              {filterProducts().map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  primaryImage={product.primaryImage}
                  category={product.category.categoryName}
                />
              ))}
            </div>
          ) : (
            <h3>There are currently no products available</h3>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
