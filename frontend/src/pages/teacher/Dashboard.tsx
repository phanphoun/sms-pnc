import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Course, PaginatedResponse } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Link } from 'react-router-dom';

export const TeacherDashboard: React.FC = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['teacher-courses'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.results.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.code}</h2>
            <p className="text-gray-700 mb-4">{course.title}</p>
            <p className="text-sm text-gray-500 mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {course.is_active ? 'Active' : 'Inactive'}
              </span>
              <Link
                to={`/teacher/grades?course=${course.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Manage Grades →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {courses?.results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses assigned yet.</p>
        </div>
      )}
    </div>
  );
};

