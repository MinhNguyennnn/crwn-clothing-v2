import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { userSignOut } from "../../../utilities/firebase/firebase.util";

import { UserContext } from "../../contexts/users.contexts";
import { CartContexts } from "../../contexts/cart.contexts";
import { CartIcon } from "../../cart-icon/cart-icon.component";
import { CartDropdown } from "../../cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContexts);

  const handleUserSignOut = async () => {
    await userSignOut();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/shop/hats">
            HATS
          </Link>
          <Link className="nav-link" to="/shop/jackets">
            JACKETS
          </Link>
          <Link className="nav-link" to="/shop/sneakers">
            SNEAKERS
          </Link>
          {currentUser ? (
            <span
              onClick={handleUserSignOut}
              className="nav-link"
              to="/authentication"
            >
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/authentication">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
