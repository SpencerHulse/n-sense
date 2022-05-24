import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { QUERY_PRODUCT, QUERY_URL } from "../../utils/queries";

const UpdateProduct = ({ categories, selectedProduct }) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { loading: loadingProduct, data: productData } = useQuery(
    QUERY_PRODUCT,
    { variables: { id: selectedProduct } }
  );
  const [getURL, { data }] = useLazyQuery(QUERY_URL);
  const [image, setImage] = useState();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [detailsState, setDetailsState] = useState({
    details1: "",
    details2: "",
    details3: "",
    details4: "",
    details5: "",
  });

  useEffect(() => {
    if (loadingProduct) return;
    const { name, description, details, price, stock, primaryImage, category } =
      productData.product;
    const categoryId = category._id;

    setFormState({
      name: name,
      description: description,
      price: price,
      stock: stock,
      primaryImage: primaryImage,
      category: categoryId,
    });

    const newDetails = {};
    for (let i = 1; i <= 5; i++) {
      const key = `details${i}`;
      if (!details[i - 1]) {
        newDetails[key] = "";
      } else {
        newDetails[key] = details[i - 1];
      }
    }
    setDetailsState(newDetails);
  }, [productData, loadingProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleDetails = (event) => {
    const { name, value } = event.target;

    setDetailsState({ ...detailsState, [name]: value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      getURL({ variables: { primaryImage: image.name } });
    }
  }, [image]);

  const updateProductHandler = async (event) => {
    event.preventDefault();
    // Upload the image (if it exists) to the AWS s3 Bucket
    let imageUrl;
    if (image) {
      await fetch(data.uploadImage.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      });
      // Gets the URL for src
      imageUrl = data.uploadImage.url.split("?")[0];
    }
    // Variables from the form
    const { name, description, price, stock, primaryImage, category } =
      formState;
    const detailsArray = [];

    for (let key in detailsState) {
      const detail = detailsState[key];
      if (detail !== "") {
        detailsArray.push(detail);
      }
    }

    if (name && description && price && category) {
      let primaryImageCheck;
      if (image) {
        primaryImageCheck = imageUrl;
      } else {
        primaryImageCheck = primaryImage;
      }

      updateProduct({
        variables: {
          id: selectedProduct,
          name: name,
          description: description,
          details: detailsArray,
          price: parseFloat(price),
          stock: parseInt(stock),
          primaryImage: primaryImageCheck,
          category: category,
        },
      });

      window.location.assign("/admin");
    }
  };

  useEffect(() => {
    if (!formState) {
      return;
    }

    for (let key in formState) {
      const formData = formState[key];
      if (key === "Category") {
        document.getElementById(key).selected = formData._id;
      } else {
        document.getElementById(key).value = formData;
      }
    }

    for (let key in detailsState) {
      const detail = detailsState[key];
      document.getElementById(key).value = detail;
    }
  }, [selectedProduct, formState, detailsState]);

  return (
    <>
      {formState && (
        <>
        <div className="adjust-container mt-5">
          <h2>Edit product</h2>
          <form action="submit" onSubmit={updateProductHandler}>
          <label htmlFor="category">Category (Required): </label>
            <select className="w-8/12 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category" id="category" onChange={handleChange}>
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <label htmlFor="name">Name (Required): </label>
            <input type="text" name="name" id="name" onChange={handleChange} className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2" />

            <br />
            <label htmlFor="description">Description (Required): </label>
            <textarea
            type="text"
            rows="10"
            name="description"
            id="description"
            placeholder="Description (required)"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
            onChange={handleChange}
          />
            <br />
            {/* Some kind of add new on button click type deal with a max of five? */}
            <label htmlFor="details">Details: </label>
            <input
            type="text"
            name="details1"
            id="details1"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleDetails}
          />
          <input
            type="text"
            name="details2"
            id="details2"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleDetails}
          />
          <input
            type="text"
            name="details3"
            id="details3"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleDetails}
          />
          <input
            type="text"
            name="details4"
            id="details4"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleDetails}
          />
          <input
            type="text"
            name="details5"
            id="details5"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleDetails}
          />
            <br />
            {/* Strict about getting a decimal .00 always + nothing but numbers? */}
            <label htmlFor="price">Price (Required): </label>
            <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            min="0"
            placeholder="Price"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
            onChange={handleDetails}
          />
            <br />
            {/* Input or the one where you can arrow up/down? */}
            <label htmlFor="stock">Stock: </label>
            <input
              type="number"
              name="stock"
              id="stock"
              min="0"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="primaryImage" id="primaryImage">
              Main Image:{" "}
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="fileupload block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={handleImageChange}
            />
            <br />
            {/* Change to select... */}
            <button className="add-button">Submit</button>
          </form>
      </div>
        </>
      )}

    </>
  );
};

export default UpdateProduct;
