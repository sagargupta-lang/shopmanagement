import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://shopmanagement-green.vercel.app/api/auth/signup', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;