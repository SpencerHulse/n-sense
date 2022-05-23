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
import { REMOVE_PRODUCT, REMOVE_CATEGORY } from "../utils/mutations";
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
  const [selectedCategory, setSelectedCategory] = useState();
  const { products } = useSelector((state) => state.product);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
  const [removeCategory] = useMutation(REMOVE_CATEGORY);

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

  function handleCategoryChange() {
    setSelectedCategory();
    let selected = document.getElementById("categories").options;
    setSelectedCategory(selected[selected.selectedIndex].value);
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

  const categoryDeleteHandler = () => {
    removeCategory({ variables: { categoryName: selectedCategory } });
    window.location.assign("/admin");
  };

  return (
    <>
      <div className="section">
        <div className="container mx-auto">
        <h2 className="mb-10">Admin Dashboard</h2>
          <div>
            {/* Thinking each could take up half the screen, and a form can pop up beneath depending on selection */}
            <div className="order-details">

            <h2>Categories</h2>
            <div className="flex gap-4 items-center">

            <select className="w-8/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="categories"
              id="categories"
              onChange={() => handleCategoryChange()}
              >
              {!categoryLoading &&
                categories.map((category) => (
                  <option value={category.categoryName} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
            <button className="mt-5 add-button text-white rounded-md w-4/12" onClick={categoryDeleteHandler}>
              Delete Selected Category
            </button>
                </div>
            <br />
            <button onClick={() => setFormType("Add Category")}>
              Add New Category
            </button>
            {formType === "Add Category" && <CategoryForm />}
          </div>
          </div>
          <div className="order-details mt-5">
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
          
        </div>
      </div>
    </>
  );
};

export default Admin;
