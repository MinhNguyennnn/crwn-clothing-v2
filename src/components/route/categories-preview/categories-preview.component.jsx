import { useContext } from "react";
import { CategoryPreview } from "../../category-preview/category-preview.component";
import { CategoriesContexts } from "../../contexts/categories.contexts";

export const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContexts);

  return (
    <div className="categories-preview-container">
      {Object.keys(categories).map((title) => {
        const products = categories[title]
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    </div>
  );
};

export default CategoriesPreview;
