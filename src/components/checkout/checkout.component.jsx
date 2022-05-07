import { useContext } from "react";
import { CheckoutItem } from "../checkout-item/checkout-item.component";
import { CartContexts } from "../contexts/cart.contexts";

import "./checkout.styles.scss";

export const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContexts);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="checkout-row">
          <span>Products</span>
        </div>
        <div className="checkout-row">
          <span>Description</span>
        </div>
        <div className="checkout-row">
          <span>Quantity</span>
        </div>
        <div className="checkout-row">
          <span>Price</span>
        </div>
        <div className="checkout-row">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      <div className="total">Total: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;
