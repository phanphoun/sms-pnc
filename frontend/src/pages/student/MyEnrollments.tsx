import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Enrollment, EnrollmentCreate, PaginatedResponse, Course, Grade } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
        <button
          onClick={() => setShowEnrollModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enroll in Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments?.results.map((enrollment) => {
          const grade = getGradeForCourse(enrollment.course);
          return (
            <div key={enrollment.id} className="bg-white border border-gray-200 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {enrollment.course_detail?.code}
              </h2>
              <p className="text-gray-700 mb-4">{enrollment.course_detail?.title}</p>
              <p className="text-sm text-gray-500 mb-4">{enrollment.course_detail?.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                </span>
                {grade && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Grade: {grade.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {enrollments?.results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        </div>
      )}

      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Enroll in Course</h2>
            <div className="space-y-4">
              {coursesToEnroll && coursesToEnroll.length > 0 ? (
                coursesToEnroll.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => enrollMutation.mutate({ course_id: course.id })}
                  >
                    <h3 className="font-semibold text-gray-900">{course.code}</h3>
                    <p className="text-sm text-gray-600">{course.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No available courses to enroll in.</p>
              )}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

