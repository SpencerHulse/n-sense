import React, { useState } from "react";
import "./style.css";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Login = () => {
  const [display, setDisplay] = useState(false);
  const [selectForm, setSelectForm] = useState("login");

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const [formStateSignUp, setFormStateSignUp] = useState({
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormSubmitSignUp = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formStateSignUp.email,
        password: formStateSignUp.password,
        username: formStateSignUp.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeSignUp = (event) => {
    const { name, value } = event.target;
    setFormStateSignUp({
      ...formStateSignUp,
      [name]: value,
    });
  };

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={handleFormSubmit}
    >
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
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
    </form>
  );

  return (
    <>
      <li id="myBtn" onClick={() => setDisplay(true)}>
        Login/Signup
      </li>

      <div id="myModal" className={`modal ${display ? "block" : "none"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setDisplay(false)}>
            &times;
          </span>
          {selectForm === "login" ? (
            <div className="container my-1">
              <h2>Login</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                  <label htmlFor="email">Email address:</label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row space-between my-2">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                  />
                </div>
                {error ? (
                  <div>
                    <p className="error-text">
                      The provided credentials are incorrect
                    </p>
                  </div>
                ) : null}
                <div className="flex-row flex-end">
                  <button type="submit">Submit</button>
                  <p onClick={() => setSelectForm("signUp")}>Sign Up Instead</p>
                </div>
              </form>
            </div>
          ) : (
            <div className="container my-1">
              <h2>Signup</h2>
              <form onSubmit={handleFormSubmitSignUp}>
                <div className="flex-row space-between my-2">
                  <label htmlFor="firstName">Username:</label>
                  <input
                    placeholder="Username"
                    name="username"
                    type="username"
                    id="username"
                    onChange={handleChangeSignUp}
                  />
                </div>
                <div className="flex-row space-between my-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChangeSignUp}
                  />
                </div>
                <div className="flex-row space-between my-2">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChangeSignUp}
                  />
                </div>
                <div className="flex-row flex-end">
                  <button type="submit">Submit</button>
                  <p onClick={() => setSelectForm("login")}>Log In Instead</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
