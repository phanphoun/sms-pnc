import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Course, PaginatedResponse, Enrollment } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';

export const MyCourses: React.FC = () => {
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['teacher-courses'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
      return response.data;
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ['course-enrollments'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Enrollment>>('/enrollments/');
      return response.data;
    },
  });

  const getEnrollmentCount = (courseId: number) => {
    return enrollments?.results.filter(e => e.course === courseId).length || 0;
  };

  if (coursesLoading) return <LoadingSpinner fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Manage your assigned courses and view student enrollments</p>
          </div>
        </div>

        {!courses?.results.length ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Assigned</h3>
            <p className="text-gray-500">You haven't been assigned any courses yet. Contact an administrator for course assignments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.results.map((course) => {
              const enrollmentCount = getEnrollmentCount(course.id);

              return (
                <div key={course.id} className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {course.code}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">{course.title}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                        course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {course.description && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>{enrollmentCount} Students</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/teacher/grades?course=${course.id}`}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Grades
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Statistics */}
        {courses?.results && courses.results.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {courses.results.length}
                </div>
                <div className="text-sm text-blue-600">Total Courses</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {courses.results.filter(c => c.is_active).length}
                </div>
                <div className="text-sm text-green-600">Active Courses</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {enrollments?.results?.length || 0}
                </div>
                <div className="text-sm text-purple-600">Total Enrollments</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round((enrollments?.results?.length || 0) / Math.max(courses.results.length, 1))}
                </div>
                <div className="text-sm text-orange-600">Avg per Course</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
