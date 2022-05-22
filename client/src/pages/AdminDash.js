import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import CategoryForm from "../components/CategoryForm";
import UpdateProduct from "../components/UpdateProduct";
import Auth from "../utils/auth";

import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
import { updateCategories } from "../features/categorySlice";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
import { REMOVE_PRODUCT } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

const Admin = () => {
  if (!Auth.loggedIn()) {
    window.location.assign("/");
  } else if (!Auth.getProfile().data.admin) {
    window.location.assign("/");
  }

  const dispatch = useDispatch();
  const [formType, setFormType] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const { products } = useSelector((state) => state.product);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);

  const { loading: productLoading, data: productData } =
    useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (productData) {
      dispatch(updateProducts(productData.products));

      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!productLoading) {
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [productData, productLoading, dispatch]);

  const { categories } = useSelector((state) => state.category);

  const { loading: categoryLoading, data: categoryData } =
    useQuery(QUERY_CATEGORIES);
  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
    }
  }, [categoryData, categoryLoading, dispatch]);

  function handleProductChange() {
    setSelectedProduct();
    let selected = document.getElementById("products").options;
    setSelectedProduct(selected[selected.selectedIndex].value);
  }

  useEffect(() => {
    if (selectedProduct) {
      setFormType("Update Product");
    } else {
      setFormType("");
    }
  }, [selectedProduct]);

  const productDeleteHandler = () => {
    removeProduct({ variables: { id: selectedProduct } });
    window.location.assign("/admin");
  };

  return (
    <>
      <h1>Admin Page!</h1>
      <div>
        {/* Thinking each could take up half the screen, and a form can pop up beneath depending on selection */}
        <h2>Categories</h2>
        <select name="categories" id="categories">
          {!categoryLoading &&
            categories.map((category) => (
              <option
                value={category.categoryName.toLowerCase()}
                key={category._id}
              >
                {category.categoryName}
              </option>
            ))}
        </select>
        <button>Delete Selected Category</button>
        <br />
        <button onClick={() => setFormType("Add Category")}>
          Add New Category
        </button>
      </div>
      <div>
        <h2>Products</h2>
        <select
          name="products"
          id="products"
          onChange={() => handleProductChange()}
        >
          <option value="">Select a Product</option>
          {!productLoading &&
            products.map((product, i) => (
              <option value={product._id} key={product._id}>
                {product.name}
              </option>
            ))}
        </select>
        <button onClick={productDeleteHandler}>Delete Selected Product</button>
        <br />
        <button onClick={() => setFormType("Add Product")}>
          Add New Product
        </button>
      </div>
      {formType === "Add Product" && <ProductForm categories={categories} />}
      {formType === "Update Product" && selectedProduct && (
        <UpdateProduct
          selectedProduct={selectedProduct}
          categories={categories}
        />
      )}
      {formType === "Add Category" && <CategoryForm />}
    </>
  );
};

export default Admin;
