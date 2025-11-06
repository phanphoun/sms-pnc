import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Grade, GradeCreate, PaginatedResponse, Course, StudentProfile } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradeForm } from '../../forms/GradeForm';
import { DashboardLayout } from '../../components/DashboardLayout';
import toast from 'react-hot-toast';

export const GradeEntry: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: grades, isLoading: gradesLoading } = useQuery({
    queryKey: ['teacher-grades', selectedCourse],
    queryFn: async () => {
      const url = selectedCourse ? `/grades/?course=${selectedCourse}` : '/grades/';
      const response = await axiosInstance.get<PaginatedResponse<Grade>>(url);
      return response.data;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ['teacher-courses'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
      return response.data;
    },
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<StudentProfile>>('/students/');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: GradeCreate) => {
      const response = await axiosInstance.post('/grades/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-grades'] });
      toast.success('Grade assigned successfully');
      setShowCreateModal(false);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to assign grade';
      toast.error(message);
    },
  });

  if (gradesLoading) return <LoadingSpinner fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Grade Management</h1>
            <p className="text-gray-600">Enter and manage student grades for your courses</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Assign Grade</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <label htmlFor="course-filter" className="text-sm font-medium text-gray-700">
              Filter by Course
            </label>
          </div>
          <select
            id="course-filter"
            value={selectedCourse || ''}
            onChange={(e) => setSelectedCourse(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Courses</option>
            {courses?.results.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Graded At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades?.results.map((grade) => (
                <tr key={grade.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {grade.student_detail?.user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.student_detail?.enrollment_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {grade.course_detail?.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {grade.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(grade.graded_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {grades?.results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No grades assigned yet.</p>
        </div>
      )}

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Assign Grade</h2>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <GradeForm
                  onSubmit={(data) => createMutation.mutate(data)}
                  onCancel={() => setShowCreateModal(false)}
                  isLoading={createMutation.isPending}
                  students={students?.results || []}
                  courses={courses?.results || []}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

