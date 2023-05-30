import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Pagination,
} from "@mui/material";

function ProductList({ onSelectProduct }) {
  const { loading, error, data: productsData } = useQuery(QUERY_PRODUCTS);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  console.log("Products data:", productsData);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Pagination logic
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedProducts = productsData.products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Grid container spacing={2} style={{ minHeight: "640px" }}>
        {selectedProducts.map((product) => (
          <Grid item key={product._id} xs={6} sm={4} md={3}>
            <Card>
              <Link to={`/product/${product._id}`}>
                <CardMedia
                  component="img"
                  height="190"
                  image={product.image}
                  alt={product.name}
                />
              </Link>
              <CardContent>
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    display="flex"
                    justifyContent="center"
                  >
                    {product.name}
                  </Typography>
                </Link>
                <Typography
                  display="flex"
                  justifyContent="center"
                  variant="body2"
                  color="text.secondary"
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Box display="flex" justifyContent="center" mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSelectProduct(product._id)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(productsData.products.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
}

export default ProductList;
