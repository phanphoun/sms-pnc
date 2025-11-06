import django_filters
from .models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade


class UserFilter(django_filters.FilterSet):
    """Filter for User model."""
    
    username = django_filters.CharFilter(lookup_expr='icontains')
    email = django_filters.CharFilter(lookup_expr='icontains')
    role = django_filters.ChoiceFilter(choices=User.ROLE_CHOICES)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'is_active']


class StudentProfileFilter(django_filters.FilterSet):
    """Filter for StudentProfile model."""
    
    enrollment_number = django_filters.CharFilter(lookup_expr='icontains')
    user__username = django_filters.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = StudentProfile
        fields = ['enrollment_number', 'user__username']


class TeacherProfileFilter(django_filters.FilterSet):
    """Filter for TeacherProfile model."""
    
    department = django_filters.CharFilter(lookup_expr='icontains')
    user__username = django_filters.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = TeacherProfile
        fields = ['department', 'user__username']


class CourseFilter(django_filters.FilterSet):
    """Filter for Course model."""
    
    title = django_filters.CharFilter(lookup_expr='icontains')
    code = django_filters.CharFilter(lookup_expr='icontains')
    teacher = django_filters.NumberFilter()
    is_active = django_filters.BooleanFilter()
    
    class Meta:
        model = Course
        fields = ['title', 'code', 'teacher', 'is_active']


class EnrollmentFilter(django_filters.FilterSet):
    """Filter for Enrollment model."""
    
    student = django_filters.NumberFilter()
    course = django_filters.NumberFilter()
    
    class Meta:
        model = Enrollment
        fields = ['student', 'course']


class GradeFilter(django_filters.FilterSet):
    """Filter for Grade model."""
    
    student = django_filters.NumberFilter()
    course = django_filters.NumberFilter()
    teacher = django_filters.NumberFilter()
    value = django_filters.ChoiceFilter(choices=Grade.GRADE_CHOICES)
    
    class Meta:
        model = Grade
        fields = ['student', 'course', 'teacher', 'value']

