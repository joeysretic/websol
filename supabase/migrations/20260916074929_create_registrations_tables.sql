/*
# Create registration tables for Little Wonders

1. New Tables
- `event_registrations` — stores event/wedding childcare registration form submissions
  - `parent_registrations` — stores parent/family childcare registration form submissions
2. Security
- Enable RLS on both tables
- Allow anon + authenticated INSERT only (public forms, no login required)
- No SELECT/UPDATE/DELETE from the frontend (data is private to the business owner)
*/

CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Event details
  event_type text NOT NULL DEFAULT 'Wedding',
  event_date date,
  event_start_time text,
  event_end_time text,
  event_venue_name text,
  event_venue_address text,
  event_city text,
  -- Contact
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  -- Children & care
  number_of_children integer DEFAULT 0,
  children_ages text,
  care_hours text,
  additional_info text,
  -- Meta
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_event_reg" ON event_registrations;
CREATE POLICY "anon_insert_event_reg"
ON event_registrations FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS parent_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Parent details
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text,
  parent_address text,
  -- Children
  number_of_children integer DEFAULT 0,
  children_details text,
  -- Care needs
  care_type text,
  preferred_date date,
  additional_info text,
  -- Meta
  created_at timestamptz DEFAULT now()
);

ALTER TABLE parent_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_parent_reg" ON parent_registrations;
CREATE POLICY "anon_insert_parent_reg"
ON parent_registrations FOR INSERT
TO anon, authenticated WITH CHECK (true);
