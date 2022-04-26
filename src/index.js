import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/contexts/users.contexts";
import { ProductsProvider } from "./components/contexts/products.contexts";
import { CartProvider } from "./components/contexts/cart.contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </UserContextProvider>
  </BrowserRouter>
);
reportWebVitals();
