-- Create evidence_files table linked to regulatory_controls and auth.users
CREATE TABLE public.evidence_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id TEXT REFERENCES public.regulatory_controls(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Supabase Storage path
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    validity_date DATE, -- Expiration date of the evidence document
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on evidence_files
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;

-- Evidence files policies
-- 1. Any authenticated user can read evidence file metadata
CREATE POLICY "Allow all authenticated users to read evidence" ON public.evidence_files
    FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Any authenticated user can upload evidence
CREATE POLICY "Allow all authenticated users to insert evidence" ON public.evidence_files
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Only Admin and Compliance Officer can update evidence files (for review status changes)
CREATE POLICY "Allow compliance officers and admins to update evidence" ON public.evidence_files
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'compliance_officer')
        )
    );

-- 4. Only Admin and Compliance Officer can delete evidence
CREATE POLICY "Allow compliance officers and admins to delete evidence" ON public.evidence_files
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'compliance_officer')
        )
    );

-- Note: Storage buckets and objects can be configured in Supabase.
-- Bucket creation script for Supabase Storage (run in SQL Editor or handled in Edge)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('compliance-evidence', 'compliance-evidence', false);
-- Check policies on storage.objects for authenticated read/write.
