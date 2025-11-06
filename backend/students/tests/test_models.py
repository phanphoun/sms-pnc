import pytest
from django.db import IntegrityError
from students.models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade
from .factories import (
    UserFactory, StudentUserFactory, TeacherUserFactory,
    StudentProfileFactory, TeacherProfileFactory,
    CourseFactory, EnrollmentFactory, GradeFactory
)


@pytest.mark.django_db
class TestUserModel:
    """Tests for the User model."""
    
    def test_create_user(self):
        user = UserFactory(username='testuser', role='student')
        assert user.username == 'testuser'
        assert user.role == 'student'
        assert str(user) == 'testuser (Student)'
    
    def test_user_email_unique(self):
        UserFactory(email='test@example.com')
        with pytest.raises(IntegrityError):
            UserFactory(email='test@example.com')
    
    def test_user_roles(self):
        admin = UserFactory(role='admin')
        teacher = UserFactory(role='teacher')
        student = UserFactory(role='student')
        base = UserFactory(role='base')
        
        assert admin.role == 'admin'
        assert teacher.role == 'teacher'
        assert student.role == 'student'
        assert base.role == 'base'


@pytest.mark.django_db
class TestStudentProfileModel:
    """Tests for the StudentProfile model."""
    
    def test_create_student_profile(self):
        profile = StudentProfileFactory(enrollment_number='ENR001')
        assert profile.enrollment_number == 'ENR001'
        assert profile.user.role == 'student'
    
    def test_enrollment_number_unique(self):
        StudentProfileFactory(enrollment_number='ENR001')
        with pytest.raises(IntegrityError):
            StudentProfileFactory(enrollment_number='ENR001')
    
    def test_student_profile_str(self):
        profile = StudentProfileFactory(enrollment_number='ENR123')
        assert 'ENR123' in str(profile)


@pytest.mark.django_db
class TestTeacherProfileModel:
    """Tests for the TeacherProfile model."""
    
    def test_create_teacher_profile(self):
        profile = TeacherProfileFactory(department='Computer Science')
        assert profile.department == 'Computer Science'
        assert profile.user.role == 'teacher'
    
    def test_teacher_profile_str(self):
        profile = TeacherProfileFactory(department='Math')
        assert 'Math' in str(profile)


@pytest.mark.django_db
class TestCourseModel:
    """Tests for the Course model."""
    
    def test_create_course(self):
        course = CourseFactory(code='CS101', title='Intro to CS')
        assert course.code == 'CS101'
        assert course.title == 'Intro to CS'
        assert course.is_active is True
    
    def test_course_code_unique(self):
        CourseFactory(code='CS101')
        with pytest.raises(IntegrityError):
            CourseFactory(code='CS101')
    
    def test_course_str(self):
        course = CourseFactory(code='CS101', title='Intro to CS')
        assert str(course) == 'CS101 - Intro to CS'


@pytest.mark.django_db
class TestEnrollmentModel:
    """Tests for the Enrollment model."""
    
    def test_create_enrollment(self):
        enrollment = EnrollmentFactory()
        assert enrollment.student is not None
        assert enrollment.course is not None
    
    def test_enrollment_unique_together(self):
        student = StudentProfileFactory()
        course = CourseFactory()
        EnrollmentFactory(student=student, course=course)
        
        with pytest.raises(IntegrityError):
            EnrollmentFactory(student=student, course=course)
    
    def test_enrollment_str(self):
        enrollment = EnrollmentFactory()
        assert 'enrolled in' in str(enrollment)


@pytest.mark.django_db
class TestGradeModel:
    """Tests for the Grade model."""
    
    def test_create_grade(self):
        grade = GradeFactory(value='A')
        assert grade.value == 'A'
        assert grade.student is not None
        assert grade.course is not None
    
    def test_grade_unique_together(self):
        student = StudentProfileFactory()
        course = CourseFactory()
        GradeFactory(student=student, course=course, value='A')
        
        with pytest.raises(IntegrityError):
            GradeFactory(student=student, course=course, value='B')
    
    def test_grade_choices(self):
        for grade_value in ['A', 'B', 'C', 'D', 'F']:
            grade = GradeFactory(value=grade_value)
            assert grade.value == grade_value
    
    def test_grade_str(self):
        grade = GradeFactory(value='A')
        assert 'A' in str(grade)

