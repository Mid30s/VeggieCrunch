import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import LoginForm from "../components/LoginForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container
      component="main"
      maxWidth="false"
      sx={{ p: 0, m: 0, pl: { sm: 0 }, pr: { sm: 0 } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-evenly",
          background: "linear-gradient(to right, #dad299, #b0dab9)",
          height: "100vh",
          p: { xs: 1, sm: 2, md: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { sm: "100%", md: "45%" },
            mb: { xs: 10, md: 10 },
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/images/welcome.jpg"}
            alt="Welcome to our site"
            style={{
              width: "58%",
              height: "auto",
              borderRadius: "20px",
              marginLeft: "15%",
              marginBottom: "5%",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { sm: "100%", md: "50%" },
            mb: { xs: 3, md: 0 },
          }}
        >
          <LoginForm
            handleChange={handleChange}
            handleFormSubmit={handleFormSubmit}
            formState={formState}
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
