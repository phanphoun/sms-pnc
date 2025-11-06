import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Create, edit, and manage user accounts</p>
        </Link>

        <Link
          to="/admin/courses"
          className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Management</h2>
          <p className="text-gray-600">Manage courses and course assignments</p>
        </Link>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">System Reports</h2>
          <p className="text-gray-600">Export data and view analytics</p>
        </div>
      </div>
    </div>
  );
};

