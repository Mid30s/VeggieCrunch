import React, { useState } from "react";

import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { Container, Grid, Box } from "@mui/material";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <CategoryMenu
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Box sx={{ position: "relative" }}>
              <ProductList selectedCategory={selectedCategory} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 60,
                right: 10,
                zIndex: 9999, // On top of other elements
              }}
            >
              <Cart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Products;
