import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Enrollment, EnrollmentCreate, PaginatedResponse, Course, Grade } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { DashboardLayout } from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

export const MyEnrollments: React.FC = () => {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['my-enrollments'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Enrollment>>('/enrollments/');
      return response.data;
    },
  });

  const { data: availableCourses } = useQuery({
    queryKey: ['available-courses'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
      return response.data;
    },
  });

  const { data: grades } = useQuery({
    queryKey: ['my-grades'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Grade>>('/grades/');
      return response.data;
    },
  });

  const enrollMutation = useMutation({
    mutationFn: async (data: EnrollmentCreate) => {
      const response = await axiosInstance.post('/enrollments/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      toast.success('Enrolled successfully');
      setShowEnrollModal(false);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to enroll';
      toast.error(message);
    },
  });

  const getGradeForCourse = (courseId: number) => {
    return grades?.results.find((g) => g.course === courseId);
  };

  if (enrollmentsLoading) return <LoadingSpinner fullScreen />;

  const enrolledCourseIds = enrollments?.results.map((e) => e.course) || [];
  const coursesToEnroll = availableCourses?.results.filter(
    (c) => !enrolledCourseIds.includes(c.id) && c.is_active
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Enrollments</h1>
            <p className="text-gray-600">View and manage your course enrollments</p>
          </div>
          <button
            onClick={() => setShowEnrollModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Enroll in Course</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments?.results.map((enrollment) => {
            const grade = getGradeForCourse(enrollment.course);
            return (
              <div key={enrollment.id} className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {enrollment.course_detail?.code}
                  </h3>
                  <p className="text-gray-700 mb-3">{enrollment.course_detail?.title}</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{enrollment.course_detail?.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                    </div>
                    {grade && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Grade: {grade.value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {enrollments?.results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Enrollments Yet</h3>
            <p className="text-gray-500">You haven't enrolled in any courses yet. Click the button above to get started.</p>
          </div>
        )}

        {showEnrollModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Enroll in Course</h2>
                  </div>
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {coursesToEnroll && coursesToEnroll.length > 0 ? (
                    coursesToEnroll.map((course) => (
                      <div
                        key={course.id}
                        className="group p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 cursor-pointer transition-all duration-200"
                        onClick={() => enrollMutation.mutate({ course_id: course.id })}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">{course.code}</h3>
                            <p className="text-sm text-gray-600 mt-1">{course.title}</p>
                            {course.description && (
                              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{course.description}</p>
                            )}
                          </div>
                          <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-gray-500">No available courses to enroll in at this time.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

