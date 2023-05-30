import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getTotalPrice } from "../../utils/helpers"; // add your helper functions file path

const Cart = ({ cartItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Add this line to ensure cartItems is always an array before accessing its length property
  const cartItemCount = (cartItems ?? []).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          {(cartItems ?? []).map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.product}
                secondary={`Quantity: ${item.quantity} Price: ${item.price}`}
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText
              primary={`Total: ${getTotalPrice(cartItems ?? [])}`}
            />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default Cart;
