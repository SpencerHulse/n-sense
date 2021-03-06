import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <div className="section">
        <div className="container mx-auto">
          <div className="minidialog mx-auto dark:bg-[#494949]">
            <div className="minicontent mx-auto">
              <div className="items-center">
                <img
                  className="mx-auto h-12 w-auto"
                  src={require(`../assets/images/nsense-logo.png`)}
                  alt="n-Sense logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                  This page does not exist!
                </h2>
                <p className="mt-2 mb-5 text-center text-sm text-gray-600 dark:text-[#bababa]">
                  Find it frustrating? Try one of our excellent incense scents
                  to relax, man.
                </p>
                <div>
                  <p className="mt-2 text-center text-sm text-green-700 hover:text-green-700 dark:text-green-600">
                    <Link to="/">Start shopping</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
