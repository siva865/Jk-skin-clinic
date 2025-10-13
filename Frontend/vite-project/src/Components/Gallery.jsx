import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  // 🟢 Cloudinary details
  const CLOUD_NAME = "dmptpis3d";
  const UPLOAD_PRESET = "Upload present";

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

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (p) => {
            const percent = Math.round((p.loaded * 100) / p.total);
            console.log(`Upload: ${percent}%`);
          },
        }
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      throw err;
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a photo first");
    setLoading(true);

    try {
      const cloudUrl = await uploadToCloudinary(file);
      const payload = { image: cloudUrl };

      if (editingId) {
        await axios.put(
          `https://jk-skin-clinic.onrender.com/api/photos/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("https://jk-skin-clinic.onrender.com/api/photos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFile(null);
      setEditingId(null);
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (photo) => setEditingId(photo._id);

  const handleDelete = async (photo) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await axios.delete(`https://jk-skin-clinic.onrender.com/api/photos/${photo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-[#FEFEFE] rounded-lg shadow-md">
      {token && (
        <div className="mb-6 flex flex-col gap-3 items-start">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-[#0A4833] rounded p-2 text-[#0A4833] w-full sm:w-1/2"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-[#0A4833] text-[#FEFEFE] px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            {loading
              ? "Uploading..."
              : editingId
              ? "Update Photo"
              : "Upload Photo"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="relative border border-[#0A4833] rounded overflow-hidden bg-[#FEFEFE]"
          >
            <img
              src={photo.image}
              alt="Gallery"
              className="w-full h-64 object-cover"
            />
            {token && (
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleEdit(photo)}
                  className="bg-[#0A4833] text-[#FEFEFE] px-2 py-1 rounded text-xs hover:opacity-90 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(photo)}
                  className="bg-[#0A4833] text-[#FEFEFE] px-2 py-1 rounded text-xs hover:bg-[#083127] transition-all"
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
