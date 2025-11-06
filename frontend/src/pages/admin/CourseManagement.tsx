import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Course, CourseCreate, PaginatedResponse, TeacherProfile } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DashboardLayout } from '../../components/DashboardLayout';
import { CourseForm } from '../../forms/CourseForm';
import toast from 'react-hot-toast';

export const CourseManagement: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: courses, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
            return response.data;
        },
    });

    const { data: teachers } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const response = await axiosInstance.get<PaginatedResponse<TeacherProfile>>('/teachers/');
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/courses/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast.success('Course deleted successfully');
            setDeleteCourseId(null);
        },
        onError: () => {
            toast.error('Failed to delete course');
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: CourseCreate) => {
            const response = await axiosInstance.post('/courses/', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast.success('Course created successfully');
            setShowCreateModal(false);
        },
        onError: (error: any) => {
            const message = error.response?.data?.code?.[0] || 'Failed to create course';
            toast.error(message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CourseCreate }) => {
            const response = await axiosInstance.patch(`/courses/${id}/`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast.success('Course updated successfully');
            setShowEditModal(false);
            setEditingCourse(null);
        },
        onError: (error: any) => {
            const message = error.response?.data?.code?.[0] || 'Failed to update course';
            toast.error(message);
        },
    });

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setShowEditModal(true);
    };

    if (isLoading) return <LoadingSpinner fullScreen />;

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
                    <p className="text-gray-600">Manage courses and assign teachers</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Course</span>
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Teacher
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses?.results.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {course.code}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course.teacher_detail?.user.username || 'Unassigned'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                course.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {course.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                    <button
                                    onClick={() => openEditModal(course)}
                                    className="text-blue-600 hover:text-blue-900"
                                    >
                                    Edit
                                    </button>
                                        <button
                                             onClick={() => setDeleteCourseId(course.id)}
                                             className="text-red-600 hover:text-red-900"
                                         >
                                             Delete
                                         </button>
                                     </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <CourseForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setShowCreateModal(false)}
            isLoading={createMutation.isPending}
            teachers={teachers?.results || []}
            />
            </div>
            </div>
            )}

            {showEditModal && editingCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                        <CourseForm
                            initialData={{
                                title: editingCourse.title,
                                code: editingCourse.code,
                                description: editingCourse.description,
                                teacher_id: editingCourse.teacher || undefined,
                                is_active: editingCourse.is_active,
                            }}
                            onSubmit={(data) => updateMutation.mutate({ id: editingCourse.id, data })}
                            onCancel={() => {
                                setShowEditModal(false);
                                setEditingCourse(null);
                            }}
                            isLoading={updateMutation.isPending}
                            teachers={teachers?.results || []}
                        />
                    </div>
                </div>
            )}

            <ConfirmationDialog
                isOpen={deleteCourseId !== null}
                title="Delete Course"
                message="Are you sure you want to delete this course? This action cannot be undone."
                confirmLabel="Delete"
                variant="danger"
                onConfirm={() => deleteCourseId && deleteMutation.mutate(deleteCourseId)}
                onCancel={() => setDeleteCourseId(null)}
            />
        </DashboardLayout>
    );
};
