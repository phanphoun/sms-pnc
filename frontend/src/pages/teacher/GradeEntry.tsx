import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Grade, GradeCreate, PaginatedResponse, Course, StudentProfile } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradeForm } from '../../forms/GradeForm';
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Grade Entry</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Assign Grade
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Course
        </label>
        <select
          id="course-filter"
          value={selectedCourse || ''}
          onChange={(e) => setSelectedCourse(e.target.value ? Number(e.target.value) : null)}
          className="px-3 py-2 border border-gray-300 rounded-md"
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Assign Grade</h2>
            <GradeForm
              onSubmit={(data) => createMutation.mutate(data)}
              onCancel={() => setShowCreateModal(false)}
              isLoading={createMutation.isPending}
              students={students?.results || []}
              courses={courses?.results || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};

