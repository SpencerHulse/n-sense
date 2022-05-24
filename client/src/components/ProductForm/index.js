import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";
import { QUERY_URL } from "../../utils/queries";

const ProductForm = ({ categories }) => {
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [getURL, { data }] = useLazyQuery(QUERY_URL);
  const [image, setImage] = useState();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [details, setDetails] = useState({
    details1: "",
    details2: "",
    details3: "",
    details4: "",
    details5: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleDetails = (event) => {
    const { name, value } = event.target;

    setDetails({ ...details, [name]: value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      getURL({ variables: { primaryImage: image.name } });
    }
  }, [image]);

  const addProductHandler = async (event) => {
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
    const { name, description, price, stock, category } = formState;
    const detailsArray = [];

    for (let key in details) {
      const detail = details[key];
      if (detail !== "") {
        detailsArray.push(detail);
      }
    }

    if (name && description && price && category) {
      let primaryImageCheck;
      if (!image) {
        primaryImageCheck =
          "https://nsense-images.s3.amazonaws.com/default.jpg";
      } else {
        primaryImageCheck = imageUrl;
      }

      addProduct({
        variables: {
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
  console.log(formState);
  return (
    <>
      <div className="adjust-container">
        <h2>Add a product</h2>
        <form action="submit" onSubmit={addProductHandler}>
          <select
            className="w-8/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="category"
            id="category"
            onChange={handleChange}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            onChange={handleChange}
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
          />
          <textarea
            type="text"
            rows="10"
            name="description"
            id="description"
            placeholder="Description (required)"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            min="0.99"
            placeholder="Price"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          {/* Input or the one where you can arrow up/down? */}
          <input
            type="number"
            name="stock"
            id="stock"
            min="0"
            placeholder="Stock"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          <button className="add-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
