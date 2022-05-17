import React, { useEffect } from "react";
import candle from "../../assets/images/candle.jpg";

function ProductCard() {
  return (
    <div className="product-card mx-12">
      <div className="scale-75 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={candle} alt="candle" />
        </a>
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
            <p className="price text-xl font-bold text-white">$6.66</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
