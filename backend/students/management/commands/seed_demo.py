from django.core.management.base import BaseCommand
from django.db import transaction
from students.models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade


class Command(BaseCommand):
    help = 'Seed the database with demo data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Seeding demo data...')
        
        with transaction.atomic():
            # Create admin user
            admin_user, created = User.objects.get_or_create(
                username='admin',
                defaults={
                    'email': 'admin@example.com',
                    'role': 'admin',
                    'first_name': 'Admin',
                    'last_name': 'User',
                }
            )
            if created:
                admin_user.set_password('admin123')
                admin_user.save()
                self.stdout.write(self.style.SUCCESS('✓ Created admin user (admin/admin123)'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Admin user already exists'))
            
            # Create teacher user
            teacher_user, created = User.objects.get_or_create(
                username='teacher',
                defaults={
                    'email': 'teacher@example.com',
                    'role': 'teacher',
                    'first_name': 'John',
                    'last_name': 'Doe',
                }
            )
            if created:
                teacher_user.set_password('teacher123')
                teacher_user.save()
                self.stdout.write(self.style.SUCCESS('✓ Created teacher user (teacher/teacher123)'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Teacher user already exists'))
            
            # Get or create teacher profile
            teacher_profile, created = TeacherProfile.objects.get_or_create(
                user=teacher_user,
                defaults={'department': 'Computer Science'}
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Created teacher profile'))
            
            # Create student user
            student_user, created = User.objects.get_or_create(
                username='student',
                defaults={
                    'email': 'student@example.com',
                    'role': 'student',
                    'first_name': 'Jane',
                    'last_name': 'Smith',
                }
            )
            if created:
                student_user.set_password('student123')
                student_user.save()
                self.stdout.write(self.style.SUCCESS('✓ Created student user (student/student123)'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Student user already exists'))
            
            # Get or update student profile
            student_profile, created = StudentProfile.objects.get_or_create(
                user=student_user,
                defaults={
                    'enrollment_number': 'ENR001',
                    'date_of_birth': '2000-01-15',
                    'phone_number': '+1234567890',
                    'address': '123 Main St, City, State 12345'
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Created student profile (ENR001)'))
            else:
                # Update enrollment number if it was auto-generated
                if student_profile.enrollment_number != 'ENR001':
                    student_profile.enrollment_number = 'ENR001'
                    student_profile.date_of_birth = '2000-01-15'
                    student_profile.phone_number = '+1234567890'
                    student_profile.address = '123 Main St, City, State 12345'
                    student_profile.save()
                    self.stdout.write(self.style.SUCCESS('✓ Updated student profile'))
            
            # Create courses
            cs101, created = Course.objects.get_or_create(
                code='CS101',
                defaults={
                    'title': 'Introduction to Computer Science',
                    'description': 'Fundamentals of programming and computer science',
                    'teacher': teacher_profile,
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Created course CS101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Course CS101 already exists'))
            
            ma101, created = Course.objects.get_or_create(
                code='MA101',
                defaults={
                    'title': 'Calculus I',
                    'description': 'Introduction to differential and integral calculus',
                    'teacher': teacher_profile,
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Created course MA101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Course MA101 already exists'))
            
            # Enroll student in courses
            enrollment1, created = Enrollment.objects.get_or_create(
                student=student_profile,
                course=cs101
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Enrolled student in CS101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Student already enrolled in CS101'))
            
            enrollment2, created = Enrollment.objects.get_or_create(
                student=student_profile,
                course=ma101
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Enrolled student in MA101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Student already enrolled in MA101'))
            
            # Assign grades
            grade1, created = Grade.objects.get_or_create(
                student=student_profile,
                course=cs101,
                defaults={
                    'teacher': teacher_profile,
                    'value': 'A'
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Assigned grade A for CS101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Grade for CS101 already exists'))
            
            grade2, created = Grade.objects.get_or_create(
                student=student_profile,
                course=ma101,
                defaults={
                    'teacher': teacher_profile,
                    'value': 'B'
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS('✓ Assigned grade B for MA101'))
            else:
                self.stdout.write(self.style.WARNING('⚠ Grade for MA101 already exists'))
        
        self.stdout.write(self.style.SUCCESS('\n✅ Demo data seeding completed!'))
        self.stdout.write('\nDemo accounts:')
        self.stdout.write('  Admin:   admin / admin123')
        self.stdout.write('  Teacher: teacher / teacher123')
        self.stdout.write('  Student: student / student123 (ENR001)')

