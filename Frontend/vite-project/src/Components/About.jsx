import React from "react";
import { motion } from "framer-motion";
import doctorPhoto from "../assets/Images/doctor.jpeg";

export default function About() {
  return (
    <section className="bg-[#FEFEFE] py-16 overflow-hidden">
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
            alt="Dr. Vasantha Manju"
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
          <h2
            className="font-serif font-bold text-[#0A4833] mb-4 bg-[#FEFEFE] px-4 py-2 rounded-lg 
                       shadow-sm inline-block whitespace-nowrap max-w-full overflow-hidden text-center"
            style={{ fontSize: "clamp(1.3rem, 4vw, 2.2rem)" }}
          >
            Dr.&nbsp;
            <span className="text-[#0A4833] underline decoration-2">
              Vasantha&nbsp;Manju
            </span>
          </h2>

          {/* Experience */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <button className="bg-[#0A4833] text-[#FEFEFE] font-semibold px-6 py-2 rounded-full shadow-md text-lg hover:opacity-90 transition-all duration-300">
              15+ Years of Experience
            </button>
          </motion.div>

          {/* About */}
          <motion.p
            className="text-[#0A4833] text-lg mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-semibold text-[#0A4833]">Dr. Vasantha Manju</span> is a
            renowned dermatologist and the founder of{" "}
            <span className="font-semibold text-[#0A4833]">JK Skin Clinic</span> in Bhavani.
            She is well known for her clinical expertise, compassionate approach, and
            commitment to providing the highest quality of dermatological care.
          </motion.p>

          {/* Academic Qualification */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#0A4833] mb-2">
              Academic Qualification
            </h3>
            <p className="text-[#0A4833] leading-relaxed">
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
            <h3 className="text-2xl font-semibold text-[#0A4833] mb-2">
              Training & Expertise
            </h3>
            <p className="text-[#0A4833] leading-relaxed">
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
            <h3 className="text-2xl font-semibold text-[#0A4833] mb-3">
              Honours & Presentations
            </h3>
            <p className="text-[#0A4833] mb-3 leading-relaxed">
              She has been invited to various CMEs as a speaker to address the crowd on topics like:
            </p>
            <ul className="list-decimal ml-6 text-[#0A4833] leading-relaxed space-y-1">
              <li>Diet in Dermatology</li>
              <li>Role of Moisturisers</li>
              <li>Urticaria Management</li>
              <li>Itch in Dermatology</li>
              <li>Atopy Management</li>
            </ul>
          </motion.div>

          {/* Special Interest */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#0A4833] mb-2">
              Special Interest
            </h3>
            <p className="text-[#0A4833] leading-relaxed">
              PRP / GFC therapy is her special area of interest, where she has achieved
              outstanding results and patient satisfaction.
            </p>
          </motion.div>

          {/* Professional Memberships */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#0A4833] mb-3">
              Professional Memberships
            </h3>
            <ul className="list-disc ml-6 text-[#0A4833] leading-relaxed space-y-1">
              <li>Member of Tamilnadu Medical Council.</li>
              <li>
                Life member of the Indian Association of Dermatology, Venereology and
                Leprosy.
              </li>
              <li>
                Life member of the Indian Association of Sexually Transmitted Diseases.
              </li>
              <li>Life member of Cutaneous Surgeons of India.</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
