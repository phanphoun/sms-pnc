from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin configuration for custom User model."""
    
    list_display = ['username', 'email', 'role', 'first_name', 'last_name', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active', 'is_staff', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    """Admin configuration for StudentProfile model."""
    
    list_display = ['enrollment_number', 'user', 'date_of_birth', 'phone_number', 'created_at']
    list_filter = ['created_at', 'date_of_birth']
    search_fields = ['enrollment_number', 'user__username', 'user__email']
    ordering = ['enrollment_number']
    raw_id_fields = ['user']


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):
    """Admin configuration for TeacherProfile model."""
    
    list_display = ['user', 'department', 'created_at']
    list_filter = ['department', 'created_at']
    search_fields = ['user__username', 'user__email', 'department']
    ordering = ['user__username']
    raw_id_fields = ['user']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """Admin configuration for Course model."""
    
    list_display = ['code', 'title', 'teacher', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['code', 'title', 'description']
    ordering = ['code']
    raw_id_fields = ['teacher']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    """Admin configuration for Enrollment model."""
    
    list_display = ['student', 'course', 'enrolled_at']
    list_filter = ['enrolled_at', 'course']
    search_fields = ['student__enrollment_number', 'student__user__username', 'course__code']
    ordering = ['-enrolled_at']
    raw_id_fields = ['student', 'course']


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    """Admin configuration for Grade model."""
    
    list_display = ['student', 'course', 'value', 'teacher', 'graded_at']
    list_filter = ['value', 'graded_at', 'course']
    search_fields = ['student__enrollment_number', 'student__user__username', 'course__code']
    ordering = ['-graded_at']
    raw_id_fields = ['student', 'course', 'teacher']

