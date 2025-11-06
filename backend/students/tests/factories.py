import factory
from factory.django import DjangoModelFactory
from students.models import User, StudentProfile, TeacherProfile, Course, Enrollment, Grade


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    
    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    role = 'base'
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


class AdminUserFactory(UserFactory):
    role = 'admin'
    username = factory.Sequence(lambda n: f'admin{n}')


class TeacherUserFactory(UserFactory):
    role = 'teacher'
    username = factory.Sequence(lambda n: f'teacher{n}')


class StudentUserFactory(UserFactory):
    role = 'student'
    username = factory.Sequence(lambda n: f'student{n}')


class StudentProfileFactory(DjangoModelFactory):
    class Meta:
        model = StudentProfile
    
    user = factory.SubFactory(StudentUserFactory)
    enrollment_number = factory.Sequence(lambda n: f'ENR{n:06d}')
    date_of_birth = factory.Faker('date_of_birth', minimum_age=18, maximum_age=25)
    phone_number = factory.Faker('phone_number')
    address = factory.Faker('address')


class TeacherProfileFactory(DjangoModelFactory):
    class Meta:
        model = TeacherProfile
    
    user = factory.SubFactory(TeacherUserFactory)
    department = factory.Faker('word')


class CourseFactory(DjangoModelFactory):
    class Meta:
        model = Course
    
    title = factory.Faker('sentence', nb_words=4)
    code = factory.Sequence(lambda n: f'CS{n:03d}')
    description = factory.Faker('paragraph')
    teacher = factory.SubFactory(TeacherProfileFactory)
    is_active = True


class EnrollmentFactory(DjangoModelFactory):
    class Meta:
        model = Enrollment
    
    student = factory.SubFactory(StudentProfileFactory)
    course = factory.SubFactory(CourseFactory)


class GradeFactory(DjangoModelFactory):
    class Meta:
        model = Grade
    
    student = factory.SubFactory(StudentProfileFactory)
    course = factory.SubFactory(CourseFactory)
    teacher = factory.SubFactory(TeacherProfileFactory)
    value = 'A'

