import { createContext, useState, useEffect } from "react";

const checkCartItems = (cartItems, products) => {
  //check if item already in cart list
  const cartItemExist = cartItems.find((item) => item.id === products.id);

  if (cartItemExist) {
    return cartItems.map((item) =>
      item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...products, quantity: 1 }];
};

export const CartContexts = createContext({
  isCartOpen: Boolean,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartItemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addItemsToCart = (products) => {
    setCartItems(checkCartItems(cartItems, products));
  };

  useEffect(() => {
    setCartItemCount(
      cartItems.reduce(
        (totalValue, cartItems) => totalValue + cartItems.quantity,
        0
      )
    );
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartItemCount };

  return (
    <CartContexts.Provider value={value}>{children}</CartContexts.Provider>
  );
};
