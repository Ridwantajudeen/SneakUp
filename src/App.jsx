import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
// import FeaturedProducts from "./components/FeaturedProducts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              
            </>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/success" element={<Success/>} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
