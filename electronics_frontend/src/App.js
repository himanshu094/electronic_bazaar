import Category from "./components/Category";
import DisplayAllCategory from "./components/DisplayAllCategory";
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route element={<Category/>} path="/category"/>
        <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>

      
      </Routes>
      </Router> 
     
      </div>
  );
}

export default App;
