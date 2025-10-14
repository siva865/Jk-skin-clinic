// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ------------------- CLOUDINARY CONFIG -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------- MONGODB CONNECT -------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));

// ------------------- MULTER MEMORY STORAGE -------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ------------------- MODELS -------------------
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", UserSchema);

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.model("Blog", BlogSchema);

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});
const Announcement = mongoose.model("Announcement", AnnouncementSchema);

const PhotoSchema = new mongoose.Schema({
  title: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});
const Photo = mongoose.model("Photo", PhotoSchema);

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now },
});
const Video = mongoose.model("Video", VideoSchema);

// ------------------- DEFAULT ADMIN -------------------
const createAdminIfMissing = async () => {
  try {
    const admin = await User.findOne({ username: "admin" });
    if (!admin) {
      const hashed = await bcrypt.hash("1234", 10);
      await User.create({ username: "admin", password: hashed });
      console.log("✅ Default admin created: admin / 1234");
    } else {
      console.log("✅ Admin already exists");
    }
  } catch (err) {
    console.error("Error creating admin:", err.message);
  }
};
createAdminIfMissing();

// ------------------- LOGIN -------------------
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ==================== Helper for Cloudinary Memory Upload ====================
const uploadToCloudinary = (buffer, folder, resource_type = "image") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });

// ------------------- BLOG ROUTES -------------------
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/blogs", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "website/blogs");
      imageUrl = result.secure_url;
    }

    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
    });
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/blogs/:id", upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "website/blogs");
      blog.image = result.secure_url;
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- ANNOUNCEMENT ROUTES -------------------
app.get("/api/announcements", async (req, res) => {
  try {
    const ann = await Announcement.find().sort({ createdAt: -1 });
    res.json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/announcements", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "website/announcements");
      imageUrl = result.secure_url;
    }

    const newAnn = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
    });
    res.json(newAnn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/announcements/:id", upload.single("image"), async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ msg: "Announcement not found" });

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "website/announcements");
      ann.image = result.secure_url;
    }

    ann.title = req.body.title || ann.title;
    ann.content = req.body.content || ann.content;
    await ann.save();
    res.json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/announcements/:id", async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndDelete(req.params.id);
    if (!ann) return res.status(404).json({ msg: "Announcement not found" });
    res.json({ msg: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- GET all photos -------------------
app.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- UPLOAD PHOTO to Cloudinary -------------------
app.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Use upload_stream for memoryStorage
    const streamUpload = (req) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "website/photos" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await streamUpload(req);
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

// ------------------- POST new photo (save Cloudinary URL + title) -------------------
app.post("/photos", async (req, res) => {
  try {
    const { image, title } = req.body;
    if (!image) return res.status(400).json({ msg: "No image URL provided" });

    const newPhoto = await Photo.create({
      title: title || "Untitled",
      image,
    });

    res.json(newPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- UPDATE photo -------------------
app.put("/photos/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ msg: "Photo not found" });

    if (req.body.image) photo.image = req.body.image;
    if (req.body.title) photo.title = req.body.title;

    await photo.save();
    res.json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- DELETE photo -------------------
app.delete("/photos/:id", async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).json({ msg: "Photo not found" });

    res.json({ msg: "Photo deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------- VIDEO ROUTES -------------------
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/videos", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No video uploaded" });
    const result = await uploadToCloudinary(req.file.buffer, "website/videos", "video");

    const newVideo = await Video.create({
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      videoUrl: result.secure_url,
    });
    res.json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/videos/:id", upload.single("video"), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: "Video not found" });

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "website/videos", "video");
      video.videoUrl = result.secure_url;
    }

    video.title = req.body.title || video.title;
    video.description = req.body.description || video.description;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/videos/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ msg: "Video not found" });
    res.json({ msg: "Video deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
