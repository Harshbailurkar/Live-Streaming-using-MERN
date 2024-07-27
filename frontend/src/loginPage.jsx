import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure correct import path for useNavigate

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { username },
        { withCredentials: true }
      );
      navigate("/"); // Navigate to home after successful login
    } catch (error) {
      console.error("Error logging in:", error); // Handle error response
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter Your Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
