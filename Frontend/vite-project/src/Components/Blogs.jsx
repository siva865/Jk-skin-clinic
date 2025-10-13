import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const token = localStorage.getItem("token"); // admin login check

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jk-skin-clinic.onrender.com/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // Add blog (admin only)
  const handleAddBlog = async () => {
    if (!title.trim() || !content.trim()) return alert("Enter title & content");
    try {
      setLoading(true);
      await axios.post("https://jk-skin-clinic.onrender.com/api/blogs", { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(""); setContent(""); fetchBlogs();
    } catch (err) { console.error(err); alert("Failed to add blog"); }
    finally { setLoading(false); }
  };

  // Delete blog (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) { console.error(err); alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-[#0A4833] py-10 px-4 sm:px-6 md:px-12 lg:px-20 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center"
      >
        📝 JK SkinClinic Blogs
      </motion.h1>

      {/* Admin Add Blog */}
      {token && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 bg-white text-[#0A4833] shadow-lg rounded-2xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
            ✍️ Add New Blog
          </h2>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-[#0A4833] rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#0A4833] text-[#0A4833] text-base sm:text-lg"
          />
          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full p-3 border border-[#0A4833] rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#0A4833] text-[#0A4833] text-base sm:text-lg"
          />
          <button
            onClick={handleAddBlog}
            disabled={loading}
            className="w-full bg-[#0A4833] text-white py-3 rounded-lg hover:bg-[#074027] transition-all duration-300 disabled:opacity-50 text-base sm:text-lg font-medium"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </motion.div>
      )}

      {/* Blog List */}
      {loading ? (
        <p className="text-center animate-pulse text-white text-lg">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-white text-lg">No blogs available.</p>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {blogs.map((b) => {
              const isExpanded = expandedId === b._id;
              return (
                <motion.div
                  key={b._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white text-[#0A4833] rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 transition-all duration-300 flex flex-col"
                >
                  <h3
                    className="text-lg sm:text-xl font-semibold cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : b._id)}
                  >
                    {b.title}
                  </h3>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-[#0A4833] text-sm sm:text-base whitespace-pre-line"
                    >
                      {b.content}
                      {token && (
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleDelete(b._id)}
                            className="bg-[#0A4833] text-white px-3 py-1 rounded hover:bg-[#074027] text-sm sm:text-base"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
