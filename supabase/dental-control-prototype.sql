-- Sitora Dental Control prototype schema blueprint
-- Synthetic/demo-first. Production rollout requires reviewed RLS, retention,
-- audit, residency, consent/legal-basis and connector-specific controls.

create extension if not exists pgcrypto;

create table if not exists dental_organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_code text not null default 'SA',
  timezone text not null default 'Asia/Riyadh',
  created_at timestamptz not null default now()
);

create table if not exists dental_branches (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  name text not null,
  city text,
  external_ref text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists dental_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  display_name text,
  role text not null check (role in ('executive','regional_manager','branch_manager','clinical_lead','dentist','insurance','finance','operations','viewer')),
  created_at timestamptz not null default now()
);

create table if not exists dental_profile_branches (
  user_id uuid not null references dental_profiles(user_id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  primary key (user_id, branch_id)
);

create table if not exists dental_modules (
  key text primary key,
  name text not null,
  description text,
  version text not null default '1.0'
);

create table if not exists dental_organisation_modules (
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  module_key text not null references dental_modules(key) on delete cascade,
  enabled boolean not null default true,
  settings jsonb not null default '{}'::jsonb,
  primary key (organisation_id, module_key)
);

create table if not exists dental_feature_flags (
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  flag_key text not null,
  enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  primary key (organisation_id, flag_key)
);

create table if not exists dental_clinicians (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid references dental_branches(id) on delete set null,
  external_ref text,
  display_name text not null,
  specialty text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists dental_chairs (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  external_ref text,
  label text not null,
  active boolean not null default true
);

create table if not exists dental_patients (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  external_ref text,
  pseudonym text,
  created_at timestamptz not null default now(),
  unique (organisation_id, external_ref)
);

create table if not exists dental_appointments (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  patient_id uuid references dental_patients(id) on delete set null,
  clinician_id uuid references dental_clinicians(id) on delete set null,
  chair_id uuid references dental_chairs(id) on delete set null,
  external_ref text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  status text not null,
  procedure_category text,
  revenue_minor bigint not null default 0,
  direct_cost_minor bigint not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists dental_treatment_plans (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  patient_id uuid references dental_patients(id) on delete set null,
  clinician_id uuid references dental_clinicians(id) on delete set null,
  external_ref text,
  status text not null,
  accepted_at timestamptz,
  total_value_minor bigint not null default 0,
  booked_value_minor bigint not null default 0,
  next_appointment_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists dental_claims (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  patient_id uuid references dental_patients(id) on delete set null,
  external_ref text,
  insurer_ref text,
  status text not null,
  procedure_code text,
  value_minor bigint not null default 0,
  exception_code text,
  exception_reason text,
  submitted_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists dental_clinical_records (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid not null references dental_branches(id) on delete cascade,
  patient_id uuid references dental_patients(id) on delete set null,
  clinician_id uuid references dental_clinicians(id) on delete set null,
  appointment_id uuid references dental_appointments(id) on delete set null,
  external_ref text,
  procedure_type text,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists dental_governance_checks (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  record_id uuid not null references dental_clinical_records(id) on delete cascade,
  rule_key text not null,
  rule_version text not null,
  status text not null check (status in ('pass','review','not_applicable')),
  evidence jsonb not null default '{}'::jsonb,
  checked_at timestamptz not null default now()
);

create table if not exists dental_alerts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid references dental_branches(id) on delete set null,
  source_module text not null,
  severity text not null,
  title text not null,
  detail text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists dental_actions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid references dental_branches(id) on delete set null,
  source_module text not null,
  source_entity_type text,
  source_entity_id uuid,
  title text not null,
  priority text not null,
  status text not null default 'open',
  assigned_user_id uuid references dental_profiles(user_id) on delete set null,
  due_at timestamptz,
  resolution_note text,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

-- Canonical event layer: production connectors write normalized events once;
-- present and future modules can consume them independently.
create table if not exists dental_events (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references dental_organisations(id) on delete cascade,
  branch_id uuid references dental_branches(id) on delete set null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  connector_key text,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists dental_events_org_type_time_idx on dental_events (organisation_id, event_type, occurred_at desc);
create index if not exists dental_claims_org_status_idx on dental_claims (organisation_id, status);
create index if not exists dental_actions_org_status_due_idx on dental_actions (organisation_id, status, due_at);
create index if not exists dental_appointments_branch_time_idx on dental_appointments (branch_id, starts_at);

insert into dental_modules (key, name, description) values
  ('control_tower', 'Control Tower', 'Executive group intelligence'),
  ('revenue', 'Revenue Intelligence', 'Treatment opportunity and capacity intelligence'),
  ('claims', 'Claims Intelligence', 'Claims exception and pattern intelligence'),
  ('record_guardian', 'Record Guardian', 'Documentation completeness governance'),
  ('actions', 'Action Centre', 'Cross-module accountable work queue'),
  ('ask_sitora', 'Ask Sitora', 'Natural-language executive intelligence')
on conflict (key) do nothing;

-- RLS is intentionally not enabled here because this is a schema blueprint,
-- not a production migration. Production engineering must implement and test
-- tenant + branch scoped RLS before any live healthcare data is introduced.
