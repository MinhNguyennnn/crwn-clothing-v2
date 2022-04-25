import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../contexts/users.contexts";
import { userSignOut } from "../../../utilities/firebase/firebase.util";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
          <Link className="nav-link" to="/shop">
            HATS
          </Link>
          <Link className="nav-link" to="/shop">
            JACKETS
          </Link>
          <Link className="nav-link" to="/shop">
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
