import "./App.css";
import { ProductProvider } from "./context/ProductsContext";

//components
import Navbar from "./components/GlobalComponents/Navbar";
import HomePage from "./pages/HomePage";
import SearchProducts from "./components/GlobalComponents/searchProducts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FeaturedProduct from "./components/HomeComponents/FeaturedProduct";
import LaptopTypeProducts from "./pages/LaptopTypeProductsPages";
import BrandsTypeLaptopPage from "./pages/BrandsTypeLaptopPage";
import LaptopViewPage from "./pages/LaptopViewPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthContext } from "./context/AuthContext";
import setAuthToken from "./utils/setAuthToken";
import { useContext, useEffect } from "react";
import { loadUser } from "./actions/authAction";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

// import SamplePage from "./SamplePage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser(dispatch));
    }
  }, []);

  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="App  ">
            <Navbar />
            <SearchProducts />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route
                path="/category/:categoryName"
                element={<LaptopTypeProducts />}
              />
              <Route path="/brand/:brand" element={<BrandsTypeLaptopPage />} />
              <Route path="/product/:productId" element={<LaptopViewPage />} />
              <Route
                path="/cart"
                element={
                  state.isAuthenticated === true ? (
                    <CartPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
