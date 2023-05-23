import React from "react";
import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    appBar: {
      top: "auto",
      bottom: 0,
      background: "#fff",
    },
    grow: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1),
    },
  };
});

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Box display={{ xs: "none", md: "flex" }} flexGrow={1}>
          <Link href="#" color="inherit" className={classes.link}>
            About us
          </Link>
          <Link href="#" color="inherit" className={classes.link}>
            Contact
          </Link>
          <Link href="#" color="inherit" className={classes.link}>
            Blog
          </Link>
        </Box>
        <Typography className={classes.grow} />
        <Box display={{ xs: "none", md: "flex" }}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"© "}
            Veggie Crunch {new Date().getFullYear()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
