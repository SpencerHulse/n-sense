import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import ScrollCard from "../components/ScrollCard";
import Slider from "../components/Slider/Slider";

const Home = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    const scrollContainer = document.querySelector(".noteworthy");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });

    if (productData) {
      dispatch(updateProducts(productData.products));

      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [productData, loading, dispatch]);

  function filterProducts() {
    if (!category) {
      return products;
    }

    return products.filter(
      (product) => product.category.categoryName.toLowerCase() === category
    );
  }

  function newProducts() {
    if (products.length > 20) {
      return products.slice(products.length - 10);
    } else {
      return products;
    }
  }

  return (
    <>
      <div>
        <div>
          {!category && (
            <div className="scroll-carousel relative z-0">
              <Slider />
              <div className="container mx-auto">
                <div className="mt-10 new-and-noteworthy">
                  <h1 className="font-bold text-3xl mb-10 dark:text-white main-page-section-titles">
                    New and Noteworthy
                  </h1>
                  <div className="flex noteworthy">
                    <div className="flex cards-container">
                      {newProducts().map((product) => (
                        <ScrollCard
                          product={product}
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
                  </div>
                  <div className="noteworthy-fader-right bg-gradient-to-l from-[#f8f5f5]/100 to-[#f8f5f5]/0 dark:from-[#1C1C1C]/100 dark:to-[#1C1C1C]/0"></div>
                  <div className="noteworthy-fader-left bg-gradient-to-r from-[#f8f5f5]/100 to-[#f8f5f5]/0 dark:from-[#1C1C1C]/100 dark:to-[#1C1C1C]/0"></div>
                </div>
              </div>
            </div>
          )}
          <div className="relative z-10 bg-[#F8F5F5] dark:bg-[#1C1C1C] pt-10">
            <div className="container mx-auto flex">
              <div className="product-display flex flex-wrap">
                {products.length ? (
                  // Needs to be flex
                  <div>
                    <h2 className="category-title mb-10 text-3xl bold text-black dark:text-white main-page-section-titles">
                      {category ? category : "All Products"}
                    </h2>
                    <div className="-m-2 flex flex-wrap italic space-around products-wrapper">
                      {filterProducts().map((product) => (
                        <ProductCard
                          product={product}
                          key={product._id}
                          _id={product._id}
                          name={product.name}
                          description={product.description}
                          price={product.price}
                          stock={product.stock}
                          primaryImage={product.primaryImage}
                          category={product.category.categoryName}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <h3>There are currently no products available</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
