import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  // ✅ Fetch all photos from backend
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
    if (!file) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", file); // must match backend field name

    try {
      setLoading(true);
      const res = await axios.post("https://jk-skin-clinic.onrender.com/api/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) =>
          setUploadPercent(Math.round((p.loaded * 100) / p.total)),
      });

      setPhotos((prev) => [res.data, ...prev]);
      setFile(null);
      setUploadPercent(0);
      setLoading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false);
    }
  };

  // ✅ Delete Photo
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/photos/${id}`);
      setPhotos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">📸 JK Skin Clinic Gallery</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded p-2 w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? `Uploading ${uploadPercent}%` : "Upload Photo"}
          </button>
        </div>
      </div>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo._id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={photo.image}
                alt="Uploaded"
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => handleDelete(photo._id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 py-1 text-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
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
