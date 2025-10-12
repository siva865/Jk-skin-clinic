import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A4833]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#0A4833] mb-6">
          Admin Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border-2 border-[#0A4833] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4833] text-[#0A4833]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 border-[#0A4833] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4833] text-[#0A4833]"
        />
        <button
          type="submit"
          className="bg-[#0A4833] text-white p-3 rounded-xl font-semibold hover:bg-white hover:text-[#0A4833] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
