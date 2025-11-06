import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { StudentProfile, StudentProfileUpdate } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StudentForm } from '../../forms/StudentForm';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export const StudentDashboard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { refreshUser } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['student-profile'],
    queryFn: async () => {
      const response = await axiosInstance.get<StudentProfile>('/students/me/');
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: StudentProfileUpdate) => {
      const response = await axiosInstance.patch('/students/me/', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setIsEditing(false);
      refreshUser();
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back! Manage your profile and view your information.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <StudentForm
              initialData={{
                enrollment_number: profile?.enrollment_number,
                date_of_birth: profile?.date_of_birth,
                phone_number: profile?.phone_number,
                address: profile?.address,
              }}
              onSubmit={(data) => updateMutation.mutate(data)}
              onCancel={() => setIsEditing(false)}
              isLoading={updateMutation.isPending}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/student/profile"
              className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h2>
                <p className="text-gray-600 text-sm">View and edit your personal information</p>
              </div>
            </Link>

            <Link
              to="/student/grades"
              className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">My Grades</h2>
                <p className="text-gray-600 text-sm">View your academic performance and grades</p>
              </div>
            </Link>

            <div className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Schedule</h2>
                <p className="text-gray-600 text-sm">View your class timetable and schedule</p>
                <span className="inline-block mt-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

