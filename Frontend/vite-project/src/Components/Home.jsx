import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnnouncementPopup from "./AnnouncementPopup";

export default function Home() {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await axios.get(
          "https://jk-skin-clinic.onrender.com/api/announcements"
        );
        if (res.data && res.data.length > 0) {
          const latest = res.data[res.data.length - 1];
          setAnnouncement(latest.content);
          setShowPopup(true);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncement();
  }, []);

  const handleCallNow = () => {
    window.location.href = "tel:+917200212121";
  };

  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative"
      style={{
        // ✅ Use public folder path for deploy-safe background
        backgroundImage: `url(/bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Announcement Popup */}
      <AnnouncementPopup
        text={announcement}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <motion.div
        className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row justify-between items-start gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left: Heading and Intro */}
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
            <span className="text-white font-semibold">JK Skin Clinic</span>
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
            <span className="font-semibold text-white">JK Skin Clinic</span>,
            science meets elegance to help you feel confident in your skin.
          </motion.p>

          <motion.button
            onClick={handleCallNow}
            className="mt-4 bg-white text-[#0A4833] px-6 py-3 rounded-full font-semibold hover:bg-[#0A4833] hover:text-white transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            📞 Book Now
          </motion.button>
        </motion.div>

        {/* Right: Why Choose Us & Core Values */}
        <motion.div
          className="flex-1 flex flex-col md:flex-row gap-y-6 md:gap-x-6 pb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Why Choose Us */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-[#0A4833] w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 border-b border-[#0A4833]/30 pb-2">
              Why Choose Us
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed">
              <li>
                🌿 <strong>Experienced Specialists:</strong> Our dermatologists
                deliver safe, effective, and tailored treatments.
              </li>
              <li>
                💎 <strong>Advanced Technology:</strong> We use the latest
                machines and science-backed techniques.
              </li>
              <li>
                🕊️ <strong>Trusted Care:</strong> A clinic where expertise meets
                compassion for lasting results.
              </li>
            </ul>
          </div>

          {/* Our Core Values */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-[#0A4833] w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 border-b border-[#0A4833]/30 pb-2">
              Our Core Values
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed">
              <li>
                💖 <strong>Integrity:</strong> We believe in transparent care
                and honest guidance.
              </li>
              <li>
                ✨ <strong>Excellence:</strong> Delivering the highest standard
                of clinical and aesthetic expertise.
              </li>
              <li>
                🤝 <strong>Compassion:</strong> Every treatment begins with
                empathy and trust.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
