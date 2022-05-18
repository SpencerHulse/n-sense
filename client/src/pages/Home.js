import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

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
    <div className="container">
      {/*     <div className="h-96 bg-slate-300">
        <h1>Carousel</h1>
      </div>
      <div className="new-products h-96">
        <div className="flex flex-col bg-white m-auto p-auto w-full h-96">
          <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
            New and Worthy of Chris's Love
          </h1>
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
              <div className="product-card inline-block px-3">
                <div className="w-64 h-64 max-w-sm overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <div className="w-full h-1/2 bg-slate-300">
                    <a href="#">
                      <img
                        className="rounded-t-lg scale-50"
                        src={candle}
                        alt="candle"
                      />
                    </a>
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Oogly Moogly Wax in Jar
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      100% Handmade from Lord Chris himself!
                    </p>
                    <div className="flex flex-row justify-between w-full">
                      <p className="price text-xl font-bold text-white">
                        $6.66
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
              <div className="inline-block px-3">
                <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  Card
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Carousel></Carousel> */}
      {products.length ? (
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
      )}
    </div>
  );
};

export default Home;
