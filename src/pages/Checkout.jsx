import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFormComplete = form.name && form.email && form.address && total > 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: form.email,
    amount: Math.round(total * 100),
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata: {
      name: form.name,
      address: form.address,
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePay = () => {
    initializePayment(
      async () => {
        try {
          const orderData = {
            name: form.name,
            email: form.email,
            address: form.address,
            cart,
            total,
            reference: config.reference,
            createdAt: serverTimestamp(),
          };

          // Save order to Firestore
          await addDoc(collection(db, "orders"), orderData);

          // Save to localStorage in case success page reloads
          localStorage.setItem("lastOrder", JSON.stringify(orderData));

          // Clear the cart
          clearCart();
          setOrderPlaced(true);

          // Navigate to success page with order data
          navigate("/success", { state: { order: orderData } });
        } catch (error) {
          console.error("❌ Firestore error:", error);
        }
      },
      () => alert("Payment cancelled")
    );
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="underline text-green-400">
            Go back to shop
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
      >
        <div>
          <label className="block mb-1 text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            required
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          ></textarea>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="text-gray-300">
                {item.quantity} × {item.name} = ${item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-white">
            Total: ${total.toFixed(2)}
          </p>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full px-4 py-2 rounded font-semibold ${
              isFormComplete
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 text-white opacity-50 cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
