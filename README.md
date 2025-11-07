# 🎓 Student Management System (SMS)

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/phanphoun/sms-pnc)
[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Release](https://img.shields.io/badge/release-v2.0-green.svg)](https://github.com/phanphoun/sms-pnc/releases/tag/v2.0)

A comprehensive full-stack web application for educational institutions to manage students, teachers, courses, enrollments, and grades with advanced role-based access control, modern UI/UX, and robust functionality.

**✨ Features**: JWT Authentication, Role-Based Access, CRUD Operations, Modern Animations, Responsive Design, API Documentation

## 🏗️ Architecture

- **Backend**: Django 5 + Django REST Framework
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens) with custom role claims
- **Database**: SQLite (development) - easily switchable to PostgreSQL for production

## 🎯 Features

### Role-Based Access Control
- **Admin**: Full system access - manage users, courses, view all data, export reports
- **Teacher**: Manage own courses, assign grades to students
- **Student**: View own profile, enroll in courses, view grades
- **Base**: Default role with minimal permissions

### Core Functionality
- ✅ User authentication with JWT (access + refresh tokens)
- ✅ Full CRUD operations for Users, Students, Teachers, Courses, Enrollments, and Grades
- ✅ Role-specific dashboards and navigation
- ✅ Admin edit functionality for users and courses
- ✅ Search, filtering, and pagination on all list endpoints
- ✅ CSV export for students and grades (admin only)
- ✅ Help page with portfolio-style design and animations
- ✅ OpenAPI/Swagger documentation
- ✅ Comprehensive test suite (pytest + factory_boy)
- ✅ Responsive UI with Tailwind CSS and modern animations
- ✅ Form validation with Zod schemas
- ✅ Toast notifications for user feedback

## 📁 Project Structure

```
student_mgmt_system/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── pytest.ini
│   ├── student_mgmt/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   └── students/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── permissions.py
│       ├── filters.py
│       ├── signals.py
│       ├── admin.py
│       ├── urls.py
│       ├── token_serializers.py
│       ├── management/
│       │   └── commands/
│       │       └── seed_demo.py
│       └── tests/
│           ├── test_models.py
│           ├── test_api.py
│           └── factories.py
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.cjs
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── types/
│       │   └── index.ts
│       ├── api/
│       │   └── axiosInstance.ts
│       ├── context/
│       │   └── AuthContext.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── LoadingSpinner.tsx
│       │   ├── ConfirmationDialog.tsx
│       │   └── ToastProvider.tsx
│       ├── forms/
│       │   ├── StudentForm.tsx
│       │   ├── TeacherForm.tsx
│       │   ├── CourseForm.tsx
│       │   └── GradeForm.tsx
│       └── pages/
│           ├── Login.tsx
│           ├── Home.tsx
│           ├── admin/
│           │   ├── Dashboard.tsx
│           │   ├── UserManagement.tsx
│           │   └── CourseManagement.tsx
│           ├── teacher/
│           │   ├── Dashboard.tsx
│           │   └── GradeEntry.tsx
│           └── student/
│               ├── Dashboard.tsx
│               └── MyEnrollments.tsx
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Seed demo data** (optional but recommended):
   ```bash
   python manage.py seed_demo
   ```
   This creates:
   - Admin user: `admin` / `admin123`
   - Teacher user: `teacher` / `teacher123`
   - Student user: `student` / `student123` (ENR001)
   - Two courses (CS101, MA101)
   - Sample enrollments and grades

6. **Run development server**:
   ```bash
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

7. **Access API documentation**:
   - Swagger UI: `http://localhost:8000/api/v1/docs/`
   - OpenAPI Schema: `http://localhost:8000/api/v1/schema/`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```
   The default API URL is `http://localhost:8000/api/v1`

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

Access the help page at `http://localhost:5173/help` for comprehensive support information.

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
pytest
```

Run with coverage:
```bash
pytest --cov=students --cov-report=html
```

### Test Coverage
- Model tests (User, StudentProfile, TeacherProfile, Course, Enrollment, Grade)
- API endpoint tests (authentication, permissions, CRUD operations)
- Permission enforcement tests
- CSV export tests

## 📚 API Endpoints

### Authentication
- `POST /api/v1/token/` - Login (returns access + refresh tokens)
- `POST /api/v1/token/refresh/` - Refresh access token
- `GET /api/v1/me/` - Get current user info

### Users (Admin only)
- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create user
- `GET /api/v1/users/{id}/` - Get user details
- `PATCH /api/v1/users/{id}/` - Update user (frontend supported)
- `DELETE /api/v1/users/{id}/` - Delete user

### Students
- `GET /api/v1/students/` - List students
- `GET /api/v1/students/me/` - Get own profile (student)
- `PATCH /api/v1/students/me/` - Update own profile (student)
- `GET /api/v1/students/{id}/` - Get student details

### Teachers
- `GET /api/v1/teachers/` - List teachers
- `GET /api/v1/teachers/me/` - Get own profile (teacher)
- `PATCH /api/v1/teachers/me/` - Update own profile (teacher)

### Courses
- `GET /api/v1/courses/` - List courses
- `POST /api/v1/courses/` - Create course (admin/teacher)
- `GET /api/v1/courses/{id}/` - Get course details
- `PATCH /api/v1/courses/{id}/` - Update course (frontend supported)
- `DELETE /api/v1/courses/{id}/` - Delete course

### Enrollments
- `GET /api/v1/enrollments/` - List enrollments
- `POST /api/v1/enrollments/` - Create enrollment (student/admin)
- `DELETE /api/v1/enrollments/{id}/` - Delete enrollment

### Grades
- `GET /api/v1/grades/` - List grades
- `POST /api/v1/grades/` - Create grade (teacher/admin)
- `PUT /api/v1/grades/{id}/` - Update grade
- `DELETE /api/v1/grades/{id}/` - Delete grade

### Exports (Admin only)
- `GET /api/v1/exports/students/` - Export students to CSV
- `GET /api/v1/exports/grades/?course_id={id}` - Export grades to CSV

All list endpoints support:
- `?search=` - Search across relevant fields
- `?ordering=` - Sort by field (prefix with `-` for descending)
- `?page=` - Pagination
- Additional filters specific to each model

## 🔒 Security Features

- **Password Hashing**: Django's built-in PBKDF2 algorithm
- **JWT Authentication**: Short-lived access tokens (15 min), refresh tokens in HttpOnly cookies
- **CORS Protection**: Configured for localhost development
- **Permission Classes**: Role-based access control on all endpoints
- **Input Validation**: Zod schemas on frontend, DRF serializers on backend
- **SQL Injection Protection**: Django ORM parameterized queries

### Production Security Checklist
- [ ] Set `DEBUG = False`
- [ ] Use environment variables for `SECRET_KEY`
- [ ] Enable HTTPS (`SECURE_SSL_REDIRECT = True`)
- [ ] Configure proper `ALLOWED_HOSTS`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Implement rate limiting on authentication endpoints
- [ ] Set up proper CORS origins
- [ ] Enable Django security middleware
- [ ] Regular security updates

## 🎨 Frontend Features

- **React Query**: Efficient data fetching with caching and automatic refetch
- **React Hook Form + Zod**: Type-safe form validation
- **React Router v6**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first responsive design with modern animations
- **Custom CSS Animations**: Fade-in, slide-up, and interactive hover effects
- **Portfolio-style Help Page**: Multi-section design with smooth scrolling navigation
- **React Hot Toast**: User-friendly notifications
- **Axios Interceptors**: Automatic token refresh on 401

## 📝 Demo Accounts

After running `python manage.py seed_demo`:

| Role | Username | Password | Description |
|------|----------|----------|-------------|
| Admin | admin | admin123 | Full system access |
| Teacher | teacher | teacher123 | Manages CS101 and MA101 |
| Student | student | student123 | Enrolled in both courses |

## ✨ Recent Updates

### Version Features
- **Enhanced Admin Dashboard**: Added 2 additional management cards (Enrollment Management, System Settings)
- **Edit Functionality**: Full CRUD operations now available for users and courses in admin panel
- **Modern UI Animations**: Custom CSS animations, smooth transitions, and interactive hover effects
- **Portfolio-Style Help Page**: Multi-section help page with navigation, animations, and comprehensive support information
- **Improved User Experience**: Enhanced form validation, better error handling, and responsive design improvements

### Admin Features
- Edit user profiles (username, email, role, status)
- Edit course details (title, code, description, teacher assignment, status)
- Enhanced dashboard with additional quick access options
- Improved data management workflows

### Help & Support
- Dedicated help page accessible from login screen
- Portfolio-style design with smooth scrolling sections
- Contact information, troubleshooting guides, and system status
- Responsive design with modern animations

## 🛠️ Development

### Adding a New Model
1. Define model in `backend/students/models.py`
2. Create serializer in `backend/students/serializers.py`
3. Create ViewSet in `backend/students/views.py`
4. Add permissions in `backend/students/permissions.py`
5. Register in `backend/students/urls.py`
6. Add TypeScript types in `frontend/src/types/index.ts`
7. Create UI components and pages

### Code Style
- **Backend**: Follow PEP 8, use Black formatter
- **Frontend**: ESLint + Prettier, TypeScript strict mode

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

This project includes modern web development practices and is suitable for educational purposes. For production deployment, consider these enhancements:

### Security & Authentication
- Email verification for new user registrations
- Password reset functionality via email
- Two-factor authentication (2FA)
- Account lockout after failed attempts
- Session management improvements

### Features & Functionality
- File uploads for profile pictures and documents
- Real-time notifications using WebSockets
- Audit logs for admin actions
- Advanced search and filtering capabilities
- Data export in multiple formats (PDF, Excel, JSON)
- Bulk operations for admins
- Email notifications for important events

### UI/UX Improvements
- Dark mode support
- Advanced data visualization and analytics
- Mobile app companion
- Accessibility improvements (WCAG compliance)
- Multi-language support (i18n)

### Performance & Scalability
- Database optimization and indexing
- Caching layer (Redis/Memcached)
- Background job processing (Celery)
- API rate limiting and throttling
- CDN integration for static assets

## 📞 Support

For issues or questions, please refer to the API documentation at `/api/v1/docs/` when the backend is running.

