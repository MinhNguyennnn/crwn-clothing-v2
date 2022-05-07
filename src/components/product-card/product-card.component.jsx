import "./product-card.styles.scss";

import Button from "../button/button.component";

import { useContext } from "react";
import { CartContexts } from "../contexts/cart.contexts";

export const ProductCard = ({ product }) => {
  const { addItemsToCart } = useContext(CartContexts);

  const handleAddItemsToCart = () => addItemsToCart(product);

  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="product-card-footer">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}</span>
      </div>
      <Button buttonTypes="inverted" onClick={handleAddItemsToCart}>
        Add To Card
      </Button>
    </div>
  );
};

export default ProductCard;
