import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    appBar: {
      top: "auto",
      bottom: 0,
      backgroundColor: "#DCE35B",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
      padding: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    link: {
      color: "#fff",
      margin: theme.spacing(1),
    },
    iconButton: {
      color: "#fff",
      marginLeft: theme.spacing(1),
    },
    text: {
      color: "#fff",
    },
    copyright: {
      color: "#fff",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  };
});

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.text}
              sx={{ marginLeft: 1 }}
            >
              Quick Links
            </Typography>
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/about" className={classes.link}>
              About Us
            </Link>
            <Link href="/contact" className={classes.link}>
              Contact
            </Link>
            <Link href="/blog" className={classes.link}>
              Blog
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.text}
              sx={{ marginLeft: 2 }}
            >
              Follow Us
            </Typography>
            <IconButton
              edge="start"
              className={classes.iconButton}
              aria-label="facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.iconButton}
              aria-label="twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.iconButton}
              aria-label="linkedin"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.iconButton}
              aria-label="instagram"
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.copyright}>
              {"© "}
              Veggie Crunch {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
