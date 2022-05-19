import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import candle1 from "../assets/images/candle1.png";

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
    <div className="main">
      <div className="main-hero flex items-center">
        <div className="container mx-auto flex hero-content">
          <div className="w-3/12">
            <img src={candle1} alt="candle" />
          </div>
          <div className="w-9/12 m-auto">
            <h1 className="hero-title align-middle">New Exciting Collection</h1>
            <button className="defbutton">Shop today</button>
          </div>
        </div>
      </div>

      <div className="container flex">
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

    </div>

  );
};

export default Home;
