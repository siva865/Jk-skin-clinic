import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("https://jk-skin-clinic.onrender.com/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a video");
    setLoading(true);
    setUploadPercent(0);

    const formData = new FormData();
    formData.append("video", file);

    try {
      let res;
      if (editingId) {
        res = await axios.put(
          `https://jk-skin-clinic.onrender.com/api/videos/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            onUploadProgress: (event) => {
              const percent = Math.round((event.loaded * 100) / event.total);
              setUploadPercent(percent);
            },
          }
        );
      } else {
        res = await axios.post(
          "https://jk-skin-clinic.onrender.com/api/videos",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            onUploadProgress: (event) => {
              const percent = Math.round((event.loaded * 100) / event.total);
              setUploadPercent(percent);
            },
          }
        );
      }

      // Backend returns only { url: videoUrl }
      setFile(null);
      setEditingId(null);
      setUploadPercent(0);
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Video upload failed");
      setUploadPercent(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <section className="py-12 bg-[#FEFEFE]" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0A4833]">Testimonials</h2>

        {token && (
          <form onSubmit={handleUpload} className="mb-8 p-4 border border-[#0A4833] rounded flex flex-col gap-3">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-[#0A4833] rounded p-2"
            />
            <button
              type="submit"
              className="bg-[#0A4833] text-[#FEFEFE] px-4 py-2 rounded hover:opacity-90 transition-all"
              disabled={loading}
            >
              {loading ? `Uploading... ${uploadPercent}%` : editingId ? "Update Video" : "Upload Video"}
            </button>
            {/* Progress bar */}
            {loading && (
              <div className="w-full bg-gray-200 h-2.5 rounded mt-2">
                <div
                  className="bg-[#0A4833] h-2.5 rounded transition-all duration-200"
                  style={{ width: `${uploadPercent}%` }}
                ></div>
              </div>
            )}
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-[#FEFEFE] border border-[#0A4833] rounded-lg overflow-hidden shadow-md">
              <video src={video.videoUrl} controls className="w-full h-auto max-h-80 object-cover"></video>
              {token && (
                <div className="p-3 flex justify-end gap-3 border-t border-[#0A4833]/30">
                  <button onClick={() => setEditingId(video._id)} className="text-sm text-[#0A4833] hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(video._id)} className="text-sm text-[#0A4833] hover:underline">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
