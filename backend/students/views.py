import csv
from django.http import HttpResponse
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    StudentProfileSerializer, StudentProfileCreateSerializer,
    TeacherProfileSerializer, TeacherProfileCreateSerializer,
    CourseSerializer, EnrollmentSerializer, GradeSerializer,
    CurrentUserSerializer
)
from .permissions import (
    IsAdmin, IsTeacher, IsStudent, IsOwnerOrAdmin,
    IsTeacherOfCourse, IsStudentOwner, IsAdminOrTeacher, IsAdminOrStudent
)
from .filters import (
    UserFilter, StudentProfileFilter, TeacherProfileFilter,
    CourseFilter, EnrollmentFilter, GradeFilter
)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    """
    Get the current authenticated user's information.
    GET /api/v1/me/
    """
    serializer = CurrentUserSerializer(request.user)
    return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for User management (admin only).
    Provides full CRUD operations on users.
    """
    queryset = User.objects.all()
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = UserFilter
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering_fields = ['username', 'email', 'date_joined', 'role']
    ordering = ['-date_joined']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer


class StudentProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for StudentProfile management.
    - Students can view/edit their own profile
    - Teachers can view students in their courses
    - Admins can view/edit all profiles
    """
    queryset = StudentProfile.objects.select_related('user').all()
    serializer_class = StudentProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = StudentProfileFilter
    search_fields = ['enrollment_number', 'user__username', 'user__email']
    ordering_fields = ['enrollment_number', 'created_at']
    ordering = ['enrollment_number']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Admin, teacher, or student can list/view
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':
            # Only admin can create
            return [IsAdmin()]
        else:
            # Update/delete: admin or owner
            return [IsAdmin()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'teacher' and hasattr(user, 'teacher_profile'):
            # Teachers can see students enrolled in their courses
            student_ids = Enrollment.objects.filter(
                course__teacher=user.teacher_profile
            ).values_list('student_id', flat=True)
            return self.queryset.filter(id__in=student_ids)
        elif user.role == 'student' and hasattr(user, 'student_profile'):
            # Students can only see their own profile
            return self.queryset.filter(user=user)
        
        return self.queryset.none()
    
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[IsStudent])
    def me(self, request):
        """
        Get or update the current student's profile.
        GET/PUT/PATCH /api/v1/students/me/
        """
        try:
            profile = request.user.student_profile
        except StudentProfile.DoesNotExist:
            return Response(
                {'error': 'Student profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        else:
            serializer = StudentProfileCreateSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(StudentProfileSerializer(profile).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for TeacherProfile management.
    - Teachers can view/edit their own profile
    - Admins can view/edit all profiles
    """
    queryset = TeacherProfile.objects.select_related('user').all()
    serializer_class = TeacherProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = TeacherProfileFilter
    search_fields = ['user__username', 'user__email', 'department']
    ordering_fields = ['department', 'created_at']
    ordering = ['user__username']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':
            return [IsAdmin()]
        else:
            return [IsAdmin()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'teacher' and hasattr(user, 'teacher_profile'):
            return self.queryset.filter(user=user)
        
        return self.queryset
    
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[IsTeacher])
    def me(self, request):
        """
        Get or update the current teacher's profile.
        GET/PUT/PATCH /api/v1/teachers/me/
        """
        try:
            profile = request.user.teacher_profile
        except TeacherProfile.DoesNotExist:
            return Response(
                {'error': 'Teacher profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        else:
            serializer = TeacherProfileCreateSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(TeacherProfileSerializer(profile).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Course management.
    - Admins can manage all courses
    - Teachers can manage only their own courses
    - Students can view courses
    """
    queryset = Course.objects.select_related('teacher__user').all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = CourseFilter
    search_fields = ['title', 'code', 'description']
    ordering_fields = ['code', 'title', 'created_at']
    ordering = ['code']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':
            return [IsAdminOrTeacher()]
        else:
            return [IsAdmin()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'teacher' and hasattr(user, 'teacher_profile'):
            # Teachers can see their own courses
            return self.queryset.filter(teacher=user.teacher_profile)
        elif user.role == 'student':
            # Students can see all active courses
            return self.queryset.filter(is_active=True)
        
        return self.queryset
    
    def perform_create(self, serializer):
        # If teacher creates a course, assign it to them
        if self.request.user.role == 'teacher' and hasattr(self.request.user, 'teacher_profile'):
            serializer.save(teacher=self.request.user.teacher_profile)
        else:
            serializer.save()


class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Enrollment management.
    - Students can enroll themselves in courses
    - Teachers can view enrollments for their courses
    - Admins can manage all enrollments
    """
    queryset = Enrollment.objects.select_related('student__user', 'course').all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EnrollmentFilter
    ordering_fields = ['enrolled_at']
    ordering = ['-enrolled_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':
            return [IsAdminOrStudent()]
        else:
            return [IsAdmin()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'teacher' and hasattr(user, 'teacher_profile'):
            # Teachers can see enrollments for their courses
            return self.queryset.filter(course__teacher=user.teacher_profile)
        elif user.role == 'student' and hasattr(user, 'student_profile'):
            # Students can see their own enrollments
            return self.queryset.filter(student=user.student_profile)
        
        return self.queryset.none()
    
    def perform_create(self, serializer):
        # If student creates enrollment, assign it to them
        if self.request.user.role == 'student' and hasattr(self.request.user, 'student_profile'):
            serializer.save(student=self.request.user.student_profile)
        else:
            serializer.save()


class GradeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Grade management.
    - Teachers can manage grades for their courses
    - Students can view their own grades
    - Admins can manage all grades
    """
    queryset = Grade.objects.select_related('student__user', 'course', 'teacher__user').all()
    serializer_class = GradeSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = GradeFilter
    ordering_fields = ['graded_at', 'value']
    ordering = ['-graded_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':
            return [IsAdminOrTeacher()]
        else:
            return [IsAdminOrTeacher()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return self.queryset
        elif user.role == 'teacher' and hasattr(user, 'teacher_profile'):
            # Teachers can see grades for their courses
            return self.queryset.filter(course__teacher=user.teacher_profile)
        elif user.role == 'student' and hasattr(user, 'student_profile'):
            # Students can see their own grades
            return self.queryset.filter(student=user.student_profile)
        
        return self.queryset.none()
    
    def perform_create(self, serializer):
        # If teacher creates grade, assign them as the grader
        if self.request.user.role == 'teacher' and hasattr(self.request.user, 'teacher_profile'):
            serializer.save(teacher=self.request.user.teacher_profile)
        else:
            serializer.save()


@api_view(['GET'])
@permission_classes([IsAdmin])
def export_students_csv(request):
    """
    Export all students to CSV (admin only).
    GET /api/v1/exports/students/
    """
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="students.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'ID', 'Username', 'Email', 'First Name', 'Last Name',
        'Enrollment Number', 'Date of Birth', 'Phone Number', 'Address'
    ])

    students = StudentProfile.objects.select_related('user').all()
    for student in students:
        writer.writerow([
            student.id,
            student.user.username,
            student.user.email,
            student.user.first_name,
            student.user.last_name,
            student.enrollment_number,
            student.date_of_birth,
            student.phone_number,
            student.address,
        ])

    return response


@api_view(['GET'])
@permission_classes([IsAdmin])
def export_grades_csv(request):
    """
    Export grades to CSV (admin only).
    Optionally filter by course_id query parameter.
    GET /api/v1/exports/grades/?course_id=1
    """
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="grades.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'ID', 'Student Username', 'Student Enrollment', 'Course Code',
        'Course Title', 'Grade', 'Teacher', 'Graded At'
    ])

    grades = Grade.objects.select_related('student__user', 'course', 'teacher__user').all()

    # Filter by course if provided
    course_id = request.query_params.get('course_id')
    if course_id:
        grades = grades.filter(course_id=course_id)

    for grade in grades:
        writer.writerow([
            grade.id,
            grade.student.user.username,
            grade.student.enrollment_number,
            grade.course.code,
            grade.course.title,
            grade.value,
            grade.teacher.user.username if grade.teacher else 'N/A',
            grade.graded_at,
        ])

    return response

