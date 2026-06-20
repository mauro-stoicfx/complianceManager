-- Create regulatory_changes table for Domain D8 (Regulatory Intelligence)
CREATE TABLE public.regulatory_changes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jurisdiction TEXT NOT NULL CHECK (jurisdiction IN ('FSCA', 'FSC Mauritius', 'Both')),
    source_url TEXT,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    impact_level TEXT NOT NULL CHECK (impact_level IN ('High', 'Medium', 'Low')),
    status TEXT NOT NULL DEFAULT 'Unreviewed' CHECK (status IN ('Unreviewed', 'Reviewed')),
    action_taken TEXT,
    affects_controls TEXT[] DEFAULT '{}'::TEXT[], -- Array of affected regulatory control IDs
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.regulatory_changes ENABLE ROW LEVEL SECURITY;

-- 1. All authenticated users can read regulatory changes
CREATE POLICY "Allow all authenticated users to read changes" ON public.regulatory_changes
    FOR SELECT USING (auth.role() = 'authenticated');

-- 2. All authenticated users can insert regulatory changes (including the automated cron runner)
CREATE POLICY "Allow all authenticated users to insert changes" ON public.regulatory_changes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Only Admins and Compliance Officers can update regulatory changes (perform reviews)
CREATE POLICY "Allow compliance officers and admins to update changes" ON public.regulatory_changes
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'compliance_officer')
        )
    );
