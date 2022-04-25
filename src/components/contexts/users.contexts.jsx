import { createContext, useState, useEffect } from "react";
import {
  authStateChangedListener,
  createUsetDataFromAuth,
} from "../../utilities/firebase/firebase.util";

//as actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  useEffect(() => {
    const unsubsrice = authStateChangedListener((user) => {
      if (user) {
        createUsetDataFromAuth(user);
      }
      console.log(user)
      setCurrentUser(user);
    });
    return unsubsrice;
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
