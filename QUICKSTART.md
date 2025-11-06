# Quick Start Guide - Student Management System

Get the application running in 5 minutes!

## Prerequisites
- Python 3.10+ installed
- Node.js 18+ installed
- Terminal/Command Prompt

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed demo data (creates admin, teacher, student users)
python manage.py seed_demo

# Start backend server
python manage.py runserver
```

✅ Backend is now running at `http://localhost:8000`

## Step 2: Frontend Setup (2 minutes)

Open a **new terminal window** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend is now running at `http://localhost:5173`

## Step 3: Login and Explore (1 minute)

Open your browser and go to: `http://localhost:5173`

### Demo Accounts

| Role | Username | Password | What You Can Do |
|------|----------|----------|-----------------|
| **Admin** | `admin` | `admin123` | Manage users, courses, view all data |
| **Teacher** | `teacher` | `teacher123` | View courses, assign grades |
| **Student** | `student` | `student123` | View enrollments and grades |

## What to Try

### As Admin
1. Login with `admin` / `admin123`
2. Click "User Management" to create new users
3. Click "Course Management" to create new courses
4. View all system data

### As Teacher
1. Login with `teacher` / `teacher123`
2. View "My Courses" (CS101, MA101)
3. Click "Manage Grades" to assign grades
4. Try assigning a grade to the student

### As Student
1. Login with `student` / `student123`
2. View "My Enrollments" (enrolled in CS101 and MA101)
3. See your grades (A in CS101, B in MA101)
4. Try enrolling in another course (if available)

## API Documentation

While the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/api/v1/docs/`
- **OpenAPI Schema**: `http://localhost:8000/api/v1/schema/`

## Troubleshooting

### Backend won't start
- Make sure virtual environment is activated
- Check if port 8000 is already in use
- Verify all dependencies installed: `pip list`

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is already in use
- Clear npm cache: `npm cache clean --force`

### Can't login
- Make sure you ran `python manage.py seed_demo`
- Check backend is running at `http://localhost:8000`
- Check browser console for errors (F12)

### CORS errors
- Verify backend `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173`
- Check Vite proxy configuration in `vite.config.ts`

## Next Steps

1. **Explore the Code**
   - Backend: `backend/students/` - models, views, serializers
   - Frontend: `frontend/src/` - components, pages, forms

2. **Run Tests**
   ```bash
   cd backend
   pytest
   ```

3. **Create Your Own Data**
   - Login as admin
   - Create new users, courses, enrollments
   - Assign grades as teacher

4. **Customize**
   - Modify models in `backend/students/models.py`
   - Update UI in `frontend/src/pages/`
   - Add new features!

## Development Workflow

### Making Backend Changes
1. Edit code in `backend/students/`
2. If models changed: `python manage.py makemigrations && python manage.py migrate`
3. Server auto-reloads on file changes
4. Run tests: `pytest`

### Making Frontend Changes
1. Edit code in `frontend/src/`
2. Vite hot-reloads automatically
3. Check browser console for errors
4. Build for production: `npm run build`

## Common Tasks

### Create a new admin user manually
```bash
cd backend
python manage.py createsuperuser
```

### Reset database
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py seed_demo
```

### Export data
Login as admin and use the export endpoints:
- Students CSV: `http://localhost:8000/api/v1/exports/students/`
- Grades CSV: `http://localhost:8000/api/v1/exports/grades/`

## Support

For detailed documentation, see `README.md`

For file structure, see `FILE_LIST.md`

Happy coding! 🚀

