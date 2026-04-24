-- Ten 2 Ten Stereo — Supabase schema
-- Run this inside the SQL editor of a fresh Supabase project.

-- ----------  Profiles (extends auth.users)  ----------
create table if not exists profiles (
  id uuid references auth.users primary key,
  role text default 'admin',
  name text,
  email text,
  created_at timestamptz default now()
);

-- ----------  Pages  ----------
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  meta_description text,
  hero_heading text,
  hero_subheading text,
  hero_cta_text text,
  body_content jsonb,
  updated_at timestamptz default now()
);

-- ----------  Services  ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text,
  full_description text,
  icon text,
  display_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- ----------  Leads  ----------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  service text,
  message text,
  source_page text,
  status text default 'new',  -- new | contacted | converted | closed
  notes text,
  created_at timestamptz default now()
);

create index if not exists leads_status_idx on leads(status);
create index if not exists leads_created_idx on leads(created_at desc);

-- ----------  Media  ----------
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  file_name text,
  storage_path text,
  url text,
  alt_text text,
  width integer,
  height integer,
  uploaded_at timestamptz default now()
);

-- ----------  Settings  ----------
create table if not exists settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- ----------  Seed  ----------
insert into settings (key, value) values
  ('business_name', 'Ten 2 Ten Stereo'),
  ('phone', '(626) 858-2777'),
  ('email', 'petermichelboshra@icloud.com'),
  ('address', 'Azusa, CA 91702'),
  ('tagline', 'Car audio. Done right. Since day one.'),
  ('hours_weekdays', 'Monday - Saturday: 9AM - 7PM'),
  ('hours_sunday', 'Sunday: 10AM - 6PM')
on conflict (key) do nothing;

insert into services (slug, name, short_description, display_order) values
  ('car-stereo-installation', 'Car Stereo Installation', 'Precision head-unit, speaker, sub, and amp installs with factory-finish fit.', 1),
  ('vehicle-wraps', 'Vehicle Wraps', 'Full color changes, commercial branding, and paint-protection wraps.', 2),
  ('tire-installation', 'Tire Installation', 'Mount, balance, and road-test every wheel.', 3),
  ('car-security-systems', 'Car Security Systems', 'Smart alarms, remote start, GPS tracking.', 4),
  ('led-headlights', 'LED Headlights', 'Brighter, whiter, safer nighttime driving.', 5),
  ('window-tinting', 'Window Tinting', 'Heat rejection, UV protection, and privacy.', 6)
on conflict (slug) do nothing;

insert into pages (slug, title, hero_heading, hero_subheading, hero_cta_text) values
  ('home', 'Home', 'Car audio. Done right.', 'San Gabriel Valley''s most-recommended install shop.', 'Call (626) 858-2777'),
  ('services', 'Services', 'Everything your ride needs.', 'Full service menu for the SGV.', 'Get a Quote'),
  ('our-work', 'Our Work', 'Some of our recent work.', 'Every photo is a real customer install.', 'Book Your Install'),
  ('about', 'About', 'One shop. One crew. Fifteen years.', 'Locally owned & operated in Azusa.', 'Stop By'),
  ('contact', 'Contact', 'Call. Stop in. Or send a note.', 'Real quotes. Real people. Real fast.', 'Send Message')
on conflict (slug) do nothing;

-- ----------  Row Level Security  ----------
alter table profiles enable row level security;
alter table pages enable row level security;
alter table services enable row level security;
alter table leads enable row level security;
alter table media enable row level security;
alter table settings enable row level security;

-- Allow authenticated admins full access
create policy "admin_read_profiles" on profiles for select using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "admin_write_profiles" on profiles for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "admin_all_pages" on pages for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "public_read_pages" on pages for select using (true);

create policy "admin_all_services" on services for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "public_read_services" on services for select using (active = true);

create policy "admin_all_leads" on leads for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "public_insert_leads" on leads for insert with check (true);

create policy "admin_all_media" on media for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "public_read_media" on media for select using (true);

create policy "admin_all_settings" on settings for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "public_read_settings" on settings for select using (true);
