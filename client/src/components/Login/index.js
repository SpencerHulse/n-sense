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
