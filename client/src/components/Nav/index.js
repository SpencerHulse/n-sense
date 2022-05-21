import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { BsCart3 } from "react-icons/bs";
import Auth from "../../utils/auth";
import Cart from "../Cart";
import Login from "../Login";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCategories, selectCategory } from "../../features/categorySlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

function Nav() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
    }
  }, [categoryData, loading, dispatch]);

  function singleCategory(category) {
    dispatch(selectCategory(category));
  }

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="menu-left flex items-center">
            <div className="branding">
              <Link to="/">
                <img
                  src={require(`../../assets/images/nsense-logo.png`)}
                  alt="logo"
                />
              </Link>
            </div>
            <ul className="flex">
              {loading
                ? "Loading"
                : categories.map((category) => {
                    return (
                      <li key={category._id}>
                        <Link
                          to={`/category/${category.categoryName.toLowerCase()}`}
                          onClick={() => singleCategory(category)}
                        >
                          {category.categoryName}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div>
            <ul className="flex items-center">
              {Auth.loggedIn() ? (
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              ) : null}
              <Cart />
              <li>About</li>
              {Auth.loggedIn() ? (
                <li>
                  <a href="/" onClick={() => Auth.logout()}>
                    Logout
                  </a>
                </li>
              ) : (
                <Login />
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
