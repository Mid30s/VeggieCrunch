import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./utils/CartContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import SingleProduct from "./pages/singleProduct";
import PageNotFound from "./pages/pageNotFound";
import PaymentSuccessPage from "./pages/paymentSuccess";
import AccountPage from "./pages/Account";
import UserDashboard from "./pages/userDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div
              className="container-fluid"
              style={{ padding: "0", margin: "0" }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/success" element={<PaymentSuccessPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
