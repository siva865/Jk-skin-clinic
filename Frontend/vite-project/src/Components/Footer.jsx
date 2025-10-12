import React from "react";
import { FaFacebookF, FaInstagram, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A4833] text-[#FEFEFE] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Tagline */}
        <p className="text-base md:text-lg font-semibold text-center md:text-left">
          Empowering Healthy Skin with Expertise & Care
        </p>

        {/* Social Media Links */}
        <div className="flex items-center gap-6 text-2xl">
          {/* Google */}
          <a
            href="https://www.google.com/search?kgmid=%2Fg%2F11gjtwdwqd&hl=en-IN&q=JK%20SKIN%20CLINIC&shndl=30&shem=lcuae%2Cptotple&source=sh%2Fx%2Floc%2Fosrp%2Fm1%2F4&kgs=c3a6e8ba0e908423"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FEFEFE] transition-transform transform hover:scale-125"
          >
            <FaGoogle />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1Ba2h2Mpg9/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FEFEFE] transition-transform transform hover:scale-125"
          >
            <FaFacebookF />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/drmvasanthamanju?igsh=d2h3eGdnYXR5b3U5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FEFEFE] transition-transform transform hover:scale-125"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-[#FEFEFE] my-6 opacity-50"></div>

      {/* Bottom Text */}
      <div className="text-center text-sm md:text-base">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">JK Skin Clinic</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
