-- Drop foreign key constraints on uploaded_by and approved_by 
-- to allow simulated users (without Supabase Auth) during Phase 2 development.

ALTER TABLE public.evidence_files
DROP CONSTRAINT IF EXISTS evidence_files_uploaded_by_fkey,
DROP CONSTRAINT IF EXISTS evidence_files_approved_by_fkey;

-- We still want them to be UUIDs, but they won't enforce existence in auth.users.
