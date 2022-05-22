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
      <h2>Adding Category!</h2>
      <form action="submit" onSubmit={addProductHandler}>
        <label htmlFor="name">Name (Required): </label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default CategoryForm;
