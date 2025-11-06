import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { StudentProfile, StudentProfileUpdate } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StudentForm } from '../../forms/StudentForm';
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
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
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Username</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.user.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Enrollment Number</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.enrollment_number}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="mt-1 text-lg text-gray-900">
                {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.phone_number || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Address</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.address || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

