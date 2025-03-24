import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

const Signup = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!identifier || !password || !confirmPassword) {
      setError("All fields are required!");

      document.querySelectorAll("input").forEach((input) => {
        if (!input.value) {
          input.classList.add("input-error");
          setTimeout(() => input.classList.remove("input-error"), 500);
        }
      });

      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        identifier,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Signup failed. Please try again!"
      );
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username or Email:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="signup-button">
          Signup
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;