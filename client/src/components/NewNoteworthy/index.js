import React, { useEffect } from "react";
import ScrollCard from "../ScrollCard";

const NewNoteworthy = ({ products }) => {
  useEffect(() => {
    const scrollContainer = document.querySelector(".noteworthy");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  });

  function newProducts() {
    if (products.length > 20) {
      return products.slice(products.length - 10);
    } else {
      return products;
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 new-and-noteworthy">
        <h1 className="font-bold text-3xl mb-10 dark:text-white main-page-section-titles">
          New and Noteworthy
        </h1>
        <div className="flex noteworthy">
          <div className="flex cards-container">
            {newProducts().map((product) => (
              <ScrollCard
                product={product}
                key={product._id}
                _id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                primaryImage={product.primaryImage}
                category={product.category.categoryName}
              />
            ))}
          </div>
        </div>
        <div className="noteworthy-fader-right bg-gradient-to-l from-[#f8f5f5]/100 to-[#f8f5f5]/0 dark:from-[#1C1C1C]/100 dark:to-[#1C1C1C]/0"></div>
        <div className="noteworthy-fader-left bg-gradient-to-r from-[#f8f5f5]/100 to-[#f8f5f5]/0 dark:from-[#1C1C1C]/100 dark:to-[#1C1C1C]/0"></div>
      </div>
    </div>
  );
};

export default NewNoteworthy;
