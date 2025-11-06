from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model - read-only for nested representations."""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new users (admin only)."""
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label='Confirm Password')
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'role', 'first_name', 'last_name']
        read_only_fields = ['id']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating users."""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_active']
        read_only_fields = ['id']


class StudentProfileSerializer(serializers.ModelSerializer):
    """Serializer for StudentProfile with nested user information."""
    
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = StudentProfile
        fields = [
            'id', 'user', 'user_id', 'enrollment_number', 'date_of_birth',
            'phone_number', 'address', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class StudentProfileCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating student profiles."""
    
    class Meta:
        model = StudentProfile
        fields = ['enrollment_number', 'date_of_birth', 'phone_number', 'address']


class TeacherProfileSerializer(serializers.ModelSerializer):
    """Serializer for TeacherProfile with nested user information."""
    
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = TeacherProfile
        fields = ['id', 'user', 'user_id', 'department', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class TeacherProfileCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating teacher profiles."""
    
    class Meta:
        model = TeacherProfile
        fields = ['department']


class CourseSerializer(serializers.ModelSerializer):
    """Serializer for Course model."""
    
    teacher_detail = TeacherProfileSerializer(source='teacher', read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=TeacherProfile.objects.all(),
        source='teacher',
        required=False,
        allow_null=True
    )
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'description', 'teacher', 'teacher_id',
            'teacher_detail', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class EnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for Enrollment model."""
    
    student_detail = StudentProfileSerializer(source='student', read_only=True)
    course_detail = CourseSerializer(source='course', read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentProfile.objects.all(),
        source='student',
        required=True
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source='course',
        required=True
    )
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'student_id', 'student_detail',
            'course', 'course_id', 'course_detail',
            'enrolled_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'enrolled_at', 'created_at', 'updated_at']


class GradeSerializer(serializers.ModelSerializer):
    """Serializer for Grade model."""
    
    student_detail = StudentProfileSerializer(source='student', read_only=True)
    course_detail = CourseSerializer(source='course', read_only=True)
    teacher_detail = TeacherProfileSerializer(source='teacher', read_only=True)
    
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentProfile.objects.all(),
        source='student',
        required=True
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source='course',
        required=True
    )
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=TeacherProfile.objects.all(),
        source='teacher',
        required=False,
        allow_null=True
    )
    
    class Meta:
        model = Grade
        fields = [
            'id', 'student', 'student_id', 'student_detail',
            'course', 'course_id', 'course_detail',
            'teacher', 'teacher_id', 'teacher_detail',
            'value', 'graded_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'graded_at', 'created_at', 'updated_at']


class CurrentUserSerializer(serializers.ModelSerializer):
    """Serializer for the current authenticated user."""
    
    student_profile = StudentProfileSerializer(read_only=True)
    teacher_profile = TeacherProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'role', 'first_name', 'last_name',
            'student_profile', 'teacher_profile', 'date_joined'
        ]
        read_only_fields = ['id', 'role', 'date_joined']

