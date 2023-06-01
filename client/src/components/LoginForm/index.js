import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LoginForm({ handleChange, handleFormSubmit, formState }) {
  const responseGoogle = (response) => {
    console.log(response);
    // Google OAuth logic here...
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
        Login
      </Button>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", m: 2, p: 1 }}
      >
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Don't have an account? Sign up Now</Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <GoogleLogin
          clientId="467009784034-e9eg8cun16d8kkchljnpgb67j870852l.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ width: "100%", height: "50px" }}
        />
      </Box>
    </Box>
  );
}

export default LoginForm;
