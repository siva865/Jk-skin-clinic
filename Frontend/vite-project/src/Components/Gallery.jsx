import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

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

  // Upload file to Cloudinary via backend
  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("photo", file); // must match backend

    const res = await axios.post(
      "https://jk-skin-clinic.onrender.com/api/upload-photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      let cloudUrl = editingId ? null : await uploadToBackend(file);

      // If editing and new file selected, upload it
      if (editingId && file) cloudUrl = await uploadToBackend(file);

      const payload = { image: cloudUrl, title };

      if (editingId) {
        await axios.put(
          `https://jk-skin-clinic.onrender.com/api/photos/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "https://jk-skin-clinic.onrender.com/api/photos",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setFile(null);
      setTitle("");
      setEditingId(null);
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      setUploadPercent(0);
    }
  };

  const handleEdit = (photo) => {
    setEditingId(photo._id);
    setTitle(photo.title);
  };

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
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-[#FEFEFE] rounded-lg shadow-md">
      {token && (
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-[#0A4833] rounded p-2 text-[#0A4833] w-full sm:w-1/2"
          />
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-[#0A4833] rounded p-2 text-[#0A4833] w-full sm:w-1/3"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-[#0A4833] text-[#FEFEFE] px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            {loading
              ? `Uploading... ${uploadPercent}%`
              : editingId
              ? "Update Photo"
              : "Upload Photo"}
          </button>
        </div>
      )}

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-[#0A4833] h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${uploadPercent}%` }}
          ></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="relative border border-[#0A4833] rounded overflow-hidden bg-[#FEFEFE]"
          >
            <img
              src={photo.image}
              alt={photo.title || "Gallery"}
              className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
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

      {photos.length === 0 && (
        <p className="text-center text-[#0A4833] mt-8 text-lg font-medium">
          No photos available.
        </p>
      )}
    </div>
  );
}
