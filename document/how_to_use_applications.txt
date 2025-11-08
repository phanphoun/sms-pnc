# How to Use the Student Management System Applications

## Overview
The Student Management System (SMS) is a full-stack web application for managing educational institutions. It consists of a Django backend API and a React frontend interface with role-based access control.

## Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Seed demo data (optional but recommended):
   ```
   python manage.py seed_demo
   ```
   This creates demo accounts:
   - Admin: admin / admin123
   - Teacher: teacher / teacher123
   - Student: student / student123

6. Run the development server:
   ```
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment file:
   ```
   cp .env.example .env
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

## Using the Application

### Authentication
- Access the frontend at `http://localhost:5173`
- Login with demo credentials
- The system supports role-based access: Admin, Teacher, Student

### Admin Features
- Manage users, courses, and system data
- Export reports (students, grades) to CSV
- View and edit user profiles and course details

### Teacher Features
- Manage assigned courses
- Assign and update grades for students

### Student Features
- View personal profile and grades
- Enroll in available courses

### API Documentation
- Access Swagger UI at `http://localhost:8000/api/v1/docs/`
- OpenAPI schema at `http://localhost:8000/api/v1/schema/`

## Reporting
The system includes CSV export functionality for reports:
- Students export (admin only): `GET /api/v1/exports/students/`
- Grades export (admin only): `GET /api/v1/exports/grades/?course_id={id}`

## Support
For additional help, visit the help page at `http://localhost:5173/help` or refer to the API documentation.
