/*
  # Create Scholarship Applications Table

  1. New Tables
    - `scholarship_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `full_name` (text) - Applicant's full name
      - `email` (text) - Applicant's email address
      - `phone` (text) - Applicant's phone number
      - `school` (text) - Name of school/university
      - `year` (text) - Academic year (e.g., "2024", "2025")
      - `grade_level` (text) - Current grade/class level
      - `gpa` (text) - Grade point average or equivalent
      - `essay` (text) - Scholarship essay/motivation letter
      - `image_url` (text) - URL to uploaded applicant photo
      - `document_url` (text) - URL to uploaded documents (transcripts, etc.)
      - `status` (text) - Application status: 'processing', 'failed', 'successful'
      - `created_at` (timestamptz) - Application submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `scholarship_applications` table
    - Add policy for public to insert applications (anyone can apply)
    - Add policy for public to read successful applications only
    - Admin access would require additional policies based on auth setup

  3. Indexes
    - Index on status for fast filtering
    - Index on year for fast filtering by academic year
    - Index on school for search functionality
*/

-- Create scholarship_applications table
CREATE TABLE IF NOT EXISTS scholarship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  school text NOT NULL,
  year text NOT NULL,
  grade_level text NOT NULL,
  gpa text DEFAULT '',
  essay text NOT NULL,
  image_url text DEFAULT '',
  document_url text DEFAULT '',
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'failed', 'successful')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scholarship_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit applications
CREATE POLICY "Anyone can submit scholarship applications"
  ON scholarship_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Anyone can view successful applications
CREATE POLICY "Anyone can view successful scholarship applications"
  ON scholarship_applications
  FOR SELECT
  TO anon
  USING (status = 'successful');

-- Policy: Authenticated users can view all applications (for admin purposes)
CREATE POLICY "Authenticated users can view all applications"
  ON scholarship_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update applications (for admin purposes)
CREATE POLICY "Authenticated users can update applications"
  ON scholarship_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scholarship_applications_status 
  ON scholarship_applications(status);

CREATE INDEX IF NOT EXISTS idx_scholarship_applications_year 
  ON scholarship_applications(year);

CREATE INDEX IF NOT EXISTS idx_scholarship_applications_school 
  ON scholarship_applications(school);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_scholarship_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS scholarship_applications_updated_at ON scholarship_applications;
CREATE TRIGGER scholarship_applications_updated_at
  BEFORE UPDATE ON scholarship_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_scholarship_applications_updated_at();