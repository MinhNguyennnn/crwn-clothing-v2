import { createContext, useState } from "react";

export const CartContexts = createContext({
  isCartOpen: Boolean,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return (
    <CartContexts.Provider value={value}>{children}</CartContexts.Provider>
  );
};
