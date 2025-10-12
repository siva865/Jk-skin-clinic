import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-[#0A4833]">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        <Link
          to="/blogs"
          className="bg-[#0A4833] text-white p-4 rounded-lg font-medium hover:bg-white hover:text-[#0A4833] border-2 border-[#0A4833] transition-colors"
        >
          Manage Blogs
        </Link>
        <Link
          to="/announcements"
          className="bg-[#0A4833] text-white p-4 rounded-lg font-medium hover:bg-white hover:text-[#0A4833] border-2 border-[#0A4833] transition-colors"
        >
          Manage Announcements
        </Link>
        <Link
          to="/gallery"
          className="bg-[#0A4833] text-white p-4 rounded-lg font-medium hover:bg-white hover:text-[#0A4833] border-2 border-[#0A4833] transition-colors"
        >
          Manage Photos
        </Link>
        <Link
          to="/testimonials"
          className="bg-[#0A4833] text-white p-4 rounded-lg font-medium hover:bg-white hover:text-[#0A4833] border-2 border-[#0A4833] transition-colors"
        >
          Manage Testimonials
        </Link>
      </div>
    </div>
  );
}
