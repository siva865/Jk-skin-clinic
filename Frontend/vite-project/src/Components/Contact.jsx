import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-cover bg-center bg-no-repeat"
      style={{ 
        // ✅ Use public folder path for deploy-safe background
        backgroundImage: `url(/clinic-bg.JPG)` 
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 bg-[#FEFEFE]/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A4833] mb-6">
          JK Skin Clinic
        </h2>

        <p className="text-[#0A4833] text-lg mb-2">
          Mettur Main Road, Near State Bank of India
        </p>
        <p className="text-[#0A4833] text-lg mb-2">Bhavani, Erode District</p>
        <p className="text-[#0A4833] text-lg mb-4">
          Tamil Nadu – 638301
        </p>

        <p className="text-[#0A4833] text-lg font-semibold">
          📞 Ph: <a href="tel:+917200212121" className="underline">+91 72002 12121</a>
        </p>

        <div className="mt-8 w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border-4 border-[#0A4833]/30">
          <iframe
            title="JK Skin Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.639744824012!2d77.67966067504177!3d11.445334247220094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4f7c6b6df9%3A0x7a5c0ec44c5b7f4a!2sJK%20Skin%20Clinic!5e0!3m2!1sen!2sin!4v1728732086715!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
