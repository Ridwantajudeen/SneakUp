import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black mt-12 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
        
        
        <div>
          <h2 className="text-2xl font-bold tracking-wider text-green-400">SneakUp</h2>
          <p className="mt-4 text-gray-400">
            Where style meets motion. Discover premium sneakers for every step.
          </p>
        </div>

     
        <div>
          <h3 className="text-green-400 font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link
          to="/products?category=all"  className="hover:text-white transition">All Sneakers</Link></li>
            <li><Link
          to="/products?category=men" className="hover:text-white transition">Men</Link></li>
            <li><Link
          to="/products?category=women" className="hover:text-white transition">Women</Link></li>
            <li><a href="/" className="hover:text-white transition">New Arrivals</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-green-400 font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
            <li><a href="/returns" className="hover:text-white transition">Returns</a></li>
            <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-green-400 font-semibold mb-4">Stay in the Loop</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-4 py-2 rounded font-semibold hover:bg-green-300 transition"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 mt-6 text-gray-400">
            <a href="#" aria-label="Instagram" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com/Ritajtimi" aria-label="Twitter" className="hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} SneakUp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
