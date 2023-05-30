import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Container } from "@mui/material";
import ProductDetails from "../components/ProductDetails";

const SingleProduct = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_PRODUCT, {
    variables: { id },
  });

  console.log("Single product data:", data);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  const { product } = data;

  return (
    <Container
      maxWidth="false"
      sx={{
        p: 1,
        m: 0,
        pl: { sm: 0 },
        pr: { sm: 0 },
        background: "linear-gradient(to right, #dad299, #b0dab9)",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <ProductDetails product={product} />;
      </Box>
    </Container>
  );
};

export default SingleProduct;
