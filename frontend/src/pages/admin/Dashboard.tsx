import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { DashboardLayout } from '../../components/DashboardLayout';

export const AdminDashboard: React.FC = () => {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users-count'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/users/`);
      return response.data;
    },
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses-count'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/courses/`);
      return response.data;
    },
  });

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['enrollments-count'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/enrollments/`);
      return response.data;
    },
  });

  const { data: grades, isLoading: gradesLoading } = useQuery({
    queryKey: ['grades-count'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/grades/`);
      return response.data;
    },
  });

  if (usersLoading || coursesLoading || enrollmentsLoading || gradesLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner fullScreen />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your system from here.</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{users?.count || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-green-600">{courses?.count || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+5</span>
              <span className="text-gray-500 ml-2">active courses</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrollments</p>
                <p className="text-3xl font-bold text-purple-600">{enrollments?.count || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">+8</span>
              <span className="text-gray-500 ml-2">this week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Grades Assigned</p>
                <p className="text-3xl font-bold text-orange-600">{grades?.count || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+15</span>
              <span className="text-gray-500 ml-2">recent grades</span>
            </div>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {users?.results && (
              <>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {users.results.filter((u: any) => u.role === 'student').length}
                  </div>
                  <div className="text-sm text-blue-600">Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {users.results.filter((u: any) => u.role === 'teacher').length}
                  </div>
                  <div className="text-sm text-green-600">Teachers</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {users.results.filter((u: any) => u.role === 'admin').length}
                  </div>
                  <div className="text-sm text-purple-600">Admins</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {users.results.filter((u: any) => u.role === 'base').length}
                  </div>
                  <div className="text-sm text-gray-600">Base Users</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link
            to="/admin/users"
            className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">User Management</h2>
              <p className="text-gray-600 text-sm">Create, edit, and manage user accounts</p>
            </div>
          </Link>

          <Link
            to="/admin/courses"
            className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-bl-full"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Management</h2>
              <p className="text-gray-600 text-sm">Manage courses and course assignments</p>
            </div>
          </Link>

          <Link
            to="/admin/courses"
            className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">System Reports</h2>
              <p className="text-gray-600 text-sm">Export data and view analytics</p>
            </div>
          </Link>

          <Link
            to="/admin/enrollments"
            className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-bl-full"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Enrollment Management</h2>
              <p className="text-gray-600 text-sm">Manage student enrollments and course assignments</p>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-bl-full"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h2>
              <p className="text-gray-600 text-sm">Configure system preferences and global settings</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New user registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Course "Advanced Mathematics" created</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Grade assigned to student</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/admin/users"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all activity →
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Database</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Healthy</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">API Services</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">File Storage</span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">Warning</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Email Service</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last backup:</span>
                <span className="text-gray-900 font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Create User</h4>
              <p className="text-xs text-gray-600">Add new system user</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Add Course</h4>
              <p className="text-xs text-gray-600">Create new course</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Export Data</h4>
              <p className="text-xs text-gray-600">Download reports</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">System Settings</h4>
              <p className="text-xs text-gray-600">Configure system</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
