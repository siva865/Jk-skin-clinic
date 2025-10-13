import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jk-skin-clinic.onrender.com/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add new announcement
  const handleAdd = async () => {
    if (!text.trim()) return alert("Please enter announcement text");

    try {
      setLoading(true);
      await axios.post("https://jk-skin-clinic.onrender.com/api/announcements", {
        content: text,
      });
      setText("");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Failed to add announcement");
    } finally {
      setLoading(false);
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;

    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#0A4833] text-white">
      <h1 className="text-3xl font-bold mb-6">📢 Manage Announcements</h1>

      {/* Add Announcement Form */}
      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Announcement Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-3 rounded-lg border border-white bg-[#0A4833] text-white focus:outline-none focus:ring-2 focus:ring-white flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-white text-[#0A4833] p-3 rounded-lg hover:bg-[#e6e6e6] disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </div>

      {/* Display Announcements */}
      {loading ? (
        <p>Loading announcements...</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {announcements.length > 0 ? (
            announcements.map((a) => (
              <li
                key={a._id}
                className="p-4 border border-white rounded-lg flex justify-between items-center bg-[#0A4833]"
              >
                <span>{a.content}</span>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="bg-white text-[#0A4833] px-3 py-1 rounded-lg hover:bg-[#e6e6e6] transition-colors"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No announcements yet.</p>
          )}
        </ul>
      )}
    </div>
  );
}
