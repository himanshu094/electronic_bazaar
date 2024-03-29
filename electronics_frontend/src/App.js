import Category from "./components/Category";
import DisplayAllCategory from "./components/DisplayAllCategory";
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Brands from "./components/Brands";
import DisplayAllBrands from "./components/DisplayAllBrands";
import Products from "./components/Products";
import DisplayAllProducts from "./components/DisplayAllProducts";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Category/>} path="/category"/>
          <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>
          <Route element={<Brands/>} path="/brands"/>
          <Route element={<DisplayAllBrands/>} path="/displayallbrands"/>
          <Route element={<Products/>} path="/products"/>
          <Route element={<DisplayAllProducts/>} path="/displayallproducts"/>
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
