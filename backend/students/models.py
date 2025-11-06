from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class TimeStampedModel(models.Model):
    """Abstract base model with created_at and updated_at timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    """Custom User model with role-based access control."""
    
    ROLE_CHOICES = [
        ('base', 'Base'),
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='base',
        help_text='User role determines access permissions'
    )
    email = models.EmailField(unique=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-date_joined']
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class StudentProfile(TimeStampedModel):
    """Profile for users with student role."""
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
        limit_choices_to={'role': 'student'}
    )
    enrollment_number = models.CharField(
        max_length=20,
        unique=True,
        help_text='Unique student enrollment number'
    )
    date_of_birth = models.DateField()
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ]
    )
    address = models.TextField(blank=True)
    
    class Meta:
        db_table = 'student_profiles'
        ordering = ['enrollment_number']
    
    def __str__(self):
        return f"{self.user.username} - {self.enrollment_number}"


class TeacherProfile(TimeStampedModel):
    """Profile for users with teacher role."""
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
        limit_choices_to={'role': 'teacher'}
    )
    department = models.CharField(
        max_length=100,
        blank=True,
        help_text='Academic department'
    )
    
    class Meta:
        db_table = 'teacher_profiles'
        ordering = ['user__username']
    
    def __str__(self):
        return f"{self.user.username} - {self.department or 'No Department'}"


class Course(TimeStampedModel):
    """Course model representing academic courses."""
    
    title = models.CharField(max_length=200)
    code = models.CharField(
        max_length=20,
        unique=True,
        help_text='Unique course code (e.g., CS101)'
    )
    description = models.TextField(blank=True)
    teacher = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='courses',
        help_text='Teacher assigned to this course'
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Whether the course is currently active'
    )
    
    class Meta:
        db_table = 'courses'
        ordering = ['code']
    
    def __str__(self):
        return f"{self.code} - {self.title}"


class Enrollment(TimeStampedModel):
    """Enrollment model linking students to courses."""
    
    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'enrollments'
        unique_together = [['student', 'course']]
        ordering = ['-enrolled_at']
    
    def __str__(self):
        return f"{self.student.user.username} enrolled in {self.course.code}"


class Grade(TimeStampedModel):
    """Grade model for student performance in courses."""
    
    GRADE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    ]
    
    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    teacher = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='grades_given',
        help_text='Teacher who assigned this grade'
    )
    value = models.CharField(
        max_length=1,
        choices=GRADE_CHOICES,
        help_text='Letter grade (A-F)'
    )
    graded_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'grades'
        unique_together = [['student', 'course']]
        ordering = ['-graded_at']
    
    def __str__(self):
        return f"{self.student.user.username} - {self.course.code}: {self.value}"

