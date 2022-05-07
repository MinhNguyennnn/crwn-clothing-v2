import Button from "../button/button.component";
import CartItems from "../cart-item/cart-item.component";

import { useContext } from "react";
import { CartContexts } from "../contexts/cart.contexts";

import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContexts);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items">
        {cartItems.map((item) => (
          <CartItems key={item.id} cartItem={item} />
        ))}
        </div>
        <Button>Checkout</Button>
    </div>
  );
};
