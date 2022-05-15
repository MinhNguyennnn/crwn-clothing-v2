import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/contexts/users.contexts";
import { CategoriesProvider } from "./components/contexts/categories.contexts";
import { CartProvider } from "./components/contexts/cart.contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <CategoriesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CategoriesProvider>
    </UserContextProvider>
  </BrowserRouter>
);
reportWebVitals();
