import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={{ textAlign: 'center', margin: '20px' }}>
        <Link to="/">Home</Link> | 
        <Link to="/signup"> Signup</Link> | 
        <Link to="/login"> Login</Link>
      </nav>

      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<h1 style={{textAlign: 'center'}}>Welcome to the Shop 🛒</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;