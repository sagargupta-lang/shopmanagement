import React from 'react';

const EmployeeDashboard = ({ user }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Namaste, {user.name} 🙏</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          ID: {user.employeeId}
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Action */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">🕒 Daily Attendance</h3>
          <p className="text-sm text-gray-500 mb-4">Mark your In/Out time for today.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">
            Check In Now
          </button>
        </div>

        {/* Quick Salary View */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">💰 Latest Salary Slip</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-gray-800">₹18,500</p>
              <p className="text-xs text-gray-400">Month: February 2026</p>
            </div>
            <button className="text-blue-600 text-sm font-medium">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;