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

  return (
    <>
      <h2>Adding Product!</h2>
      <form action="submit" onSubmit={addProductHandler}>
        <label htmlFor="name">Name (Required): </label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <br />
        <label htmlFor="description">Description (Required): </label>
        <textarea
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
        />
        <br />
        {/* Some kind of add new on button click type deal with a max of five? */}
        <label htmlFor="details">Details: </label>
        <input
          type="text"
          name="details1"
          id="details1"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="details2"
          id="details2"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="details3"
          id="details3"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="details4"
          id="details4"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="details5"
          id="details5"
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
          onChange={handleChange}
        />
        <br />
        {/* Input or the one where you can arrow up/down? */}
        <label htmlFor="stock">Stock: </label>
        <input
          type="number"
          name="stock"
          id="stock"
          min="0"
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
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="category">Category (Required): </label>
        <select name="category" id="category" onChange={handleChange}>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option value={category._id} key={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </>
  );
};

export default ProductForm;
