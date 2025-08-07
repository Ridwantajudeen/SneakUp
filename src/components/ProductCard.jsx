import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, totalPrice });
    setQuantity(1);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-xl hover:shadow-green-500/20 transition duration-300 flex flex-col"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>

        <div className="flex justify-between items-center">
          <span className="text-green-400 font-bold text-lg">
            ${totalPrice.toFixed(2)}
          </span>

          <div className="flex items-center bg-[#2A2A2A] rounded-lg border border-[#444]">
            <button onClick={decrease} className="px-2 py-1 text-white hover:text-green-400">
              <Minus size={16} />
            </button>
            <span className="px-3">{quantity}</span>
            <button onClick={increase} className="px-2 py-1 text-white hover:text-green-400">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
