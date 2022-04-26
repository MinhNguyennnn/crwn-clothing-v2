import { useContext } from "react";
import { ProductsContexts } from "../../contexts/products.contexts";

import ProductCard from "../../product-card/product-card.component";
import './shop.styles.scss';

export const Shop = () => {
  const { products } = useContext(ProductsContexts);
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
