import React, { useState } from "react";

const UpdateProduct = ({ categories }) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    primaryImage: "",
    category: "",
  });

  const [details, setDetails] = useState({
    detailsOne: "",
    detailsTwo: "",
    detailsThree: "",
    detailsFour: "",
    detailsFive: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleDetails = (event) => {
    const { name, value } = event.target;

    setDetails({ ...details, [name]: value });
  };

  console.log(formState);

  return (
    <>
      <h2>Adding Product!</h2>
      <form action="submit">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <br />
        <label htmlFor="description">Description: </label>
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
          name="detailsOne"
          id="detailsOne"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="detailsTwo"
          id="detailsTwo"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="detailsThree"
          id="detailsThree"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="detailsFour"
          id="detailsFour"
          onChange={handleDetails}
        />
        <br />
        <input
          type="text"
          name="detailsFive"
          id="detailsFive"
          onChange={handleDetails}
        />
        <br />
        {/* Strict about getting a decimal .00 always + nothing but numbers? */}
        <label htmlFor="price">Price: </label>
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
        <label htmlFor="category">Category: </label>
        <select name="category" id="category" onChange={handleChange}>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option value={category._id} key={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default UpdateProduct;
