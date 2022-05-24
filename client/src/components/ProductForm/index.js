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



      {/* <form action="submit" className="mt-8 space-y-6" onSubmit={addProductHandler}>


<input type="hidden" name="remember" value="true" />
<div className="rounded-md shadow-sm -space-y-px">
  <div>
    <label htmlFor="name" className="sr-only">
      Email address
    </label>


  </div>
  <div>

    <label htmlFor="description" className="sr-only">
      Description (Required):
    </label>


    <textarea
      type="text"
      name="description"
      id="description"
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      onChange={handleChange}
    />


  </div>
</div>

{error && (
  <div>
    <p>The provided credentials are incorrect</p>
  </div>
)}

<div>
  <button
    type="submit"
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  >
    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg
        className="h-5 w-5 text-green-500 group-hover:text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
    Sign in
  </button>
</div>
</form> */}






      <h2>Adding Product!</h2>
      <form action="submit" onSubmit={addProductHandler}>
        <input type="text" name="name" placeholder="Name" id="name" onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        <textarea
          type="text"
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
          min="0"
          placeholder="Price"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          onChange={handleDetails}
        />

        {/* Input or the one where you can arrow up/down? */}
        <input
          type="number"
          name="stock"
          id="stock"
          min="0"
          placeholder="Stock"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          onChange={handleDetails}
        />

        <br />
        {/* Upload multiple images or give up and go with one? */}
        <label htmlFor="images">Images: </label>



        <div class="flex justify-center">
  <div class="mb-3 w-96">
    <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Default file input example</label>
    <input class="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
  </div>
</div>



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
