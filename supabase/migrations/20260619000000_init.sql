-- Create profiles table linked to Supabase Auth users
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'team_member' CHECK (role IN ('admin', 'compliance_officer', 'team_member')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create regulatory_controls table (The Regulatory Universe)
CREATE TABLE public.regulatory_controls (
    id TEXT PRIMARY KEY, -- e.g., 'D1-F01', 'D3-M02'
    domain TEXT NOT NULL, -- e.g., 'D1 — Licenciamiento y gobierno corporativo'
    jurisdiction TEXT NOT NULL CHECK (jurisdiction IN ('FSCA', 'FSC Mauritius', 'Ambas')),
    source_regulation TEXT NOT NULL,
    description TEXT NOT NULL,
    frequency TEXT NOT NULL CHECK (frequency IN ('Única', 'Continua', 'Mensual', 'Trimestral', 'Semestral', 'Anual', 'Por evento')),
    specific_deadline TEXT,
    responsible_person TEXT NOT NULL,
    required_evidence TEXT NOT NULL,
    next_due_date DATE,
    status TEXT NOT NULL DEFAULT 'En progreso' CHECK (status IN ('Compliant', 'En progreso', 'En riesgo', 'Incumplido')),
    maturity_level INTEGER NOT NULL DEFAULT 1 CHECK (maturity_level BETWEEN 0 AND 5),
    maturity_justification TEXT NOT NULL DEFAULT 'Initial state — pending first assessment',
    evidence_file_path TEXT,
    last_reviewed DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on regulatory_controls
ALTER TABLE public.regulatory_controls ENABLE ROW LEVEL SECURITY;

-- Regulatory controls policies
CREATE POLICY "Allow all logged in users to read controls" ON public.regulatory_controls
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow compliance officers and admins to insert/update controls" ON public.regulatory_controls
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'compliance_officer')
        )
    );

-- Trigger to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        COALESCE(new.raw_user_meta_data->>'role', 'team_member')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
