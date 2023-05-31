import React, { useState, useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
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
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NDfeeFp6VlKIMI2xWmhCBFGf5y4OiVy5e9eOFVKWHvXPHxLkQChvZIS0MdPWZ7zzmM8CuyJM4Cp0FcK2mZKm1Ke002fWlJZXO"
);
// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

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
  const [getCheckout, { data, error }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (error) {
      console.log("Checkout query error:", error);
      return;
    }

    if (data) {
      console.log("Checkout query data:", data);
      (async () => {
        const stripe = await stripePromise;
        const { session } = data.checkout;
        const result = await stripe.redirectToCheckout({
          sessionId: session,
        });
        console.log("Stripe redirectToCheckout result", result);
        if (result.error) {
          console.error(result.error.message);
        }
      })();
    }
  }, [data, error]);

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

  const handleCheckout = async () => {
    console.log("Starting Checkout process");
    if (!user) {
      console.log("User not logged in");
      setOpenSnackbar(true); // Open the Snackbar
      setTimeout(() => {
        setOpenSnackbar(false); // Close the Snackbar after 2 seconds
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000);
    } else {
      console.log("User is logged in");
      let productIds = [];
      cartItems.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          productIds.push(item._id);
        }
      });

      console.log("Product IDs: ", productIds);
      getCheckout({ variables: { products: productIds } });
      console.log("Checkout query executed");
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
