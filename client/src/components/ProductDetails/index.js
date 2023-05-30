import React from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";

const ProductDetails = ({ product }) => (
  <Box mt={4} p={2}>
    <Grid container spacing={4}>
      <Grid item md={6} xs={12}>
        <img
          src={`/images/${product.image.substring(7)}`}
          alt={product.name}
          style={{ width: "75%", height: "auto" }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Quantity: {product.quantity}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Category: {product.category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          In Stock: {product.inStock ? "✅" : "❌"}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Organic: {product.organic ? "✅" : "❌"}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  </Box>
);

export default ProductDetails;
