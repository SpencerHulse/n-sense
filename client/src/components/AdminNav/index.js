import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const AdminNav = () => {
  return (
    <>
      {Auth.getProfile().data.admin && (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      )}
    </>
  );
};

export default AdminNav;
