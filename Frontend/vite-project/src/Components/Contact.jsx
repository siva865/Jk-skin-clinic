import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = () => {
    if (!formData.name || !formData.number || !formData.message) {
      alert("Please fill all fields!");
      return;
    }
    const whatsappNumber = "+917200212121";
    const text = `Name: ${formData.name}%0AContact: ${formData.number}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 py-16 bg-[#F6D3A6] mb-5">
      <motion.h2
        className="text-4xl font-serif mb-10 text-center"
        style={{ color: "#8F501B" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>

      {/* Contact Form */}
      <motion.div
        className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 border border-[#8F501B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8F501B] text-[#8F501B] text-lg"
          />
          <input
            type="tel"
            name="number"
            placeholder="Your Number"
            value={formData.number}
            onChange={handleChange}
            className="p-4 border border-[#8F501B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8F501B] text-[#8F501B] text-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="p-4 border border-[#8F501B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8F501B] resize-none text-[#8F501B] text-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#8F501B] text-white font-semibold py-4 rounded-xl text-lg hover:bg-[#7a3f17] transition-colors"
          >
            Send Message
          </button>
        </div>
      </motion.div>

      {/* Floating Phone Icon */}
      <motion.div
        className="fixed bottom-6 right-6 bg-[#8F501B] p-5 rounded-full shadow-lg cursor-pointer hover:bg-[#7a3f17] transition-all"
        onClick={() => window.open('tel:+919876543210')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6, type: 'spring' }}
      >
        <FaPhoneAlt className="text-white text-3xl" />
      </motion.div>
    </section>
  );
}
