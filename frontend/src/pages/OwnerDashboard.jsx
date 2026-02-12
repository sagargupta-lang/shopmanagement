import React from 'react';

const OwnerDashboard = ({ data }) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Overview</h1>
      
      {/* 4-Column Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Staff" value={data.summary.totalEmployees} color="blue" />
        <StatCard title="Today Present" value={data.summary.todayPresent} color="green" />
        <StatCard title="Inventory Items" value={data.summary.totalStockItems} color="purple" />
        <StatCard title="Low Stock Alerts" value={data.alerts.length} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Attendance List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">Today's Attendance</h3>
          <p className="text-gray-500 italic text-sm">Real-time check-in status of workers...</p>
        </div>

        {/* Low Stock Warning Box */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-lg font-bold mb-4 text-red-600">Inventory Alerts ⚠️</h3>
          <ul className="space-y-2">
            {data.alerts.map((alert, i) => (
              <li key={i} className="text-sm bg-red-50 p-2 rounded">{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-b-4 border-${color}-500`}>
    <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

export default OwnerDashboard;