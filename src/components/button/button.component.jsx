import "./button.styles.scss";

const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonTypes, ...otherProps }) => {
  return (
    <button
      className={`${BUTTON_TYPES_CLASSES[buttonTypes]} button-container`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
