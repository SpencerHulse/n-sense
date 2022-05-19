import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import candle1 from "../assets/images/candle1.png";
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
            <h2>
              You are viewing{" "}
              {category ? category.toLowerCase() : "all products"}!
            </h2>
            {filterProducts().map((product) => (
              <ProductCard
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
        ) : (
          <h3>There are currently no products available</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
