import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sneaker1 from "../assets/sneaker1.png";
import sneaker5 from "../assets/sneaker5.png";
import sneaker6 from "../assets/sneaker6.png";
import FeaturedProducts from "./FeaturedProducts";
import HomeHighlights from "./HomeHighlights";


const sneakers = [sneaker1, sneaker5, sneaker6];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sneakers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
   <div>
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-4 md:gap-0 px-6 md:px-16 py-10 md:py-0 bg-[#1C1C1C]">
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-semibold uppercase leading-tight tracking-wide text-white">
          Step Into Style
        </h1>
        <p className="text-[#A1866F] mt-4 md:text-lg">
          Premium sneakers for everyday kings and Queens. Walk bold, live bold.
        </p>
        <button className="mt-6 bg-[#6B4F3B] text-[#F4F1EE] py-3 px-8 rounded-full hover:bg-[#A1866F] transition-all duration-300">
          Shop Now
        </button>
      </div>

      {/* Sneaker Image Slider */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={sneakers[current]}
            alt="Sneaker"
            className="w-[220px] md:w-[420px] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 50, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -50, rotate: -5 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </section>
    <HomeHighlights/>
    </div>
  );
};

export default Hero;
