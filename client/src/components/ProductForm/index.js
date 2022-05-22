import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";

const ProductForm = ({ categories }) => {
  const [addProduct] = useMutation(ADD_PRODUCT);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    primaryImage: "",
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

  const addProductHandler = (event) => {
    event.preventDefault();
    const { name, description, price, stock, primaryImage, category } =
      formState;
    const detailsArray = [];

    for (let key in details) {
      const detail = details[key];
      if (detail !== "") {
        detailsArray.push(detail);
      }
    }

    if (name && description && price && category) {
      let primaryImageCheck;
      if (primaryImage === "") {
        primaryImageCheck = "default";
      } else {
        primaryImageCheck = primaryImage;
      }
      const imagesArray = [primaryImageCheck];

      addProduct({
        variables: {
          name: name,
          description: description,
          details: detailsArray,
          price: parseFloat(price),
          stock: parseInt(stock),
          images: imagesArray,
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
        {/* Upload multiple images or give up and go with one? */}
        <label htmlFor="images">Images: </label>
        <input type="text" name="images" id="images" onChange={handleChange} />
        <br />
        {/* Default to first image chosen? Then provide a dropdown using state? */}
        <label htmlFor="primaryImage">Main Image: </label>
        <input
          type="text"
          name="primaryImage"
          id="primaryImage"
          onChange={handleChange}
        />
        <br />
        {/* Change to select... */}
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
