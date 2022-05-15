import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocument } from "../../utilities/firebase/firebase.util";

export const CategoriesContexts = createContext({
  categories: [],
});

export const CategoriesProvider = ({ children }) => {
  // use to add data to fire store
  // import the data and pass in as a param to use
  // useEffect(()=> {
  //   addCollectionAndDocToFireBase('category', SHOP_DATA)
  // }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await getCategoriesAndDocument();
      console.log(data)
      setCategories(data)
    };
    getData();
  }, []);

  const [categories, setCategories] = useState({});
  const value = { categories };
  return (
    <CategoriesContexts.Provider value={value}>
      {children}
    </CategoriesContexts.Provider>
  );
};
