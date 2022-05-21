import React from "react";

function ScrollCard({ _id, name, description, price, primaryImage, category }) {
  return (
    <div className="product-card w-48 mr-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <a href="/">
          <img
            className="rounded-t-lg"
            src={require(`../../assets/images/chocolate-brownie.jpg`)}
            alt="choco brownie"
          />
        </a>
        <div className="p-5">
          <a href="/">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              choco brownie
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Big black candle (BBC)
          </p>
          <div className="flex flex-row justify-between w-full">
            <p className="price text-xl font-bold text-white">$6.69</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollCard;
