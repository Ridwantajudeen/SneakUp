import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
    } else {
      // Clear the cart
      localStorage.removeItem("cartItems");

    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-black text-white p-6"
    >
      <div className="max-w-xl w-full text-center bg-[#111] p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-green-400">✅ Order Successful!</h1>
        <p className="mb-2 text-lg">Thanks for shopping with SneakUp, <strong>{order.name}</strong>.</p>
        <p className="mb-4 text-sm text-gray-400">🧾 <strong>Order ID:</strong> {order.orderId}</p>
        <p className="mb-6 text-sm text-gray-400">📦 Shipping to: {order.address}</p>

        <div className="text-left border-t border-gray-700 pt-4 mt-4">
          <h2 className="font-semibold text-lg mb-2">🛍️ Order Summary</h2>
          <ul className="text-sm space-y-1">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.title} — {item.quantity} × ₦{item.price.toLocaleString()}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-lg text-green-400">
            Total: ₦{order.total.toLocaleString()}
          </p>
        </div>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition"
        >
          🏠 Return to Shop
        </Link>
      </div>
    </motion.div>
  );
}
