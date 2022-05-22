import React from "react";
import LoginForm from "../components/Login";
import Auth from "../utils/auth";

function Login() {
  if (Auth.loggedIn()) {
    window.location.assign("/");
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="minidialog mx-auto">
          <div className="minicontent mx-auto">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={require(`../assets/images/nsense-logo.png`)}
                alt="n-Sense logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  join today
                </a>
                !
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
