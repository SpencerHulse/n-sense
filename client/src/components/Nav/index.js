import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { BsCart3 } from "react-icons/bs";
import Auth from "../../utils/auth";
import Cart from "../Cart";
import BurgerCart from "../Cart/burger.js";
import AdminNav from "../AdminNav";
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

  function toggleNav() {
    document.body.classList.toggle("nav-open");
  }

  function closeNav() {
    document.body.classList.toggle("nav-open");
  }

  return (
    <>
      <nav className="relative z-10 navbar-container dark:bg-[#606060] text-black dark:text-white">
        <div className="container mx-auto relative">
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
      {/* Hamburger */}
      <nav className="burger-nav dark:bg-[#606060] text-black dark:text-white">
        <div className="container mx-auto relative">
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
            </div>
            <div>
              <ul className="flex items-center">
                <BurgerCart />
                {Auth.loggedIn() ? (
                  <>
                    <li>
                      <Link to="/orders">Orders</Link>
                    </li>
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
        <button
          className="nav-toggle"
          aria-label="toggle navigation"
          onClick={toggleNav}
        >
          <span className="hamburger"></span>
        </button>
        <div className="nav">
          <ul className="nav-list">
            {Auth.loggedIn() && (
              <>
                <p className="nav-title">Administration</p>
                <AdminNav classItemProp={"nav-item"} classLiProp={"nav-li"} />
              </>
            )}
            <p className="nav-title">Categories</p>
            {loading
              ? "Loading"
              : categories.map((mapCategory) => {
                  return (
                    <li
                      key={mapCategory._id}
                      onClick={closeNav}
                      className="nav-li"
                    >
                      <Link
                        to={`/category/${mapCategory.categoryName.toLowerCase()}`}
                        onClick={() => singleCategory(mapCategory)}
                        className="nav-item"
                      >
                        {mapCategory.categoryName}
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
