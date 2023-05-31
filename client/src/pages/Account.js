import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";

const AccountPage = () => {
  const paymentMethods = [
    { id: 1, name: "Credit Card" },
    { id: 2, name: "PayPal" },
    { id: 3, name: "Stripe" },
  ];

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
          width: { xs: "80%", sm: "50%" },
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Box mt={4} p={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            Account Page
          </Typography>

          <Typography variant="h6" gutterBottom>
            Payment Methods
          </Typography>

          <Grid container spacing={2}>
            {paymentMethods.map((method) => (
              <Grid item key={method.id} xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{method.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountPage;
