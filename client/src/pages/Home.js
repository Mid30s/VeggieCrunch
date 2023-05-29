import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/products");
  };

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
        The best place to buy fresh veggies
      </Typography>

      <Typography variant="h5" gutterBottom>
        Explore our awesome products and services
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#7E5A44" }}
        onClick={handleExplore}
      >
        Explore
      </Button>
    </Box>
  );
};

export default HomePage;
