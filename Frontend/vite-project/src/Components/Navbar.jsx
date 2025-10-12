import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Images/logo.jpeg"; // make sure your logo path is correct

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // admin login check

  const links = token
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/blogs", label: "Blogs" },
        { to: "/announcements", label: "Announcements" },
        { to: "/gallery", label: "Gallery" },
        { to: "/testimonials", label: "Testimonials" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/treatments", label: "Treatments" },
        { to: "/blogs", label: "Blogs" },
        { to: "/testimonials", label: "Testimonials" },
        { to: "/gallery", label: "Gallery" },
        { to: "/contact", label: "Contact" },
      ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        {/* Logo */}
        <Link to={token ? "/dashboard" : "/"} className="flex   gap-3">
          <img src={logo} alt="Logo" className="w-15 h-12 object-contain " />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-lg font-medium transition-colors duration-300 text-[#0A4833] hover:text-[#F6D3A6]`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className="ml-4 bg-white text-[#0A4833] px-4 py-2 rounded transition-all duration-300 hover:bg-[#F6D3A6]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-4 bg-white text-[#0A4833] px-4 py-2 rounded transition-all duration-300 hover:bg-[#F6D3A6]"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="open menu"
        >
          <HiMenu size={28} className="text-[#0A4833]" />
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
              className="bg-white w-72 sm:w-80 h-full p-8 flex flex-col relative"
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
                <IoClose size={26} className="text-[#0A4833]" />
              </button>
              <ul className="flex flex-col gap-6 mt-12">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={link.to}
                      className={({ isActive }) =>
                        `text-2xl font-semibold transition-colors duration-300 text-[#0A4833] hover:text-[#F6D3A6]`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                {!token ? (
                  <li>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setOpen(false);
                      }}
                      className="text-2xl font-semibold bg-white text-[#0A4833] px-4 py-2 rounded hover:bg-[#F6D3A6]"
                    >
                      Login
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="text-2xl font-semibold bg-white text-[#0A4833] px-4 py-2 rounded hover:bg-[#F6D3A6]"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
