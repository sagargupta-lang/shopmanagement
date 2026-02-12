import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://shopmanagement-green.vercel.app/api/auth/login', formData);
      
      // Save the token so we can access protected pages later
      localStorage.setItem('token', res.data.token);
      
      alert("Login Successful! 🔓");
      navigate('/'); // Redirect to home page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;