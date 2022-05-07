import { createContext, useState, useEffect } from "react";

const checkCartItems = (cartItems, productItem) => {
  //check if item already in cart list
  const cartItemExist = cartItems.find(
    (cartItem) => cartItem.id === productItem.id
  );

  if (cartItemExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === productItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productItem, quantity: 1 }];
};

const checkRemoveItems = (cartItems, productItem) => {
  const cartItemExist = cartItems.find(
    (cartItem) => (cartItem.id = productItem.id)
  );
  console.log("dmcs car exist", cartItemExist);
  if (cartItemExist.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.quantity !== cartItemExist.quantity
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const checkRemoveItemFromCheckout = (cartItems, productItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== productItem.id);
};

export const CartContexts = createContext({
  isCartOpen: Boolean,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  removeItemsFromCart: () => {},
  removeItemsFromCheckout: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalValue, cartItems) => totalValue + cartItems.quantity,
      0
    );
    setCartItemCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (totalValue, cartItems) =>
        totalValue + cartItems.quantity * cartItems.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemsToCart = (productItem) => {
    setCartItems(checkCartItems(cartItems, productItem));
  };

  const removeItemsFromCart = (productItem) => {
    setCartItems(checkRemoveItems(cartItems, productItem));
  };

  const removeItemsFromCheckout = (ProductItem) => {
    setCartItems(checkRemoveItemFromCheckout(cartItems, ProductItem));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    removeItemsFromCart,
    removeItemsFromCheckout,
    cartItems,
    cartItemCount,
    cartTotal
  };

  return (
    <CartContexts.Provider value={value}>{children}</CartContexts.Provider>
  );
};
