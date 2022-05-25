import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/mutations";

const CategoryForm = () => {
  const [addCategory] = useMutation(ADD_CATEGORY);

  const [formState, setFormState] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const addProductHandler = (event) => {
    event.preventDefault();
    const { name } = formState;

    if (name) {
      addCategory({ variables: { categoryName: name } });
      window.location.assign("/admin");
    }
  };

  return (
    <>
      <div className="adjust-container dark:bg-[#333333]">

        <h2 className="mb-2 dark:text-white">Add a Category</h2>
        <form action="submit" onSubmit={addProductHandler}>
          <input type="text" name="name" placeholder="Category name" id="name" onChange={handleChange} className="dark:bg-[#1a1a1a] dark:text-white dark:border-black appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2" />
          <button className="add-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
