import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

function Login() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField label="Email" margin="normal" />
      <TextField label="Password" margin="normal" type="password" />
      <Box mt={2}>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
