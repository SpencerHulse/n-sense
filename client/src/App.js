import React, { useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import SingleProduct from "./pages/SingleProduct";
import TestPage from "./pages/TestPage";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [navs] = useState([
    "Cart",
    "About",
    "Smellables",
    "Tastables",
    "Burnables",
  ]);

  const [currentNav, setCurrentNav] = useState(navs[1]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <Nav
            navs={navs}
            setCurrentNav={setCurrentNav}
            currentNav={currentNav}
          ></Nav> */}
          <SingleProduct></SingleProduct>
          <Home></Home>
          {/* <Switch>
            <Route exact path="/" component={TestPage} />
            <Route component={NoMatch} />
          </Switch> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
