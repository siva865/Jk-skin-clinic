import React from "react";
import { motion } from "framer-motion";
import doctorPhoto from "../assets/Images/doctor.jpeg";

export default function About() {
  return (
    <section className="bg-[#FFF8F0] py-16 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-6 lg:flex lg:items-center lg:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Doctor Image */}
        <motion.div
          className="flex-shrink-0 mb-8 lg:mb-0 lg:w-1/3"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. VasanthaManju"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* Doctor Details */}
        <motion.div
          className="lg:w-2/3"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Doctor Name */}
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#622619] mb-4">
            Dr. VasanthaManju
          </h2>

          {/* Experience */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <button className="bg-[#F6D3A6] text-[#622619] font-semibold px-6 py-2 rounded-full shadow-md text-lg hover:bg-[#FFD8A8] transition-all duration-300">
              15+ Years of Experience
            </button>
          </motion.div>

          {/* About */}
          <motion.p
            className="text-[#622619] text-lg mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dr. VasanthaManju is a renowned dermatologist and the founder of{" "}
            <span className="font-semibold text-[#8F501B]">JK Skin Clinic</span> in Bhavani.
            She is well known for her clinical expertise, compassionate approach,
            and commitment to providing the highest quality of dermatological care.
          </motion.p>

          {/* Academic Qualification */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#8F501B] mb-2">
              Academic Qualification
            </h3>
            <p className="text-[#622619] leading-relaxed">
              She completed her MBBS at Coimbatore Medical College with laurels and went on
              to obtain her Diploma in Dermatology from the esteemed Madras Medical College.
              Her dedication and quick diagnosis have made her highly respected among peers.
            </p>
          </motion.div>

          {/* Training & Expertise */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#8F501B] mb-2">
              Training & Expertise
            </h3>
            <p className="text-[#622619] leading-relaxed">
              Trained in all kinds of aesthetic and laser procedures, she consistently updates
              her knowledge by attending national and international conferences to stay at the
              forefront of modern dermatology.
            </p>
          </motion.div>

          {/* Honours & Presentations */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#8F501B] mb-2">
              Honours & Presentations
            </h3>
            <p className="text-[#622619] leading-relaxed">
              She has been invited as a speaker for various CMEs and conferences, delivering
              talks on topics such as Diet in Dermatology, Role of Moisturisers, Urticaria
              Management, and Itch in Dermatology.
            </p>
          </motion.div>

          {/* Special Interest */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#8F501B] mb-2">
              Special Interest
            </h3>
            <p className="text-[#622619] leading-relaxed">
              PRP / GFC therapy is her special area of interest, where she has achieved
              outstanding results and patient satisfaction.
            </p>
          </motion.div>

          {/* ✅ Professional Memberships */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#8F501B] mb-3">
              Professional Memberships
            </h3>
            <ul className="list-disc ml-6 text-[#622619] leading-relaxed space-y-1">
              <li>Member of Tamilnadu Medical Council.</li>
              <li>Life member of the Indian Association of Dermatology, Venereology and Leprosy.</li>
              <li>Life member of the Indian Association of Sexually Transmitted Diseases.</li>
              <li>Life member of Cutaneous Surgeons of India.</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
