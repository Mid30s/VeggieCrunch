import React from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <SentimentVeryDissatisfiedIcon
          style={{ fontSize: 100 }}
          color="primary"
        />
        <Typography variant="h3" color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
