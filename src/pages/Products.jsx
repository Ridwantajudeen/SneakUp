import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { featuredProducts } from "../data/product";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ref, inView] = useInView({ threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    // Implement your cart state update here
  };
const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category") || "all";
  setCategoryFilter(selectedCategory.toLowerCase());
}, [location.search]);

  const filtered = featuredProducts.filter((product) => {
    const matchesCategory =
      categoryFilter === "all" || product.category.toLowerCase() === categoryFilter;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.tagline.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      String(product.price).toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#1C1C1C] py-20 px-6 md:px-16 text-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-semibold uppercase">
          All Products
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <select
          className="bg-[#2A2A2A] text-white px-4 py-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <input
          type="text"
          placeholder="Search by name, price, category..."
          className="bg-[#2A2A2A] text-white px-4 py-2 rounded w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No products match your search.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Products;
