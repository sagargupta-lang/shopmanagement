import React, { useState } from 'react';

const OwnerSignup = () => {
    const [formData, setFormData] = useState({
        ownerName: '',
        email: '',
        phone: '',
        password: '',
        companyName: '',
        workingHours: 12
    });

    const [error, setError] = useState('');

    const validate = (pass) => {
        const letters = (pass.match(/[a-zA-Z]/g) || []).length;
        const numbers = (pass.match(/[0-9]/g) || []).length;
        const special = /[!@#$%^&*]/.test(pass);
        return letters >= 4 && numbers >= 3 && special;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate(formData.password)) {
            setError("❌ Password is too weak! Need 4 letters, 3 numbers, 1 special char.");
            return;
        }
        // Proceed to API Call
        console.log("Form is valid!", formData);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">🏢 Owner Registration</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Company Name *" 
                    className="w-full border p-2 rounded" 
                    required 
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder="Password *" 
                    className="w-full border p-2 rounded" 
                    required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <p className="text-xs text-gray-500 italic">
                    Rules: 4+ letters, 3+ numbers, 1+ special character
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Register Shop
                </button>
            </form>
        </div>
    );
};

export default OwnerSignup;