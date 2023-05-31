import React, { useEffect } from "react";
import { Typography, Button, Rating } from "@mui/material";
import { CheckCircleOutline as CheckCircleIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";

const PaymentSuccessPage = ({ products }) => {
  const navigate = useNavigate();

  // useMutation hook returns a tuple that includes:
  // - addOrder: Mutation function that we call to execute the mutation
  // - data: If the mutation has been executed, this will contain the result
  // - loading: Will be true while the mutation is in progress
  // - error: Will contain any error that occurred when executing the mutation
  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER);

  console.log("add order data", data);
  console.log("loading", loading);
  console.log("add order error", error);

  useEffect(() => {
    if (products && products.length > 0) {
      try {
        // Execute the mutation, passing the products as a variable
        addOrder({ variables: { products } });
      } catch (error) {
        console.error("Error adding order:", error);
      }
    }
  }, [products, addOrder]);

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
