import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { BsCart3 } from "react-icons/bs";
import Auth from "../../utils/auth";
import Cart from "../Cart";
import AdminNav from "../AdminNav";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCategories, selectCategory } from "../../features/categorySlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { BsSearch } from "react-icons/bs";

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
    // document.getElementsByClassName("main-hero").style.display = "none";
    // document.getElementsByClassName("scroll-carousel").style.display = "none";

    dispatch(selectCategory(category));
  }

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="menu-left flex items-center">
            <div className="branding-container">
              <Link to="/">
                <img
                  className="branding"
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
              <li>
                <input
                  className="border-black border-2 rounded-lg"
                  type="text"
                  placeholder="Search..."
                ></input>
                <button className="ml-2" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </li>
              {Auth.loggedIn() ? (
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              ) : null}
              <Cart />
              {Auth.loggedIn() ? (
                <>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <AdminNav />
                  <li>
                    <a href="/" onClick={() => Auth.logout()}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Login/Signup</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
