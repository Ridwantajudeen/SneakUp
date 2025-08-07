import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [confirmId, setConfirmId] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleRemove = (id) => {
    setConfirmId(id);
  };

  const confirmRemove = (id) => {
    removeFromCart(id);
    setConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">
          Your cart is empty.{" "}
          <Link to="/products" className="underline text-green-400">
            Go back to shop
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm mt-1 font-semibold text-[#A1866F]">
                      Total: ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  {confirmId === item.id ? (
                    <div className="text-sm text-right">
                      <p className="text-red-400">Are you sure?</p>
                      <div className="flex gap-2 mt-1">
                        <button
                          className="text-green-400 hover:underline"
                          onClick={() => confirmRemove(item.id)}
                        >
                          Yes
                        </button>
                        <button
                          className="text-gray-400 hover:underline"
                          onClick={() => setConfirmId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-gray-700 pt-4">
            <p className="text-xl font-semibold">
              Grand Total: ${total.toFixed(2)}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded inline-block text-center">
  Proceed to Checkout
</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
