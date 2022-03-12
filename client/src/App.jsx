import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return(
    <Router>
      <Routes>
        <Route exact path="/"  element={ <Home/>  } />
        <Route path="/cart" element={isLoggedIn ? <Cart/> : <Navigate to="/login" />}/>
        <Route path="/success" element={<Success/>}/>
        <Route exact path="/products/:category" element={isLoggedIn ?<ProductList/> : <Navigate to="/login" />}/>
        <Route  path="/product/:id" element={isLoggedIn ? <Product/> : <Navigate to="/login" />}/>
        <Route  path="/login"   element={ <Login log={isLoggedIn}/>}/>
        <Route  path="/register" element={ <Register />}/>
        <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;