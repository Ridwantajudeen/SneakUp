import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 w-80 h-full bg-[#111] shadow-lg z-50 p-5 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Your Cart</h2>
        <button onClick={onClose} className="text-white hover:text-red-400">
          <X />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-white font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={clearCart}
              className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
