import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Testimonials from "./Components/Testimonials";
// Existing pages
import Home from "./Components/Home";
import About from "./Components/About";
import Treatments from "./Components/Treatment";
import Gallery from "./Components/Gallery";
import Contact from "./Components/Contact";

// Admin pages
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboared";
import Blogs from "./Components/Blogs";
import Announcements from "./Components/Announcements";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
