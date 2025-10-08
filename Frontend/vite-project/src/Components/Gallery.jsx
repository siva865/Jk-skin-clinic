import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Local gallery images
import img1 from "../assets/Images/gallery1.JPG";
import img2 from "../assets/Images/gallery2.JPG";
import img3 from "../assets/Images/gallery3.JPG";
import img4 from "../assets/Images/gallery4.JPG";
import img5 from "../assets/Images/gallery5.JPG";
import img6 from "../assets/Images/gallery6.JPG";
import img7 from "../assets/Images/gallery7.JPG";
import img8 from "../assets/Images/gallery8.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="gallery"
      className="w-full bg-[#FFF8F0] py-20 flex flex-col items-center"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-serif font-bold text-[#622619] mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Clinic Gallery
      </motion.h2>

      <div className="relative max-w-5xl w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-3xl shadow-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Clinic photo ${current + 1}`}
            className="w-full h-full object-cover rounded-3xl"
            initial={{ opacity: 0, scale: 1.1, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.05, x: -50 }}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96], // smooth cubic bezier easing
            }}
          />
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-[#622619] scale-110"
                  : "bg-[#F6D3A6] hover:bg-[#622619]/60"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
