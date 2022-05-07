import "./cart-item.styles.scss";

export const CartItems = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="item-name">{name}</span>
        <span className="cart-items-price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItems;
