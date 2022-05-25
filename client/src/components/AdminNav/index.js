import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const AdminNav = ({ classItemProp, classLiProp }) => {
  function closeNav() {
    document.body.classList.toggle("nav-open");
  }
  return (
    <>
      {Auth.getProfile().data.admin && (
        <li onClick={closeNav} className={classLiProp}>
          <Link className={classItemProp} to="/admin">
            Admin
          </Link>
        </li>
      )}
    </>
  );
};

export default AdminNav;
