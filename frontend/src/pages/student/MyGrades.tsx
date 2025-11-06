import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { Grade, PaginatedResponse, Course } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { DashboardLayout } from '../../components/DashboardLayout';

export const MyGrades: React.FC = () => {
  const { data: grades, isLoading: gradesLoading } = useQuery({
    queryKey: ['my-grades'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Grade>>('/grades/');
      return response.data;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ['available-courses'],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Course>>('/courses/');
      return response.data;
    },
  });

  const getCourseName = (courseId: number) => {
    return courses?.results.find(c => c.id === courseId)?.title || 'Unknown Course';
  };

  const getCourseCode = (courseId: number) => {
    return courses?.results.find(c => c.id === courseId)?.code || 'N/A';
  };

  if (gradesLoading) return <LoadingSpinner fullScreen />;

  // Group grades by course
  const gradesByCourse = grades?.results.reduce((acc, grade) => {
    const courseId = grade.course;
    if (!acc[courseId]) {
      acc[courseId] = [];
    }
    acc[courseId].push(grade);
    return acc;
  }, {} as Record<number, Grade[]>) || {};

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Grades</h1>
          <p className="text-gray-600">View your academic performance across all courses</p>
        </div>

        {Object.keys(gradesByCourse).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Grades Yet</h3>
            <p className="text-gray-500">Your grades will appear here once they are assigned by your teachers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(gradesByCourse).map(([courseId, courseGrades]) => {
              const courseIdNum = parseInt(courseId);
              const latestGrade = courseGrades.sort((a, b) =>
                new Date(b.graded_at).getTime() - new Date(a.graded_at).getTime()
              )[0];

              return (
                <div key={courseId} className="group relative overflow-hidden p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {getCourseCode(courseIdNum)}
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">{getCourseName(courseIdNum)}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Latest Grade:</span>
                        <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-800">
                          {latestGrade.value}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Graded: {new Date(latestGrade.graded_at).toLocaleDateString()}
                      </div>

                      {courseGrades.length > 1 && (
                        <div className="text-xs text-gray-500">
                          {courseGrades.length} total grades
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Card */}
        {Object.keys(gradesByCourse).length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.keys(gradesByCourse).length}
                </div>
                <div className="text-sm text-blue-600">Courses</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {grades?.results.length}
                </div>
                <div className="text-sm text-green-600">Total Grades</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {grades?.results.filter(g => {
                    const grade = parseFloat(g.value);
                    return grade >= 85;
                  }).length}
                </div>
                <div className="text-sm text-purple-600">A Grades</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
