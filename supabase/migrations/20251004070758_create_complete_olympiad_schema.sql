/*
  # Complete Bangladesh Olympiad Database Schema

  ## Overview
  This migration creates a complete database schema for the Bangladesh Olympiad platform, including:
  - User management with role-based access control (admin, moderator, participant)
  - Exam management with questions, registrations, and submissions
  - Results tracking with rankings and leaderboards
  - University/institution tracking
  - Notifications and analytics

  ## Tables Created

  ### 1. profiles
  - Extends auth.users with additional profile information
  - Stores user details: name, phone, university, role, status
  - Links to auth.users via id (foreign key)

  ### 2. universities
  - Stores institution/university information
  - Used for participant affiliation

  ### 3. exams
  - Main exam definitions with title, description, dates
  - Tracks status (draft, published, ongoing, completed)
  - Includes capacity limits and exam type

  ### 4. questions
  - Question bank for exams
  - Supports multiple question types (multiple_choice, true_false, short_answer, essay)
  - Includes correct answers and point values

  ### 5. exam_registrations
  - Tracks participant registrations for exams
  - Includes approval workflow (pending, approved, rejected)

  ### 6. exam_submissions
  - Stores participant answers during exams
  - Tracks completion status and timestamps

  ### 7. exam_results
  - Final results after grading
  - Includes scores, rankings, and feedback

  ### 8. notifications
  - System notifications for users
  - Tracks read status

  ### 9. leaderboard
  - Overall user rankings and statistics
  - Aggregated performance metrics

  ## Security
  - RLS enabled on all tables
  - Policies restrict data access based on user roles
  - Admin and moderator roles have elevated permissions
  - Participants can only access their own data

  ## Notes
  - All timestamps use timestamptz for proper timezone handling
  - Foreign keys ensure referential integrity
  - Indexes added for frequently queried columns
  - Default values set for boolean and timestamp fields
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universities/Institutions Table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE,
  location text,
  type text DEFAULT 'university',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  university_id uuid REFERENCES universities(id),
  institution text,
  role text NOT NULL DEFAULT 'participant' CHECK (role IN ('admin', 'moderator', 'participant')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
  avatar_url text,
  date_of_birth date,
  address text,
  registration_date timestamptz DEFAULT now(),
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exams Table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  exam_type text DEFAULT 'olympiad' CHECK (exam_type IN ('olympiad', 'preliminary', 'final', 'practice')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'ongoing', 'completed', 'cancelled')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 120,
  total_marks integer DEFAULT 100,
  passing_marks integer DEFAULT 40,
  capacity integer,
  registration_deadline timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
  options jsonb,
  correct_answer text,
  points integer DEFAULT 1,
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  order_number integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exam Registrations Table
CREATE TABLE IF NOT EXISTS exam_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  registration_date timestamptz DEFAULT now(),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, participant_id)
);

-- Exam Submissions Table
CREATE TABLE IF NOT EXISTS exam_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  answer text,
  is_correct boolean,
  points_earned integer DEFAULT 0,
  time_taken integer,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, participant_id, question_id)
);

-- Exam Results Table
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_score integer DEFAULT 0,
  percentage numeric(5,2),
  rank integer,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'withheld')),
  feedback text,
  graded_by uuid REFERENCES auth.users(id),
  graded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, participant_id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now()
);

-- Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_exams integer DEFAULT 0,
  total_score integer DEFAULT 0,
  average_score numeric(5,2) DEFAULT 0,
  rank integer,
  badges jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_university ON profiles(university_id);
CREATE INDEX IF NOT EXISTS idx_exams_status ON exams(status);
CREATE INDEX IF NOT EXISTS idx_exams_dates ON exams(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_registrations_exam ON exam_registrations(exam_id);
CREATE INDEX IF NOT EXISTS idx_registrations_participant ON exam_registrations(participant_id);
CREATE INDEX IF NOT EXISTS idx_submissions_exam_participant ON exam_submissions(exam_id, participant_id);
CREATE INDEX IF NOT EXISTS idx_results_exam ON exam_results(exam_id);
CREATE INDEX IF NOT EXISTS idx_results_participant ON exam_results(participant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard(rank);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for universities
CREATE POLICY "Anyone can view universities"
  ON universities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage universities"
  ON universities FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for exams
CREATE POLICY "Authenticated users can view published exams"
  ON exams FOR SELECT
  TO authenticated
  USING (status IN ('published', 'ongoing', 'completed'));

CREATE POLICY "Admins and moderators can view all exams"
  ON exams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage all exams"
  ON exams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Moderators can create and update exams"
  ON exams FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Moderators can update exams"
  ON exams FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for questions
CREATE POLICY "Participants can view questions for registered exams"
  ON questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM exam_registrations
      WHERE exam_registrations.exam_id = questions.exam_id
      AND exam_registrations.participant_id = auth.uid()
      AND exam_registrations.status = 'approved'
    )
  );

CREATE POLICY "Moderators and admins can manage questions"
  ON questions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for exam_registrations
CREATE POLICY "Participants can view own registrations"
  ON exam_registrations FOR SELECT
  TO authenticated
  USING (participant_id = auth.uid());

CREATE POLICY "Participants can create registrations"
  ON exam_registrations FOR INSERT
  TO authenticated
  WITH CHECK (participant_id = auth.uid());

CREATE POLICY "Admins can view all registrations"
  ON exam_registrations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage all registrations"
  ON exam_registrations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for exam_submissions
CREATE POLICY "Participants can view own submissions"
  ON exam_submissions FOR SELECT
  TO authenticated
  USING (participant_id = auth.uid());

CREATE POLICY "Participants can create submissions"
  ON exam_submissions FOR INSERT
  TO authenticated
  WITH CHECK (
    participant_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM exam_registrations
      WHERE exam_registrations.exam_id = exam_submissions.exam_id
      AND exam_registrations.participant_id = auth.uid()
      AND exam_registrations.status = 'approved'
    )
  );

CREATE POLICY "Moderators can view all submissions"
  ON exam_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Moderators can grade submissions"
  ON exam_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for exam_results
CREATE POLICY "Participants can view own published results"
  ON exam_results FOR SELECT
  TO authenticated
  USING (
    participant_id = auth.uid() AND status = 'published'
  );

CREATE POLICY "Moderators and admins can view all results"
  ON exam_results FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Moderators can manage results"
  ON exam_results FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins and moderators can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- RLS Policies for leaderboard
CREATE POLICY "Authenticated users can view leaderboard"
  ON leaderboard FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can update leaderboard"
  ON leaderboard FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Insert sample universities
INSERT INTO universities (name, code, location, type) VALUES
  ('University of Dhaka', 'DU', 'Dhaka', 'university'),
  ('Bangladesh University of Engineering and Technology', 'BUET', 'Dhaka', 'university'),
  ('Jahangirnagar University', 'JU', 'Savar', 'university'),
  ('Rajshahi University', 'RU', 'Rajshahi', 'university'),
  ('Chittagong University', 'CU', 'Chittagong', 'university')
ON CONFLICT (code) DO NOTHING;