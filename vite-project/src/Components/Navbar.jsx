import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/treatments", label: "Treatments" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
         
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-lg font-medium transition-colors duration-300 text-[#622619] hover:text-[#F6D3A6]`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-[#F6D3A6] transition-all duration-300 ${
                      isActive ? "w-full" : "group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="open menu"
        >
          <HiMenu size={28} className="text-[#622619]" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex justify-start lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-72 h-full p-8 flex flex-col relative"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6"
                aria-label="close menu"
              >
                <IoClose size={26} className="text-[#622619]" />
              </button>
              <ul className="flex flex-col gap-6 mt-12">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={link.to}
                      className={({ isActive }) =>
                        `text-2xl font-semibold transition-colors duration-300 text-[#622619] hover:text-[#F6D3A6] relative`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          <span
                            className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-[#F6D3A6] transition-all duration-300 ${
                              isActive ? "w-full" : "group-hover:w-full"
                            }`}
                          ></span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
