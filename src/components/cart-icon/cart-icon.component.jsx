import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

import { useContext } from "react";
import { CartContexts } from "../contexts/cart.contexts";

export const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartItemCount} = useContext(CartContexts);

  const handleToggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={handleToggleCart}>
      <ShoppingBagIcon />
      <span className="cart-item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;