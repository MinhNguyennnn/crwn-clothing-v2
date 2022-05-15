import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  console.log('navigate',navigate)
  const { imageUrl, title } = category;

  const navigateLinkHandler = () => navigate(`shop/${title}`);

  return (
    <div className="directory-item-container" onClick={navigateLinkHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
