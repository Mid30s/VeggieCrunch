import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import SignupForm from "../components/SignupForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
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
          backgroundColor: "#C3E1D9",
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
          <SignupForm
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

export default Signup;
