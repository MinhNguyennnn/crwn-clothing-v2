import { createContext, useReducer } from "react";
import { createAction } from "../../utilities/reducer/reducer.util";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload,
        };
    default:
      throw new Error(`Unhandle type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartItemCount, cartTotal, isCartOpen } = state;

  console.log(state);
  const handleCartItemReducer = (newCartItem) => {
    const newCartCount = newCartItem.reduce(
      (totalValue, cartItems) => totalValue + cartItems.quantity,
      0
    );

    const newCartTotal = newCartItem.reduce(
      (totalValue, cartItems) =>
        totalValue + cartItems.quantity * cartItems.price,
      0
    );

    const result = {
      cartItems: newCartItem,
      cartItemCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEM, result));
  };

  const addItemsToCart = (productItem) => {
    const newCartItem = checkCartItems(cartItems, productItem);
    handleCartItemReducer(newCartItem);
  };

  const removeItemsFromCart = (productItem) => {
    const newCartItem = checkRemoveItems(cartItems, productItem);
    handleCartItemReducer(newCartItem);
  };

  const removeItemsFromCheckout = (ProductItem) => {
    const newCartItem = checkRemoveItemFromCheckout(cartItems, ProductItem);
    handleCartItemReducer(newCartItem);
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    removeItemsFromCart,
    removeItemsFromCheckout,
    cartItems,
    cartItemCount,
    cartTotal,
  };

  return (
    <CartContexts.Provider value={value}>{children}</CartContexts.Provider>
  );
};
