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
import ProfilePage from "./pages/ProfilePage";
import Address from "./pages/Address";
import AddAddress from "./pages/AddAddress";
import { PersonalInfoProvider } from "./context/PersonalContext";
import CardPage from "./pages/CardPage";
import OrderPage from "./pages/OrderPage";
import { OrderProvider } from "./context/OrderContext";
import BuyPage from "./pages/GetAddress";
import GetAddress from "./pages/GetAddress";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Alert from "./components/GlobalComponents/Alert";
import { AlertContext, AlertProvider } from "./context/AlertContext";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/PaymentUtils";
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
    <Elements stripe={stripePromise}>
      <AlertProvider>
        <ProductProvider>
          <PersonalInfoProvider>
            <OrderProvider>
              <CartProvider>
                <Router>
                  <div className="App ">
                    <Navbar />
                    <Alert />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signUp" element={<SignUpPage />} />
                      <Route
                        path="/category/:categoryName"
                        element={<LaptopTypeProducts />}
                      />
                      <Route
                        path="/brand/:brand"
                        element={<BrandsTypeLaptopPage />}
                      />
                      <Route
                        path="/product/:productId"
                        element={<LaptopViewPage />}
                      />
                      <Route path="/profile" element={<ProfilePage />}>
                        <Route path="address" element={<Address />} />
                        <Route path="card" element={<CardPage />} />
                        <Route path="order" element={<OrderPage />} />
                      </Route>
                      <Route path="/address" element={<Address />} />
                      <Route path="/card" element={<CardPage />} />

                      <Route
                        path="/address/addAddress"
                        element={<AddAddress />}
                      />
                      <Route path="/buyProduct" element={<GetAddress />} />
                      <Route path="/payment" element={<PaymentPage />} />
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
            </OrderProvider>
          </PersonalInfoProvider>
        </ProductProvider>
      </AlertProvider>
    </Elements>
  );
}

export default App;
