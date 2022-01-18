import "./App.css";
import { ProductProvider } from "./context/ProductsContext";

//components
import Navbar from "./components/GlobalComponents/Navbar";
import HomePage from "./pages/HomePage";
import SearchProducts from "./components/GlobalComponents/searchProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedProduct from "./components/HomeComponents/FeaturedProduct";
import LaptopTypeProducts from "./pages/LaptopTypeProductsPages";
import BrandsTypeLaptopPage from "./pages/BrandsTypeLaptopPage";
import LaptopViewPage from "./pages/LaptopViewPage";

// import SamplePage from "./SamplePage";

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App  ">
          <Navbar />
          <SearchProducts />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/category/:categoryName"
              element={<LaptopTypeProducts />}
            />
            <Route path="/brand/:brand" element={<BrandsTypeLaptopPage />} />
            <Route path="/product/:productId" element={<LaptopViewPage />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
