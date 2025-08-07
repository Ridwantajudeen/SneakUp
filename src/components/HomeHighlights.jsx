import { featuredProducts } from "../data/product";
import { Link } from "react-router-dom";

export default function HomeHighlights() {
  const homeHighlights = featuredProducts.filter(product => product.showOnHome);

  return (
    <section className="bg-[#1C1C1C] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Just Dropped</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {homeHighlights.map(product => (
            <div key={product.id} className="bg-[#2A2A2A] p-4 rounded-xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-1">{product.tagline}</p>
              <p className="text-white font-bold">{"$" + product.price}</p>
            </div>
          ))}
        </div>
      </div>
       <div className="mt-10 text-center">
        <Link
          to="/products"
          className="inline-block bg-[#A1866F] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#c2a586] transition"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
