import React, { useEffect } from "react";
import { Typography, Button, Rating } from "@mui/material";
import { CheckCircleOutline as CheckCircleIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      // Get the cart data from IndexedDB
      const cart = await idbPromise("cart", "get");

      // Map over the items to get their _id values
      const products = cart.map((item) => item._id);

      console.log("Cart: ", cart); // data in the cart
      console.log("Products: ", products); // product IDs

      // If there are items in the cart, send the ADD_ORDER mutation
      if (products.length) {
        try {
          const mutationResponse = await addOrder({ variables: { products } });
          console.log("Mutation response: ", mutationResponse);
          // Remove each product in the order from the cart in IndexedDB
          products.forEach((item) => {
            idbPromise("cart", "delete", item);
          });
        } catch (error) {
          console.error("Error adding order:", error);
        }
      }

      // After a 10 seconds delay, redirect to the home page
      setTimeout(() => {
        navigate("/");
      }, 10000);
    }

    saveOrder();
  }, [addOrder, navigate]);

  console.log("Mutation data: ", data);
  console.log("Loading state: ", loading);
  console.log("Mutation error: ", error);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CheckCircleIcon style={{ fontSize: 80, color: "#4caf50" }} />
      <Typography variant="h3" gutterBottom>
        Payment Successful!
      </Typography>
      <Rating
        name="read-only"
        value={5}
        readOnly
        size="large"
        style={{ color: "#ff9800" }}
      />
      <Typography variant="h6">Thank you for your purchase.</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
