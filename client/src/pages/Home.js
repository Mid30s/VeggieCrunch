import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "images/home.jpg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to our website
      </Typography>
      <Typography variant="h5" gutterBottom>
        Explore our awesome features and services
      </Typography>
      <Button variant="contained" color="primary">
        Explore
      </Button>
    </Box>
  );
};

export default HomePage;
