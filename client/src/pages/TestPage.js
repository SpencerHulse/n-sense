import React, { useEffect } from "react";
import Testing from "../components/Testing";
import Auth from "../utils/auth";

import { useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_USERS,
  QUERY_USER,
  QUERY_CATEGORIES,
  QUERY_PRODUCTS,
  QUERY_PRODUCT,
  QUERY_ORDER,
} from "../utils/queries";

import {
  ADD_USER,
  LOGIN,
  UPDATE_USER,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_ORDER,
} from "../utils/mutations";

const TestPage = () => {
  const [getUsers, { loading: loadingUsers, data: usersData }] =
    useLazyQuery(QUERY_USERS);
  const [getUser, { loading: loadingUser, data: userData }] =
    useLazyQuery(QUERY_USER);
  const [getCategories, { loading: loadingCategories, data: categoriesData }] =
    useLazyQuery(QUERY_CATEGORIES);
  const [getProducts, { loading: loadingProducts, data: productsData }] =
    useLazyQuery(QUERY_PRODUCTS);
  const [getProduct, { loading: loadingProduct, data: productData }] =
    useLazyQuery(QUERY_PRODUCT, {
      variables: { id: "62805f273b57b327c88436c3" },
    });
  const [getOrder, { loading: loadingOrder, data: orderData }] = useLazyQuery(
    QUERY_ORDER,
    {
      variables: { id: "6281b7587661de175c8c7f95" },
    }
  );
  // Requires an order
  // const { data: orderData } = useQuery(QUERY_ORDER);

  const allQueryData = {
    usersData,
    userData,
    categoriesData,
    productsData,
    productData,
    orderData,
  };

  if (
    !loadingUsers &&
    !loadingUser &&
    !loadingCategories &&
    !loadingProducts &&
    !loadingProduct &&
    !loadingOrder
  ) {
    console.log(allQueryData);
    if (orderData) {
      const date = parseInt(orderData.order.purchaseDate);
      console.log(Date(date).toString());
    }
  }

  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN);
  const [updateUser] = useMutation(UPDATE_USER);
  const [addCategory] = useMutation(ADD_CATEGORY);
  const [removeCategory] = useMutation(REMOVE_CATEGORY);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    getUsers();
    getUser();
    getCategories();
    getProducts();
    getProduct();
    getOrder();
  }, [getUsers, getUser, getCategories, getProducts, getProduct, getOrder]);

  return (
    <div>
      <h2>Test Page!</h2>
      <button
        onClick={() =>
          addUser({
            variables: {
              username: "User8",
              email: "user8@testmail.com",
              password: "password12345",
            },
          })
        }
      >
        addUser
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          try {
            const mutationResponse = await login({
              variables: {
                email: "user7@testmail.com",
                password: "password12345",
              },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        login
      </button>
      <button
        onClick={() =>
          updateUser({
            variables: {
              username: "User7Updated",
            },
          })
        }
      >
        updateUser
      </button>
      <button
        onClick={() =>
          addCategory({
            variables: {
              categoryName: "Test Category",
            },
          })
        }
      >
        addCategory
      </button>
      <button
        onClick={() =>
          removeCategory({
            variables: {
              categoryName: "Test Category",
            },
          })
        }
      >
        removeCategory
      </button>
      <button
        onClick={() =>
          addProduct({
            variables: {
              name: "Test Product",
              description: "Testing client-side mutation",
              price: 19.95,
              stock: 200,
              images: ["image one", "image two"],
              primaryImage: "image one",
              category: "62805f273b57b327c88436bd",
            },
          })
        }
      >
        addProduct
      </button>
      <button
        onClick={() =>
          removeProduct({
            variables: {
              id: "6281b6517661de175c8c7f6b",
            },
          })
        }
      >
        removeProduct
      </button>
      <button
        onClick={() =>
          updateProduct({
            variables: {
              id: "6281b2d27661de175c8c7ed0",
              name: "updated name",
            },
          })
        }
      >
        updateProduct
      </button>
      <button
        onClick={() =>
          addOrder({
            variables: {
              products: [
                "62805f273b57b327c88436c3",
                "62805f273b57b327c88436c4",
              ],
            },
          })
        }
      >
        addOrder
      </button>
      <Testing />
    </div>
  );
};

export default TestPage;
