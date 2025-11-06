export type Role = 'base' | 'student' | 'teacher' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface StudentProfile {
  id: number;
  user: User;
  enrollment_number: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherProfile {
  id: number;
  user: User;
  department: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  teacher: number | null;
  teacher_detail?: TeacherProfile;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: number;
  student: number;
  student_detail?: StudentProfile;
  course: number;
  course_detail?: Course;
  enrolled_at: string;
  created_at: string;
  updated_at: string;
}

export type GradeValue = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Grade {
  id: number;
  student: number;
  student_detail?: StudentProfile;
  course: number;
  course_detail?: Course;
  teacher: number | null;
  teacher_detail?: TeacherProfile;
  value: GradeValue;
  graded_at: string;
  created_at: string;
  updated_at: string;
}

export interface CurrentUser extends User {
  student_profile?: StudentProfile;
  teacher_profile?: TeacherProfile;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  password2: string;
  role: Role;
  first_name?: string;
  last_name?: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  role?: Role;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface StudentProfileUpdate {
  enrollment_number?: string;
  date_of_birth?: string;
  phone_number?: string;
  address?: string;
}

export interface TeacherProfileUpdate {
  department?: string;
}

export interface CourseCreate {
  title: string;
  code: string;
  description?: string;
  teacher_id?: number;
  is_active?: boolean;
}

export interface EnrollmentCreate {
  student_id?: number;
  course_id: number;
}

export interface GradeCreate {
  student_id: number;
  course_id: number;
  teacher_id?: number;
  value: GradeValue;
}

