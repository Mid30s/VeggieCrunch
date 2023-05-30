import React from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

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
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Left section with office and farm contact details */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              Office Address: 123 Main Street, Adelaide, SA 5000
            </Typography>
            <Typography variant="body1" gutterBottom>
              Farm Address: 88 Billings Rd, Pages Flat SA 5172
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: +61-08-8888 8888
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: info@veggiecrunch.com
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Right section with contact us form */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography variant="h6" gutterBottom>
              Fill up the form with your details and we will get back to you
              within 24 hours.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth label="Email" name="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth label="Phone" name="phone" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
