import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { CategoriesContexts } from "../contexts/categories.contexts";
import ProductCard from "../product-card/product-card.component";

import "./category.styles.scss";

export const Category = () => {
  const { category } = useParams();
  console.log(category);
  const { categories } = useContext(CategoriesContexts);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};
