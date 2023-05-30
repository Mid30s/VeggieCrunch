// helpers.js
export function getTotalPrice(cartItems) {
  return cartItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);
}
