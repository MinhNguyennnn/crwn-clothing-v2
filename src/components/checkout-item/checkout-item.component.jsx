import { useContext } from "react";
import { CartContexts } from "../contexts/cart.contexts";

import "./checkout-item.styles.scss";

export const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;

  const { removeItemsFromCheckout, addItemsToCart, removeItemsFromCart } =
    useContext(CartContexts);
  const addItemToCheckoutHandler = () => addItemsToCart(cartItem);
  const removeItemFromCheckoutHandler = () => removeItemsFromCheckout(cartItem);
  const removeItemFromCartHandler = () => removeItemsFromCart(cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity-container">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="quantity">{quantity}</span>
        <div className="arrow" onClick={addItemToCheckoutHandler}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price} </span>
      <span className="remove-button" onClick={removeItemFromCheckoutHandler}>
        &#10005;
      </span>
    </div>
  );
};
