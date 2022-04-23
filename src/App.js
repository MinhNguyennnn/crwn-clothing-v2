import { Route, Routes } from "react-router-dom";

import Home from "./components/route/home/home.component";
import Navigation from "./components/route/navigation/navigation.component";
import SignIn from "./components/route/signin/signin.component";

const Shop = () => {
  return (
    <div>
      <h2>Shop Page</h2>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
