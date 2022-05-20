import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import SingleProduct from "./pages/SingleProduct";
import TestPage from "./pages/TestPage";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import SuccessfulPurchase from "./pages/SuccessfulPurchase";
import Orders from "./pages/Orders";

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category/:category" component={Home} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route exact path="/success" component={SuccessfulPurchase} />
            <Route exact path="/test" component={TestPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
