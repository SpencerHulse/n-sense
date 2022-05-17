import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="container flex flex-wrap h-screen bg-slate-300">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  );
};

export default Home;
