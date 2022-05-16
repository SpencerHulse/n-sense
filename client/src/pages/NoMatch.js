import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h1>Placeholder links:</h1>
      <p>
        Click{" "}
        <Link to="/test">
          <strong>/test</strong>
        </Link>{" "}
        for the test page...
      </p>
      <p>
        Click{" "}
        <Link to="/product">
          <strong>/product</strong>
        </Link>{" "}
        for the SingleProduct page...
      </p>
    </div>
  );
};

export default NoMatch;
