import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              Student Management System
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Home
              </Link>
              
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/users" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    Users
                  </Link>
                  <Link to="/admin/courses" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    Courses
                  </Link>
                </>
              )}
              
              {user.role === 'teacher' && (
                <>
                  <Link to="/teacher/courses" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    My Courses
                  </Link>
                  <Link to="/teacher/grades" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    Grades
                  </Link>
                </>
              )}
              
              {user.role === 'student' && (
                <>
                  <Link to="/student/enrollments" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    My Enrollments
                  </Link>
                  <Link to="/student/grades" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                    My Grades
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

