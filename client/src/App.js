import "./App.css";
import Carousel from "./components/Carousel";

//components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
