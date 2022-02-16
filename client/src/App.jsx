import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route exact path="/products/:category" element={<ProductList/>}/>
        <Route  path="/product/:id" element={<Product/>}/>
        <Route  path="/login"  element={user ? <Navigate to="/" /> : <Login />}/>
        <Route  path="/register" element={user ? <Navigate to="/" /> : <Register />}/>

      </Routes>
    </Router>
  );
};

export default App;