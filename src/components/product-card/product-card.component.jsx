import "./product-card.styles.scss";

import Button from "../button/button.component";

export const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="product-card-footer">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}</span>
      </div>
      <Button buttonTypes="inverted">Add To Card</Button>
    </div>
  );
};

export default ProductCard;
