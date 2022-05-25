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
          <h2 className="mb-6 text-center dark:text-white">Admin Dashboard</h2>

          {/* Thinking each could take up half the screen, and a form can pop up beneath depending on selection */}
          <div className="admin-box mx-auto dark:bg-[#494949]">
            <h2 className="dark:text-white">Categories</h2>
            <p className="mb-5 dark:text-white">Select a category to remove</p>

            <div className="flex gap-4 w-full">
              <div className="w-8/12">
                <select
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              </div>
              <div className="w-4/12">
                <button
                  className="w-full text-red-900 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={categoryDeleteHandler}
                >
                  Delete Category
                </button>
              </div>
            </div>
            <br />
            {formType !== "Add Category" && (
              <button
                className="add-button"
                onClick={() => setFormType("Add Category")}
              >
                Add New Category
              </button>
            )}
            {formType === "Add Category" && <CategoryForm />}
          </div>

          <div className="admin-box mx-auto dark:bg-[#494949]">
            <h2 className="dark:text-white">Products</h2>
            <p className="mb-5 dark:text-white">Select a product to edit or remove</p>
            <div className="flex gap-4 w-full">
              <div className="w-8/12">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              </div>
              <div className="w-4/12">
                <button
                  className="w-full text-red-900 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={productDeleteHandler}
                >
                  Delete Product
                </button>
              </div>
            </div>
            <br />
            {formType !== "Add Product" && (
              <button
                className="add-button"
                onClick={() => setFormType("Add Product")}
              >
                Add New Product
              </button>
            )}
            {formType === "Add Product" && (
              <ProductForm categories={categories} />
            )}
            {formType === "Update Product" && selectedProduct && (
              <UpdateProduct
                selectedProduct={selectedProduct}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
