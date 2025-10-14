import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  // ✅ Read token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Fetch all photos when component loads
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("https://jk-skin-clinic.onrender.com/api/photos");
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  // ✅ Handle Upload
  const handleUpload = async () => {
    if (!token) {
      alert("You must be logged in to upload photos!");
      return;
    }

    if (!file) {
      alert("Please select an image first!");
      return;
    }

    // ✅ Restrict file size to max 50MB
    const maxSize = 50 * 1024 * 1024; // 50 MB
    if (file.size > maxSize) {
      alert("File too large! Please upload an image under 50MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // must match backend field name

    try {
      setLoading(true);
      const res = await axios.post("https://jk-skin-clinic.onrender.com/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (p) =>
          setUploadPercent(Math.round((p.loaded * 100) / p.total)),
      });

      // ✅ Add new photo to state
      setPhotos((prev) => [res.data, ...prev]);
      setFile(null);
      setUploadPercent(0);
      setLoading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed! Please check your login or file size.");
      setLoading(false);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete photos!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/photos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting photo:", err);
      alert("Delete failed! Please check your login.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#064e3b] py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">📸 JK Skin Clinic Gallery</h1>

        {/* ✅ Show upload section only if logged in */}
        {token ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-[#064e3b] rounded-lg p-2 w-full sm:w-auto text-[#064e3b]"
            />
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-[#064e3b] text-white px-5 py-2 rounded-lg hover:bg-[#043b2d] transition"
            >
              {loading ? `Uploading ${uploadPercent}%` : "Upload Photo"}
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            🔒 Please log in to upload or delete photos.
          </p>
        )}
      </div>

      {/* ✅ Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo._id}
              className="relative bg-white border-2 border-[#064e3b] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={photo.image}
                alt="Uploaded"
                className="w-full h-80 object-cover"
              />

              {/* ✅ Delete button visible only for logged-in users */}
              {token && (
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="absolute top-2 right-2 bg-[#064e3b] text-white rounded-full px-3 py-1 text-sm hover:bg-[#043b2d] transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No photos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
