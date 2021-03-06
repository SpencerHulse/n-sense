import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import AdminDash from "./pages/AdminDash";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import SingleProduct from "./pages/SingleProduct";
import SuccessfulPurchase from "./pages/SuccessfulPurchase";
import NoMatch from "./pages/NoMatch";

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
        <div className="main bg-[#F8F5F5] dark:bg-[#1C1C1C]">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={AdminDash} />
            <Route exact path="/category/:category" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route exact path="/success" component={SuccessfulPurchase} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
