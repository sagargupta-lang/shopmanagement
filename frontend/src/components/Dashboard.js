import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first!");
            navigate('/login');
        }
        // In a real app, you'd fetch user details here using the token
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Store Inventory Dashboard 📦</h1>
            <p>Manage your products and stock levels here.</p>
            
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
                <h3>Coming Soon: Product List</h3>
                <button onClick={() => alert("Add Product Modal coming next!")}>Add New Product</button>
            </div>

            <br /><br />
            <button onClick={handleLogout} style={{ color: 'red' }}>Logout</button>
        </div>
    );
};

export default Dashboard;