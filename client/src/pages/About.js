import React from "react";
import { Typography, Container, Grid, Box, Avatar } from "@mui/material";

const AboutUs = () => {
  const partnerships = [
    {
      logo: "/images/foodland.png",
      description: "Foodland",
    },
    {
      logo: "/images/coles.png",
      description: "Coles",
    },
    {
      logo: "/images/woolworths.png",
      description: "Woolworths",
    },
  ];

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
          width: { xs: "80%", sm: "50%" },
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          About Us
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit
          amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget
          elementum magna tristique.
        </Typography>

        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          sx={{ mt: 5 }}
        >
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="John Doe"
                src="/images/avatar.png"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" color="textPrimary">
                John Doe
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Founder
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Jane Doe"
                src="/images/avatar.png"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" color="textPrimary">
                Jane Doe
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Co-Founder
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Joe Doe"
                src="/images/avatar.png"
                sx={{ width: 100, height: "auto" }}
              />
              <Typography variant="h5" color="textPrimary">
                Joe Doe
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Co-Founder
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          sx={{ mt: 5 }}
        >
          Partnerships
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {partnerships.map((partnership, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={`Partner ${index + 1}`}
                  src={partnership.logo}
                  sx={{ width: 120, height: 120, marginLeft: 10 }}
                />
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  align="center"
                  sx={{ marginLeft: 10, marginTop: 2 }}
                >
                  {partnership.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
