/*
  # Create Dovvia Still Database Tables

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the contact
      - `email` (text, required) - Email address
      - `phone` (text, required) - Phone number
      - `subject` (text, required) - Subject/inquiry type
      - `message` (text, required) - Message content
      - `status` (text, default 'new') - Processing status
      - `created_at` (timestamptz) - Submission timestamp

    - `distributor_inquiries`
      - `id` (uuid, primary key)
      - `business_name` (text, required) - Business or individual name
      - `contact_name` (text, required) - Contact person name
      - `email` (text, required) - Email address
      - `phone` (text, required) - Phone number
      - `whatsapp` (text) - WhatsApp number
      - `location` (text, required) - Location/Territory
      - `business_type` (text) - Type of business
      - `expected_volume` (text) - Expected monthly volume
      - `message` (text) - Additional information
      - `status` (text, default 'new') - Processing status
      - `created_at` (timestamptz) - Submission timestamp

    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required) - Subscriber email
      - `active` (boolean, default true) - Subscription status
      - `subscribed_at` (timestamptz) - Subscription timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for anonymous users to insert data
    - Admin read access only
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit contact forms
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create distributor_inquiries table
CREATE TABLE IF NOT EXISTS distributor_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  location text NOT NULL,
  business_type text,
  expected_volume text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE distributor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit distributor inquiries
CREATE POLICY "Anyone can submit distributor inquiries"
  ON distributor_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_distributor_inquiries_created_at ON distributor_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_distributor_inquiries_status ON distributor_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);