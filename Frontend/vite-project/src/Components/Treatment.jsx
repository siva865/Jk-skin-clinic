import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"

const medicalTreatments = [
  { title: "Acne", details: "Acne treatment includes medical-grade peels, topical therapy, and oral medication to control oil secretion and prevent scarring." },
  { title: "Dandruff", details: "We offer scalp analysis and medicated treatments to control dandruff, reduce itching, and promote healthy hair growth." },
  { title: "Fungal Infections", details: "Advanced antifungal therapy and customized skincare routines help clear infections and prevent recurrence." },
  { title: "Hairloss", details: "PRP, GFC, and nutritional therapies are used to promote hair regrowth and strengthen follicles." },
  { title: "Eczema", details: "Treatment focuses on soothing inflammation, repairing skin barriers, and preventing flare-ups with modern therapies." },
  { title: "Psoriasis", details: "Comprehensive psoriasis care includes topical medications, phototherapy, and stress management for long-term relief." },
  { title: "Facial Pigmentations", details: "Customized chemical peels and laser treatments to reduce pigmentation and restore even skin tone." },
  { title: "Lip Disorders", details: "Specialized care for dark, dry, or allergic lip conditions using gentle exfoliation and healing formulations." },
  { title: "Nail Conditions", details: "Diagnosis and treatment of nail fungus, brittleness, and other deformities using modern dermatological tools." },
  { title: "Urticaria & Allergies", details: "Allergy testing and antihistamine therapy to manage chronic urticaria and allergic reactions effectively." },
  { title: "White Discolouration", details: "Comprehensive vitiligo management through laser therapy, phototherapy, and pigmentation restoration methods." },
  { title: "Any other disorders in Skin, Nail & Hair", details: "All dermatological issues are handled with accurate diagnosis and personalized care for lasting results." },
];

export default function MedicalTreatments() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="bg-[#0A4833] rounded-2xl p-8 mb-12 shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl md:text-3xl font-semibold text-[#FEFEFE] mb-6">
        Medical Treatments For
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {medicalTreatments.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative bg-[#FEFEFE] rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onMouseEnter={() => !isMobile && setOpenIndex(idx)}
            onMouseLeave={() => !isMobile && setOpenIndex(null)}
          >
            <h4 className="text-lg font-semibold text-[#0A4833] mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-[#0A4833]/80 mb-3">
              Expert care designed to treat {item.title.toLowerCase()}.
            </p>

            {isMobile && (
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="bg-[#0A4833] text-[#FEFEFE] px-4 py-1 text-sm rounded-lg mt-2"
              >
                {openIndex === idx ? "Hide" : "More"}
              </button>
            )}

            <AnimatePresence>
              {(openIndex === idx || (!isMobile && openIndex === idx)) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 bg-[#FEFEFE] p-3 rounded-lg text-[#0A4833]/90 text-sm border border-[#0A4833]/20"
                >
                  {item.details}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
