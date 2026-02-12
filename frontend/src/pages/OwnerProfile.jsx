import React, { useState } from 'react';

const OwnerProfile = ({ ownerData }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Settings & Profile</h2>
      
      <div className="bg-white shadow rounded-lg divide-y">
        {/* Company Section */}
        <section className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🏢 Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Shop Name</label>
              <p className="border-b py-1">{ownerData.companyName}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">GST Number</label>
              <p className="border-b py-1">{ownerData.gstNumber || 'Not Added'}</p>
            </div>
          </div>
        </section>

        {/* Policy Section */}
        <section className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🕒 Shop Policies</h3>
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
            <div>
              <p className="font-medium">Overtime Policy</p>
              <p className="text-sm text-gray-600">
                {ownerData.overtimeAllowed ? `Enabled at ₹${ownerData.overtimeRate}/hr` : 'Disabled'}
              </p>
            </div>
            <button className="text-blue-600 font-bold text-sm">Edit</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OwnerProfile;