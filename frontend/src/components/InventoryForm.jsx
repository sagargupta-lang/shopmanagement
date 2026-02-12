import React, { useState } from 'react';

const InventoryForm = () => {
    const [item, setItem] = useState({ itemName: '', price: '', quantity: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        // API call to our smart controller
        console.log("Sending to backend:", item);
        alert(`Request sent: Adding ${item.quantity} units of ${item.itemName}`);
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-4">📦 Update Stock</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
                <input 
                    type="text" 
                    placeholder="Item Name *" 
                    className="w-full border p-2 rounded"
                    value={item.itemName}
                    onChange={(e) => setItem({...item, itemName: e.target.value})}
                    required 
                />
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        placeholder="Price" 
                        className="w-1/2 border p-2 rounded"
                        onChange={(e) => setItem({...item, price: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Qty to Add *" 
                        className="w-1/2 border p-2 rounded"
                        onChange={(e) => setItem({...item, quantity: e.target.value})}
                        required
                    />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Save to Inventory
                </button>
            </form>
        </div>
    );
};

export default InventoryForm;