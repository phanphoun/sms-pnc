import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GradeCreate, GradeValue } from '../types';

const gradeSchema = z.object({
  student_id: z.number({ required_error: 'Student is required' }),
  course_id: z.number({ required_error: 'Course is required' }),
  value: z.enum(['A', 'B', 'C', 'D', 'F'], { required_error: 'Grade is required' }),
});

type GradeFormData = z.infer<typeof gradeSchema>;

interface GradeFormProps {
  initialData?: Partial<GradeCreate>;
  onSubmit: (data: GradeCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
  students?: Array<{ id: number; user: { username: string }; enrollment_number: string }>;
  courses?: Array<{ id: number; code: string; title: string }>;
}

export const GradeForm: React.FC<GradeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  students = [],
  courses = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: initialData,
  });

  const gradeOptions: GradeValue[] = ['A', 'B', 'C', 'D', 'F'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
          Student *
        </label>
        <select
          id="student_id"
          {...register('student_id', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.user.username} ({student.enrollment_number})
            </option>
          ))}
        </select>
        {errors.student_id && (
          <p className="mt-1 text-sm text-red-600">{errors.student_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="course_id" className="block text-sm font-medium text-gray-700 mb-1">
          Course *
        </label>
        <select
          id="course_id"
          {...register('course_id', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.title}
            </option>
          ))}
        </select>
        {errors.course_id && (
          <p className="mt-1 text-sm text-red-600">{errors.course_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
          Grade *
        </label>
        <select
          id="value"
          {...register('value')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a grade</option>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.value && (
          <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

