import React, { useState, useContext } from "react";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { getTotalPrice } from "../../utils/helpers";
import { CartContext } from "../../utils/CartContext";
import { UserContext } from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Cart = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Use the CartContext
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // Use the UserContext
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Add this line to ensure cartItems is always an array before accessing its length property
  const cartItemCount = (cartItems ?? []).length;

  //handling the open state of the Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    console.log(
      `handleQuantityChange called with productId ${productId} and quantity ${quantity}`
    );
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      setOpenSnackbar(true); // Open the snackbar
      setTimeout(() => {
        setOpenSnackbar(false); // Close the snackbar after 2 seconds
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } else {
      navigate("/checkout");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick} size="large">
        <Badge badgeContent={cartItemCount} color="secondary">
          <ShoppingCartIcon fontSize="large" style={{ fontSize: 50 }} />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          {console.log("Rendering cart items:", cartItems)}
          {(cartItems ?? []).map((item) => (
            <ListItem key={item._id}>
              <img
                src={`/images/${item.image.substring(7)}`}
                alt={item.product}
                style={{
                  width: "100px",
                  paddingRight: "10px",
                }}
              />
              <Grid container alignItems="center">
                <Grid item xs>
                  <ListItemText>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Price: {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <input
                    type="number"
                    value={item.quantity}
                    style={{ width: "50px", marginLeft: "15px" }}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(item._id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText
              primary={`Total: ${getTotalPrice(cartItems ?? [])}`}
            />
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </ListItem>
        </List>
      </Popover>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          You need to login first!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
