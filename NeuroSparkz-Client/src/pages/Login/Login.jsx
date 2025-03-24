import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import { Link } from 'react-router-dom';
import "./Login.scss"

const Login = () => {
  const { login } = useUser();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/login`, { identifier, password });

      if (response.status === 200) {
        const token = response.data.token;
        await login(token); 
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username or Email:</label>
        <input 
          type="text" 
          value={identifier} 
          onChange={(e) => setIdentifier(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  </div>
  );
};

export default Login;