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
    <div className="container">
      {products.length ? (
        // Needs to be flex
        <div className="">
          <ScrollCardCarousel></ScrollCardCarousel>
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
