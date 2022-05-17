import React, { useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
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
  }, [categoryData, loading, updateCategories, dispatch]);

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">

          

        <div className="menu-left flex items-center">
          <div className="branding">
            <img src={require(`../../assets/images/nsense-logo.png`)} />
          </div>

          <ul className="flex">
          {loading
            ? "Loading"
            : categories.map((category) => {
                return (
                  <li><a href={`#${category.categoryName}`} key={category._id}>
                    {category.categoryName}
                  </a></li>
                );
              })}
          </ul>
        </div>
        <div>
          <ul className="flex items-center">
            <li>Cart</li>
            <li>About</li>
          </ul>
        </div>
      </div>
      </div>

    </nav>
  );
}

export default Nav;
