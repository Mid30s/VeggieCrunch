import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        // If item already exists in cart, increment its quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist in cart, add it with a quantity of 1
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log(`Updating product ${productId} to quantity ${newQuantity}`);
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === productId) {
          console.log(`Found product ${productId}, updating quantity.`);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
