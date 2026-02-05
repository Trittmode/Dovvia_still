/*
  # Create Analytics Tracking Table

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key) - Unique identifier for each page view
      - `page_path` (text) - The page URL path visited
      - `page_title` (text) - The page title
      - `referrer` (text) - Where the visitor came from
      - `user_agent` (text) - Browser user agent string
      - `device_type` (text) - mobile, tablet, or desktop
      - `browser` (text) - Browser name
      - `os` (text) - Operating system
      - `country` (text) - Visitor country
      - `city` (text) - Visitor city
      - `region` (text) - Visitor region/state
      - `ip_address` (text) - Visitor IP address
      - `latitude` (text) - Geographic latitude
      - `longitude` (text) - Geographic longitude
      - `session_id` (text) - Session identifier
      - `screen_width` (integer) - Screen width
      - `screen_height` (integer) - Screen height
      - `language` (text) - Browser language
      - `timezone` (text) - User timezone
      - `created_at` (timestamptz) - Visit timestamp

  2. Security
    - Enable RLS on `page_views` table
    - Add policy for public to insert analytics data (anonymous tracking)
    - Add policy for authenticated users to read all analytics data (admin access)

  3. Indexes
    - Index on page_path for fast filtering by page
    - Index on country for geographic analysis
    - Index on device_type for device analytics
    - Index on created_at for time-based queries

  4. Important Notes
    - This table enables comprehensive user behavior tracking
    - Data can be analyzed from Vercel or any analytics dashboard
    - IP addresses are stored but can be anonymized for privacy compliance
    - All data collection is anonymous and for legitimate analytics purposes
*/

-- Create page_views table for analytics tracking
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  page_title text DEFAULT '',
  referrer text DEFAULT '',
  user_agent text DEFAULT '',
  device_type text DEFAULT '',
  browser text DEFAULT '',
  os text DEFAULT '',
  country text DEFAULT '',
  city text DEFAULT '',
  region text DEFAULT '',
  ip_address text DEFAULT '',
  latitude text DEFAULT '',
  longitude text DEFAULT '',
  session_id text DEFAULT '',
  screen_width integer DEFAULT 0,
  screen_height integer DEFAULT 0,
  language text DEFAULT '',
  timezone text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert analytics data
CREATE POLICY "Anyone can insert page view analytics"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can view all analytics (admin)
CREATE POLICY "Authenticated users can view all analytics"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_page_path 
  ON page_views(page_path);

CREATE INDEX IF NOT EXISTS idx_page_views_country 
  ON page_views(country);

CREATE INDEX IF NOT EXISTS idx_page_views_device_type 
  ON page_views(device_type);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at 
  ON page_views(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_page_views_session_id 
  ON page_views(session_id);

-- Create a view for daily analytics summary
CREATE OR REPLACE VIEW daily_analytics AS
SELECT 
  DATE(created_at) as date,
  page_path,
  country,
  device_type,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_sessions
FROM page_views
GROUP BY DATE(created_at), page_path, country, device_type
ORDER BY date DESC, views DESC;

-- Grant access to the view
ALTER VIEW daily_analytics OWNER TO postgres;
GRANT SELECT ON daily_analytics TO authenticated;