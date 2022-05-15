import { createContext, useEffect, useReducer } from "react";
import {
  authStateChangedListener,
  createUsetDataFromAuth,
} from "../../utilities/firebase/firebase.util";

import { createAction } from "../../utilities/reducer/reducer.util";

//as actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action.type);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandle type ${type} in userReducer`);
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  useEffect(() => {
    const unsubsrice = authStateChangedListener((user) => {
      if (user) {
        createUsetDataFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubsrice;
  }, []);

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
