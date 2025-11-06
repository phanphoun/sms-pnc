from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .token_serializers import CustomTokenObtainPairView
from .views import (
    current_user,
    UserViewSet,
    StudentProfileViewSet,
    TeacherProfileViewSet,
    CourseViewSet,
    EnrollmentViewSet,
    GradeViewSet,
    export_students_csv,
    export_grades_csv,
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'students', StudentProfileViewSet, basename='student')
router.register(r'teachers', TeacherProfileViewSet, basename='teacher')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'grades', GradeViewSet, basename='grade')

urlpatterns = [
    # Authentication endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Current user endpoint
    path('me/', current_user, name='current_user'),
    
    # Export endpoints
    path('exports/students/', export_students_csv, name='export_students'),
    path('exports/grades/', export_grades_csv, name='export_grades'),
    
    # Router URLs
    path('', include(router.urls)),
]

