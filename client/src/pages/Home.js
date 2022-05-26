import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import NewNoteworthy from "../components/NewNoteworthy";
import Slider from "../components/Slider/Slider";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

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
            <div className="scroll-carousel relative z-0">
              <Slider />
              <NewNoteworthy products={products} />
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
