import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Pagination,
} from "@mui/material";

function ProductList({ onSelectProduct }) {
  const { loading, error, data: productsData } = useQuery(QUERY_PRODUCTS);

  console.log("Products data:", productsData);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container spacing={2}>
      {productsData.products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <Card onClick={() => onSelectProduct(product._id)}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
