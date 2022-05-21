import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const Admin = () => {
  const { loading, data } = useQuery(QUERY_USER);

  if (loading) {
    return <></>;
  }
  if (!Auth.loggedIn()) {
    return <></>;
  }

  return (
    <>
      {data.user.admin ? (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      ) : null}
    </>
  );
};

export default Admin;
