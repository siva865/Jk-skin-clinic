import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Image Imports ----------
import img1 from "../assets/Images/one.jpeg";
import img2 from "../assets/Images/two.jpeg";
import img3 from "../assets/Images/three.jpeg";
import img4 from "../assets/Images/four.jpeg";
import img5 from "../assets/Images/five.jpeg";
import img6 from "../assets/Images/six.jpeg";
import img7 from "../assets/Images/seven.jpeg";
import img8 from "../assets/Images/eight.jpeg";
import img9 from "../assets/Images/nine.jpeg";
import img10 from "../assets/Images/ten.jpeg";
import img11 from "../assets/Images/leven.jpeg";
import img12 from "../assets/Images/twel.jpeg";
import img13 from "../assets/Images/thirteen.jpeg";
import img14 from "../assets/Images/fourteen.jpeg";
import img15 from "../assets/Images/fifteen.jpeg";

const aestheticProcedures = [
  { title: "Chemical Peeling", details: "Removes dead skin layers to reveal fresh, glowing skin while reducing pigmentation and acne marks.", image: img1 },
  { title: "HiFrecatator Removal of Moles & Warts", details: "Safe and effective mole, wart, and skin tag removal using advanced high-frequency cautery technology.", image: img2 },
  { title: "Laser Hair Reduction", details: "Permanent hair reduction with pain-free diode laser technology suitable for all skin types.", image: img3 },
  { title: "Microdermabrasion", details: "Exfoliates dead cells, smoothens texture, and rejuvenates dull skin for a youthful glow.", image: img4 },
  { title: "Laser Resurfacing", details: "Reduces scars, wrinkles, and uneven texture using precision laser skin resurfacing.", image: img5 },
  { title: "Tattoo Removal", details: "Advanced Q-switched laser removes unwanted tattoos safely and effectively over few sessions.", image: img6 },
  { title: "Acne Scar Revision", details: "Combination of laser and microneedling treatments to smoothen acne scars and refine skin texture.", image: img7 },
  { title: "Scar Treatments", details: "Targeted scar reduction treatments to flatten, fade, and smooth scars caused by injury or surgery.", image: img8 },
  { title: "Laser Treatment for Vitiligo", details: "Excimer laser therapy stimulates melanocytes for repigmentation in vitiligo patches.", image: img9 },
  { title: "PRP / GFC & Exosome Therapy", details: "Platelet-rich plasma and GFC stimulate collagen and hair growth naturally for radiant skin and thicker hair.", image: img10 },
  { title: "Collagen Augmentation Therapy", details: "Non-surgical treatment that restores skin elasticity and firmness through collagen boosters.", image: img11 },
  { title: "Skin Tightening & Stretch Mark Reduction", details: "Radiofrequency and laser technologies tighten skin and reduce post-pregnancy stretch marks.", image: img12 },
  { title: "Torn Ear Lobe Repair", details: "Quick, safe cosmetic suturing procedure to correct torn or split earlobes.", image: img13 },
  { title: "Cryotherapy", details: "Freezing treatment used for removal of warts, skin tags, and other benign lesions.", image: img14 },
  { title: "Medi Facial & Carbon Peel", details: "Deep-cleansing facials and carbon peels for instant brightness, glow, and rejuvenation.", image: img15 },
];

export default function AestheticProcedures() {
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
      className="bg-[#0A4833] rounded-2xl p-8 shadow-lg" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl md:text-2xl font-semibold text-[#FEFEFE] mb-6">
         Procedures at JK Skin Clinic
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {aestheticProcedures.map((procedure, idx) => (
          <motion.div
            key={idx}
            className="relative bg-[#FEFEFE] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onMouseEnter={() => !isMobile && setOpenIndex(idx)}
            onMouseLeave={() => !isMobile && setOpenIndex(null)}
          >
            <div className="w-full h-64 md:h-72 overflow-hidden">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h4 className="text-lg font-semibold text-[#0A4833] mb-2">
                {procedure.title}
              </h4>
              <p className="text-sm text-[#0A4833]/80 mb-3">
                Enhance your beauty with {procedure.title.toLowerCase()}.
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
                    {procedure.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
