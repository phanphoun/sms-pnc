from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """
    Permission class that allows access only to users with admin role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsTeacher(permissions.BasePermission):
    """
    Permission class that allows access only to users with teacher role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'teacher'


class IsStudent(permissions.BasePermission):
    """
    Permission class that allows access only to users with student role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'student'


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permission class that allows access to the owner of the object or admin users.
    Expects the object to have a 'user' attribute.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        return obj.user == request.user


class IsTeacherOfCourse(permissions.BasePermission):
    """
    Permission class that allows access only to the teacher assigned to the course.
    Expects the object to have a 'course' attribute with a 'teacher' relationship.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        if request.user.role == 'teacher' and hasattr(request.user, 'teacher_profile'):
            # Check if the course's teacher matches the current user's teacher profile
            if hasattr(obj, 'course'):
                return obj.course.teacher == request.user.teacher_profile
            # If obj is a Course itself
            if hasattr(obj, 'teacher'):
                return obj.teacher == request.user.teacher_profile
        return False


class IsStudentOwner(permissions.BasePermission):
    """
    Permission class that allows access only to the student who owns the record.
    Expects the object to have a 'student' attribute.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        if request.user.role == 'student' and hasattr(request.user, 'student_profile'):
            return obj.student == request.user.student_profile
        return False


class IsAdminOrTeacher(permissions.BasePermission):
    """
    Permission class that allows access to admin or teacher users.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['admin', 'teacher']
        )


class IsAdminOrStudent(permissions.BasePermission):
    """
    Permission class that allows access to admin or student users.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['admin', 'student']
        )

