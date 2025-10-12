import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementPopup({ text, show, onClose }) {
  return (
    <AnimatePresence>
      {show && text && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white text-[#0A4833] px-6 py-4 rounded-2xl shadow-lg z-50 flex items-center justify-between w-[90%] md:w-[50%]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <p className="font-semibold text-sm md:text-base">{text}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#0A4833] font-bold text-xl ml-4"
          >
            ✖
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
