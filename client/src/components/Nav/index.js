import React, { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCategories, selectCategory } from "../../features/categorySlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

function Nav() {
  const dispatch = useDispatch();
  const { categories, currentCategory } = useSelector(
    (state) => state.category
  );

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
    }
  }, [categoryData, loading, updateCategories]);

  return (
    <header>
      <div className="flex flew-row w-full p-6">
        <div className="w-1/2 flex flex-row justify-between items-center">
          <div className="flex-row logo-container flex ">
            <h1 className="text-3xl">Logo</h1>
          </div>
          {loading
            ? "Loading"
            : categories.map((category) => {
                return (
                  <a href={`#${category.categoryName}`} key={category._id}>
                    {category.categoryName}
                  </a>
                );
              })}
        </div>
        <div className="right-nav w-1/2 flex justify-end items-center">
          <a
            href="#cart"
            className="nav-link mr-8"
            /* onClick={() => setCurrentNav("cart")} */
          >
            Cart
          </a>
          <a
            href="#about"
            className="nav-link"
            /* onClick={() => setCurrentNav("about")} */
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
