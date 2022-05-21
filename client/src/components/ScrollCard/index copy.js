import React from "react";

function ScrollCard1({
  _id,
  name,
  description,
  price,
  primaryImage,
  category,
}) {
  return (
    <div className="product-card flex justify-center px-3 ">
      <div className="product-card  rounded-lg shadow-lg border border-gray-200 bg-white max-w-xs w-64 h-64 dark:bg-gray-800 dark:border-gray-700  overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <a href="#!">
          <img
            className="rounded-t-lg w-full h-1/2"
            src={require(`../../assets/images/candle.jpg`)}
            alt={`candle Candles`}
          />
        </a>
        <div className="card-info bg-slate-300 w-full h-1/2">
          <a href="#">
            <h5 className="text-gray-900 text-2xl tracking-tight font-medium mb-2 font-bold dark:text-white">
              Candle
            </h5>
          </a>
          <div className="category mb-3 font-normal text-gray-700 dark:text-gray-400 ">
            <p className="text-gray-700 text-base pb-4">
              Big old candle in yer face
            </p>
          </div>
          <p className="price text-xl font-bold text-white">$69.69</p>
        </div>
      </div>
    </div>
  );
}

export default ScrollCard1;
