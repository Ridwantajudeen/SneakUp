import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); 
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-[#1C1C1C] text-[#F4F1EE] w-full fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <h1 className="text-2xl font-bold tracking-wide font-sans uppercase">
          SneakUp
        </h1>

      
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-[#A1866F] transition-all">Home</Link>
          <Link to="/products" className="hover:text-[#A1866F] transition-all">Products</Link>
          <Link to="/contact" className="hover:text-[#A1866F] transition-all">Contact</Link>

          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-[#6B4F3B] text-white rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

      
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-[#1C1C1C] text-[#F4F1EE] px-6 py-4 space-y-4">
          <Link to="/" className="block hover:text-[#A1866F]">Home</Link>
          <Link to="/products" className="block hover:text-[#A1866F]">Products</Link>
          <Link to="/contact" className="block hover:text-[#A1866F]">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
