import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const token = localStorage.getItem("token"); // optional auth

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("https://jk-skin-clinic.onrender.com/api/photos");
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch photos");
    }
  };

  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    const res = await axios.post(
      "https://jk-skin-clinic.onrender.com/api/photo",
      formData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          setUploadPercent(Math.round((e.loaded * 100) / e.total));
        },
      }
    );

    return res.data.url; // Cloudinary URL
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a photo first");

    setLoading(true);
    setUploadPercent(0);

    try {
      const cloudUrl = await uploadToBackend(file);

      // Save Cloudinary URL to backend
      await axios.post(
        "https://jk-skin-clinic.onrender.com/api/photos",
        { image: cloudUrl },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setFile(null);
      setUploadPercent(0);
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-[#FEFEFE] rounded-lg shadow-md">
      {token && (
        <div className="mb-6 flex gap-3 items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-[#0A4833] rounded p-2 text-[#0A4833]"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-[#0A4833] text-[#FEFEFE] px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            {loading ? `Uploading... ${uploadPercent}%` : "Upload Photo"}
          </button>
        </div>
      )}

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-[#0A4833] h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${uploadPercent}%` }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="border border-[#0A4833] rounded overflow-hidden bg-[#FEFEFE]"
          >
            <img
              src={photo.image}
              alt="Gallery"
              className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-[#0A4833] mt-8 text-lg font-medium">
          No photos available.
        </p>
      )}
    </div>
  );
}
