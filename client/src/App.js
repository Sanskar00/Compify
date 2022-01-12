import "./App.css";
import { ProductProvider } from "./context/ProductsContext";

//components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchProducts from "./components/searchProducts";
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
