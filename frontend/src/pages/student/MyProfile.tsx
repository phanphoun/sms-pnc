import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { StudentProfile, StudentProfileUpdate } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StudentForm } from '../../forms/StudentForm';
import { DashboardLayout } from '../../components/DashboardLayout';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export const MyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
      toast.success('Profile updated successfully');
      setIsEditing(false);
      refreshUser();
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to update profile';
      toast.error(message);
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and account details</p>
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
          <div className="bg-white shadow-md rounded-xl p-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                      <p className="text-lg text-gray-900 font-medium">{profile?.user.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-lg text-gray-900">{profile?.user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Enrollment Number</label>
                      <p className="text-lg text-gray-900 font-semibold text-blue-600">{profile?.enrollment_number}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                      <p className="text-lg text-gray-900">
                        {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                      <p className="text-lg text-gray-900">{profile?.phone_number || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Status</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                  <p className="text-lg text-gray-900 leading-relaxed">
                    {profile?.address || 'No address provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="space-y-6">
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-start p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="font-medium text-blue-900">Edit Profile</span>
                  </button>

                  <a
                    href="/student/enrollments"
                    className="w-full flex items-center justify-start p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-5 h-5 text-green-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium text-green-900">View Enrollments</span>
                  </a>

                  <a
                    href="/student/grades"
                    className="w-full flex items-center justify-start p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-5 h-5 text-purple-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-purple-900">View Grades</span>
                  </a>
                </div>
              </div>

              {/* Account Security Card */}
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Security</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="text-sm font-medium text-gray-900">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Created</span>
                    <span className="text-sm font-medium text-gray-900">
                      {profile?.user.date_joined ? new Date(profile.user.date_joined).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
