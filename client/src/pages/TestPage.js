import React from "react";
import Testing from "../components/Testing";

import { useQuery } from "@apollo/client";
import {
  QUERY_USERS,
  QUERY_CATEGORIES,
  QUERY_PRODUCTS,
  QUERY_PRODUCT,
  // QUERY_ORDER,
} from "../utils/queries";

const TestPage = () => {
  const { data: usersData } = useQuery(QUERY_USERS);
  const { data: categoriesData } = useQuery(QUERY_CATEGORIES);
  const { data: productsData } = useQuery(QUERY_PRODUCTS);
  const { data: productData } = useQuery(QUERY_PRODUCT, {
    variables: { id: "62805f273b57b327c88436c3" },
  });
  // Requires an order
  // const { data: orderData } = useQuery(QUERY_ORDER);

  const allQueryData = {
    usersData,
    categoriesData,
    productsData,
    productData,
  };

  console.log(allQueryData);

  return (
    <div>
      <h2>Test Page!</h2>
      <Testing />
    </div>
  );
};

export default TestPage;
