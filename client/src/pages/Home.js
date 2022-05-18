import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="xl:container mx-auto flex flex-wrap columns-5 justify-around h-fit bg-slate-300">
      {/* <Carousel></Carousel> */}
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
