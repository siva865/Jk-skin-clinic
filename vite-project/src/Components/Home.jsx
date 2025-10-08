import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/Images/bg.jpeg"; // Background image

export default function Home() {
  // Scroll handler
  const handleScrollToTreatments = () => {
    const section = document.getElementById("treatments");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row justify-between items-start gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left: Clinic Name + Tagline */}
        <motion.div
          className="flex-1 text-left md:text-left"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FFD6A5]">JK Skin Clinic</span>
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Radiant Skin, <br /> Timeless Confidence
          </motion.h1>

          <motion.p
            className="text-white mb-6 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience luxury skincare treatments designed to bring out your
            natural glow. At{" "}
            <span className="font-semibold text-[#FFD6A5]">
              JK Skin Clinic
            </span>
            , science meets elegance to help you feel confident in your skin.
          </motion.p>

          <motion.button
            onClick={handleScrollToTreatments}
            className="mt-4 bg-[#FFD6A5] text-[#622619] px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            Explore Treatments
          </motion.button>
        </motion.div>

        {/* Right: Tips Section */}
        <motion.div
          className="flex-1 flex flex-col md:flex-row gap-y-6 md:gap-x-6 pb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Skin Tips */}
          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-[#622619] w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2 border-b border-[#622619]/30 pb-2">
              Skin Care Tips
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Glowing skin begins with proper hydration, balanced nutrition, and
              professional care. Cleanse daily, moisturize well, and shield your
              skin from UV damage. Let <strong>JK Skin Clinic</strong> guide you
              toward healthy, youthful skin.
            </p>
          </div>

          {/* Hair Tips */}
          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-[#622619] w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2 border-b border-[#622619]/30 pb-2">
              Hair Care Tips
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Healthy hair thrives with gentle care and nourishment. Avoid harsh
              chemicals, trim regularly, and choose products suited for your
              scalp. Our experts at <strong>JK Skin Clinic</strong> help you
              maintain lustrous, strong hair.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
