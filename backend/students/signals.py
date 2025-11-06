from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, StudentProfile, TeacherProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Automatically create StudentProfile or TeacherProfile when a User is created
    based on their role.
    """
    if created:
        if instance.role == 'student':
            # Create a default enrollment number if not exists
            # In production, this should be generated more carefully
            if not hasattr(instance, 'student_profile'):
                StudentProfile.objects.create(
                    user=instance,
                    enrollment_number=f"ENR{instance.id:06d}",
                    date_of_birth='2000-01-01'  # Default, should be updated
                )
        elif instance.role == 'teacher':
            if not hasattr(instance, 'teacher_profile'):
                TeacherProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Save the profile when the user is saved.
    """
    if instance.role == 'student' and hasattr(instance, 'student_profile'):
        instance.student_profile.save()
    elif instance.role == 'teacher' and hasattr(instance, 'teacher_profile'):
        instance.teacher_profile.save()

