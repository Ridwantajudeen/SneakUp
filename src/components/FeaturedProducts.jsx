import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { featuredProducts } from "../data/product";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeaturedProducts = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (cat) => setCategoryFilter(cat);

  const filteredProducts = featuredProducts.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.tagline.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.price.toString().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const categories = ["All", "Men", "Women", "Unisex"];

  return (
    <section ref={ref} className="bg-[#1C1C1C] py-20 px-6 md:px-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-semibold uppercase">
          Featured Drops
        </h2>
        <p className="mt-4 text-[#A1866F]">
          Handpicked styles curated for impact and comfort.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm transition ${
                categoryFilter === cat
                  ? "bg-[#A1866F] text-white"
                  : "bg-[#333] text-gray-300 hover:bg-[#444]"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by name, tagline, category, or price..."
          className="bg-[#2A2A2A] text-white px-4 py-2 rounded-md w-full md:w-72 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No matching products found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
