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

  return (
    <>
      <div>
        <div>
          {!category && (
            <div className="scroll-carousel">
              <Slider />
              <div className="container mx-auto mb-10">
                <div className="mt-10 new-and-noteworthy">
                  <h1 className="font-bold text-3xl mb-10">
                    New and Noteworthy
                  </h1>
                  <div className="flex noteworthy">
                    <div className="flex cards-container">
                      {filterProducts().map((product) => (
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
                  <div className="noteworthy-fader-right"></div>
                  <div className="noteworthy-fader-left"></div>

                </div>
              </div>
            </div>
          )}
          <div>
            <div className="container mx-auto flex">
              <div className="product-display flex flex-wrap">
                {products.length ? (
                  // Needs to be flex
                  <div>
                    <h2 className="category-title mb-10 text-3xl bold">
                      {category ? category : "All products"}
                    </h2>
                    <div className="-m-2 flex flex-wrap italic">
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
