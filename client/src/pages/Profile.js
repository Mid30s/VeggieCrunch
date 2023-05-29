import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import AuthService from "../utils/auth";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const UpdateProfile = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    fullName: "",
    address: "",
    phone: "",
  });
  // Get user ID
  const loggedInUser = AuthService.getProfile();
  const userId = loggedInUser?._id;
  console.log("Logged in user ID:", userId);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  console.log("Query loading:", loading);
  console.log("Query error:", error);
  console.log("Query data:", data);

  useEffect(() => {
    if (data) {
      setFormState({
        username: data.user.username,
        email: data.user.email,
        fullName: data.user.fullName,
        address: data.user.address,
        phone: data.user.phone,
      });
    }
  }, [data]);

  const [updateUser] = useMutation(UPDATE_USER);

  // State for Snackbar
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting form with state:", formState);
    const mutationResponse = await updateUser({
      variables: {
        _id: AuthService.getProfile()._id,
        ...formState,
      },
    });

    console.log("Mutation response:", mutationResponse);

    // If mutation is successful, show Snackbar
    if (mutationResponse) {
      setOpen(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
        bgcolor: "#C3E1D9",
        height: "100vh",
      }}
    >
      <Box sx={{ width: { xs: "80%", sm: "50%" }, margin: "0 auto" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Update Profile
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Full Name"
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profile updated successfully!
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
