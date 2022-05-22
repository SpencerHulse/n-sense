import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PRODUCT, REMOVE_PRODUCT } from "../../utils/mutations";
import { QUERY_PRODUCT } from "../../utils/queries";

const UpdateProduct = ({ categories, selectedProduct }) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
  const { loading: loadingProduct, data: productData } = useQuery(
    QUERY_PRODUCT,
    { variables: { id: selectedProduct } }
  );

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    primaryImage: "",
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
  }, [productData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleDetails = (event) => {
    const { name, value } = event.target;

    setDetailsState({ ...detailsState, [name]: value });
  };

  const updateProductHandler = (event) => {
    event.preventDefault();
    const { name, description, price, stock, primaryImage, category } =
      formState;
    const detailsArray = [];
    const imagesArray = [primaryImage];

    for (let key in detailsState) {
      const detail = detailsState[key];
      if (detail !== "") {
        detailsArray.push(detail);
      }
    }

    if (name && description && price && category) {
      updateProduct({
        variables: {
          id: selectedProduct,
          name: name,
          description: description,
          details: detailsArray,
          price: parseFloat(price),
          stock: parseInt(stock),
          images: imagesArray,
          primaryImage: primaryImage,
          category: category,
        },
      });

      window.location.assign("/admin");
    }
  };

  const productDeleteHandler = () => {
    removeProduct({ variables: { id: selectedProduct } });
    window.location.assign("/admin");
  };

  useEffect(() => {
    if (!formState) {
      return;
    }

    for (let key in formState) {
      const formData = formState[key];
      if (formData.__typename === "Category") {
        document.getElementById(key).selected = formData._id;
      } else {
        document.getElementById(key).value = formData;
      }
    }

    for (let key in detailsState) {
      const detail = detailsState[key];
      document.getElementById(key).value = detail;
    }
  }, [selectedProduct, formState]);

  return (
    <>
      {formState && (
        <>
          <h2>Updating Product!</h2>
          <form action="submit" onSubmit={updateProductHandler}>
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
            <input
              type="text"
              name="images"
              id="images"
              onChange={handleChange}
            />
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
          <button onClick={productDeleteHandler}>Delete</button>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
