import React, { useEffect } from "react";
import Nav from "../components/Nav";
import candle from "../assets/images/candle.jpg";
import candle1 from "../assets/images/candle1.png";

const SingleProduct = () => {
  return (
    <div className="w-screen h-screen">
      <Nav></Nav>
      <div className="flex w-full h-2/3 bg-slate-300">
        <div className="flex w-1/2 justify-center">
          <img
            className="product-img scale-150"
            src={candle1}
            alt="candle"
          ></img>
        </div>
        <div className="flex w-1/2 h-full justify-start items-center ">
          <div className="flex flex-col justify-between w-1/2 h-5/6 bg-white p-8">
            <div className="block">
              <h2 className="text-2xl bold block">Product Name</h2>
              <h3 className="text-slate-600 block">Product category</h3>
              <p className="price">$69.00</p>
              <p className="">**** (reviews)</p>
              <br></br>
              <div className="size-btn flex w-1/2 justify-between">
                <select
                  id="size"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a size</option>
                  <option value="SM">Small</option>
                  <option value="MD">Medium</option>
                  <option value="LG">Large</option>
                </select>
              </div>
              <br></br>

              <div className="quantity-btn flex w-1/2">
                <select
                  id="size"
                  class="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Quantity</option>
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="three">3</option>
                </select>
              </div>
              <br></br>

              <div>
                <button
                  className="bg-indigo-700 hover:ring-indigo-900 hover:ring-2 text-white  p-4 px-6 rounded-md"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-2/3 p-16">
          <h1 className="text-3xl font-extrabold mb-10">Product Description</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            laudantium libero quidem commodi quaerat nam? Quas, molestiae earum.
            Nemo architecto aspernatur, reiciendis praesentium porro nobis
            obcaecati tenetur odio exercitationem veniam.
          </p>
        </div>
        <div className="w-1/3 flex flex-col p-16">
          <h1 className="text-3xl font-extrabold mb-10">Details</h1>
          <ul className="list-disc">
            <li>Burns like hell</li>
            <li>Lights the whole house</li>
            <li>Lasts for eternity</li>
            <li>Fueled by your sins</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
