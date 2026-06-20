
-- Create evidence_files table (safe/idempotent version)
CREATE TABLE IF NOT EXISTS public.evidence_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id TEXT REFERENCES public.regulatory_controls(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    validity_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;

-- Policies (safe - skip if already exists)
DO $$
BEGIN
    -- Policy 1: Read
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evidence_files' AND policyname = 'Allow all authenticated users to read evidence'
    ) THEN
        CREATE POLICY "Allow all authenticated users to read evidence" ON public.evidence_files
            FOR SELECT USING (auth.role() = 'authenticated');
    END IF;

    -- Policy 2: Insert
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evidence_files' AND policyname = 'Allow all authenticated users to insert evidence'
    ) THEN
        CREATE POLICY "Allow all authenticated users to insert evidence" ON public.evidence_files
            FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;

    -- Policy 3: Update (admins/compliance officers only)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evidence_files' AND policyname = 'Allow compliance officers and admins to update evidence'
    ) THEN
        CREATE POLICY "Allow compliance officers and admins to update evidence" ON public.evidence_files
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM public.profiles
                    WHERE profiles.id = auth.uid()
                    AND profiles.role IN ('admin', 'compliance_officer')
                )
            );
    END IF;

    -- Policy 4: Delete (admins/compliance officers only)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evidence_files' AND policyname = 'Allow compliance officers and admins to delete evidence'
    ) THEN
        CREATE POLICY "Allow compliance officers and admins to delete evidence" ON public.evidence_files
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM public.profiles
                    WHERE profiles.id = auth.uid()
                    AND profiles.role IN ('admin', 'compliance_officer')
                )
            );
    END IF;
END $$;

-- Create Supabase Storage bucket for compliance evidence (safe)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'compliance-evidence',
    'compliance-evidence',
    false,
    52428800,  -- 50MB max per file
    ARRAY['application/pdf', 'image/png', 'image/jpeg', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for compliance-evidence bucket (safe)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload evidence'
    ) THEN
        CREATE POLICY "Authenticated users can upload evidence"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'compliance-evidence');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can read evidence'
    ) THEN
        CREATE POLICY "Authenticated users can read evidence"
        ON storage.objects FOR SELECT
        TO authenticated
        USING (bucket_id = 'compliance-evidence');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Admins can delete evidence files'
    ) THEN
        CREATE POLICY "Admins can delete evidence files"
        ON storage.objects FOR DELETE
        TO authenticated
        USING (
            bucket_id = 'compliance-evidence' AND
            EXISTS (
                SELECT 1 FROM public.profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role IN ('admin', 'compliance_officer')
            )
        );
    END IF;
END $$;
