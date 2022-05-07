import Button from "../button/button.component";
import CartItems from "../cart-item/cart-item.component";

import { useContext } from "react";
import { CartContexts } from "../contexts/cart.contexts";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  const navigation = useNavigate();

  const handleCheckoutClick = () => {
    navigation("/checkout");
  };

  const { cartItems } = useContext(CartContexts);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items">
        {cartItems.map((item) => (
          <CartItems key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={handleCheckoutClick}>Checkout</Button>
    </div>
  );
};
