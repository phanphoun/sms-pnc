import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from students.models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade
from .factories import (
    AdminUserFactory, TeacherUserFactory, StudentUserFactory,
    StudentProfileFactory, TeacherProfileFactory,
    CourseFactory, EnrollmentFactory, GradeFactory
)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def admin_user():
    user = AdminUserFactory()
    user.set_password('password123')
    user.save()
    return user


@pytest.fixture
def teacher_user():
    user = TeacherUserFactory()
    user.set_password('password123')
    user.save()
    return user


@pytest.fixture
def student_user():
    user = StudentUserFactory()
    user.set_password('password123')
    user.save()
    return user


@pytest.mark.django_db
class TestAuthentication:
    """Tests for authentication endpoints."""
    
    def test_login_success(self, api_client, admin_user):
        url = reverse('token_obtain_pair')
        data = {'username': admin_user.username, 'password': 'password123'}
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
    
    def test_login_invalid_credentials(self, api_client):
        url = reverse('token_obtain_pair')
        data = {'username': 'invalid', 'password': 'wrong'}
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_current_user_authenticated(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        url = reverse('current_user')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['username'] == admin_user.username
        assert response.data['role'] == 'admin'
    
    def test_current_user_unauthenticated(self, api_client):
        url = reverse('current_user')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestUserManagement:
    """Tests for user management (admin only)."""
    
    def test_admin_can_list_users(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        url = reverse('user-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
    
    def test_admin_can_create_user(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        url = reverse('user-list')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
            'role': 'student'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='newuser').exists()
    
    def test_non_admin_cannot_create_user(self, api_client, student_user):
        api_client.force_authenticate(user=student_user)
        url = reverse('user-list')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
            'role': 'student'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestStudentProfile:
    """Tests for student profile endpoints."""
    
    def test_student_can_view_own_profile(self, api_client, student_user):
        api_client.force_authenticate(user=student_user)
        url = reverse('student-me')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
    
    def test_student_can_update_own_profile(self, api_client, student_user):
        api_client.force_authenticate(user=student_user)
        url = reverse('student-me')
        data = {'phone_number': '+9876543210'}
        response = api_client.patch(url, data)
        
        assert response.status_code == status.HTTP_200_OK
        student_user.student_profile.refresh_from_db()
        assert student_user.student_profile.phone_number == '+9876543210'
    
    def test_admin_can_list_students(self, api_client, admin_user):
        StudentProfileFactory.create_batch(3)
        api_client.force_authenticate(user=admin_user)
        url = reverse('student-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) >= 3


@pytest.mark.django_db
class TestCourse:
    """Tests for course endpoints."""
    
    def test_teacher_can_create_course(self, api_client, teacher_user):
        api_client.force_authenticate(user=teacher_user)
        url = reverse('course-list')
        data = {
            'title': 'New Course',
            'code': 'NC101',
            'description': 'A new course',
            'is_active': True
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert Course.objects.filter(code='NC101').exists()
    
    def test_student_can_view_courses(self, api_client, student_user):
        CourseFactory.create_batch(3)
        api_client.force_authenticate(user=student_user)
        url = reverse('course-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
    
    def test_student_cannot_create_course(self, api_client, student_user):
        api_client.force_authenticate(user=student_user)
        url = reverse('course-list')
        data = {
            'title': 'New Course',
            'code': 'NC101',
            'description': 'A new course',
            'is_active': True
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestEnrollment:
    """Tests for enrollment endpoints."""
    
    def test_student_can_enroll_in_course(self, api_client, student_user):
        course = CourseFactory()
        api_client.force_authenticate(user=student_user)
        url = reverse('enrollment-list')
        data = {
            'course_id': course.id
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert Enrollment.objects.filter(
            student=student_user.student_profile,
            course=course
        ).exists()
    
    def test_student_can_view_own_enrollments(self, api_client, student_user):
        EnrollmentFactory(student=student_user.student_profile)
        api_client.force_authenticate(user=student_user)
        url = reverse('enrollment-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) >= 1


@pytest.mark.django_db
class TestGrade:
    """Tests for grade endpoints."""
    
    def test_teacher_can_create_grade(self, api_client, teacher_user):
        student = StudentProfileFactory()
        course = CourseFactory(teacher=teacher_user.teacher_profile)
        
        api_client.force_authenticate(user=teacher_user)
        url = reverse('grade-list')
        data = {
            'student_id': student.id,
            'course_id': course.id,
            'value': 'A'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert Grade.objects.filter(student=student, course=course).exists()
    
    def test_student_can_view_own_grades(self, api_client, student_user):
        GradeFactory(student=student_user.student_profile, value='A')
        api_client.force_authenticate(user=student_user)
        url = reverse('grade-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) >= 1
    
    def test_student_cannot_create_grade(self, api_client, student_user):
        course = CourseFactory()
        api_client.force_authenticate(user=student_user)
        url = reverse('grade-list')
        data = {
            'student_id': student_user.student_profile.id,
            'course_id': course.id,
            'value': 'A'
        }
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestExports:
    """Tests for CSV export endpoints."""
    
    def test_admin_can_export_students(self, api_client, admin_user):
        StudentProfileFactory.create_batch(3)
        api_client.force_authenticate(user=admin_user)
        url = reverse('export_students')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response['Content-Type'] == 'text/csv'
    
    def test_admin_can_export_grades(self, api_client, admin_user):
        GradeFactory.create_batch(3)
        api_client.force_authenticate(user=admin_user)
        url = reverse('export_grades')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response['Content-Type'] == 'text/csv'
    
    def test_non_admin_cannot_export(self, api_client, student_user):
        api_client.force_authenticate(user=student_user)
        url = reverse('export_students')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN

