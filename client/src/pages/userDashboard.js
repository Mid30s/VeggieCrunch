import React, { useEffect, useState } from "react";

import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { Container, Typography, Box, Grid, Paper, Chip } from "@mui/material";
import { USER_QUERY } from "../utils/queries";

const UserDashboard = () => {
  // Get user ID
  const loggedInUser = AuthService.getProfile();
  const userId = loggedInUser?._id;
  console.log("Logged in user ID:", userId);

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: userId },
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data.user.orders);
    }
  }, [data]);

  console.log("Orders:", orders);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Orders
          </Typography>
          {orders.map((order) => {
            const totalPrice = order.products.reduce(
              (acc, { product, quantity }) => acc + product.price * quantity,
              0
            );
            return (
              <Box key={order._id} mb={3}>
                <Paper>
                  <Box p={3}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={10}
                      sx={{ flexGrow: 1, justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <Typography variant="h5" display="inline" gutterBottom>
                          Order ID: {order._id}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" display="inline" gutterBottom>
                          {new Date(
                            parseInt(order.purchaseDate)
                          ).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item marginRight={5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box component="span" marginLeft={1}>
                            <Chip
                              label={order.status}
                              color="primary"
                              style={{ backgroundColor: "orange" }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {order.products.map(({ product, quantity }) => (
                      <Grid
                        container
                        spacing={2}
                        key={product._id}
                        marginTop={1}
                      >
                        <Grid item xs={3} sm={3} md={3}>
                          <img
                            src={`/images/${product.image.substring(6)}`}
                            alt={product.name}
                            style={{ width: "35%" }}
                          />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                          <Typography variant="body1">
                            {product.name} x {quantity}
                          </Typography>
                          <Typography variant="body1" marginTop={1}>
                            Price: {product.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                    <Typography variant="h6" gutterBottom marginTop={1}>
                      Total: ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Container>
      </Box>
    </Container>
  );
};

export default UserDashboard;
