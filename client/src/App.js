import "./App.css";
import { ProductProvider } from "./context/ProductsContext";

//components
import Navbar from "./components/GlobalComponents/Navbar";
import HomePage from "./pages/HomePage";
import SearchProducts from "./components/GlobalComponents/searchProducts";
import { Route } from "react-router";

// import SamplePage from "./SamplePage";

function App() {
  return (
    <ProductProvider>
      <div className="App ">
        <Navbar />
        <SearchProducts />
        <HomePage />
      </div>
    </ProductProvider>
  );
}

export default App;
