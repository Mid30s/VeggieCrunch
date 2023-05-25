import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function SignupForm({ handleChange, handleFormSubmit, formState }) {
  return (
    <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        onChange={handleChange}
        value={formState.name}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        value={formState.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handleChange}
        value={formState.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", m: 2, p: 1 }}
      >
        <Link to="/login">Already have an account? Login Now</Link>
      </Box>
    </Box>
  );
}

export default SignupForm;
