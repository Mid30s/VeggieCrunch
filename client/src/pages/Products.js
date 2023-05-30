import React from "react";

import CategoryMenu from "../components/CategoryMenu";
// import ProductList from "../components/ProductList";
// import Cart from "../components/Cart";
import { Container, Box } from "@mui/material";

const Products = () => {
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
        <CategoryMenu />
        {/* <ProductList /> */}
        {/* <Cart /> */}
      </Box>
    </Container>
  );
};

export default Products;
