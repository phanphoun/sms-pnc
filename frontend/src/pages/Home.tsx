import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case 'admin':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-600">
              Welcome, {user.first_name || user.username}! You have full access to manage the system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Link
                to="/admin/users"
                className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                <h3 className="text-lg font-semibold text-blue-900">User Management</h3>
                <p className="text-sm text-blue-700 mt-2">Create and manage user accounts</p>
              </Link>
              <Link
                to="/admin/courses"
                className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
              >
                <h3 className="text-lg font-semibold text-green-900">Course Management</h3>
                <p className="text-sm text-green-700 mt-2">Manage courses and assignments</p>
              </Link>
              <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">Reports</h3>
                <p className="text-sm text-purple-700 mt-2">Export student and grade data</p>
              </div>
            </div>
          </div>
        );

      case 'teacher':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Teacher Dashboard</h2>
            <p className="text-gray-600">
              Welcome, {user.first_name || user.username}! Manage your courses and student grades.
            </p>
            {user.teacher_profile && (
              <p className="text-sm text-gray-500">
                Department: {user.teacher_profile.department || 'Not specified'}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link
                to="/teacher/courses"
                className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                <h3 className="text-lg font-semibold text-blue-900">My Courses</h3>
                <p className="text-sm text-blue-700 mt-2">View and manage your courses</p>
              </Link>
              <Link
                to="/teacher/grades"
                className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
              >
                <h3 className="text-lg font-semibold text-green-900">Grade Entry</h3>
                <p className="text-sm text-green-700 mt-2">Assign and update student grades</p>
              </Link>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Student Dashboard</h2>
            <p className="text-gray-600">
              Welcome, {user.first_name || user.username}!
            </p>
            {user.student_profile && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Enrollment Number:</span> {user.student_profile.enrollment_number}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link
                to="/student/enrollments"
                className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                <h3 className="text-lg font-semibold text-blue-900">My Enrollments</h3>
                <p className="text-sm text-blue-700 mt-2">View your enrolled courses</p>
              </Link>
              <Link
                to="/student/grades"
                className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
              >
                <h3 className="text-lg font-semibold text-green-900">My Grades</h3>
                <p className="text-sm text-green-700 mt-2">Check your academic performance</p>
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>
            <p className="text-gray-600 mt-2">
              You are logged in as {user.username}. Please contact an administrator for role assignment.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {getRoleSpecificContent()}
      </div>
    </div>
  );
};

