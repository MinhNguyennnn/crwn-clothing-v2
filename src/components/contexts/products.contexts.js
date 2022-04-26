import { createContext, useState } from "react";
import PRODUCTS_DATA from "../../assets/shop-data.json";

export const ProductsContexts = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const value = { products };
  return (
    <ProductsContexts.Provider value={value}>
      {children}
    </ProductsContexts.Provider>
  );
};
