-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    qualification TEXT,
    experience TEXT,
    specialization TEXT,
    bio TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Data API Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.faculty TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.faculty TO authenticated;
GRANT SELECT ON TABLE public.faculty TO anon;

-- Enable RLS
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

-- Create Policies (Admin full access for authenticated users)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'faculty' AND policyname = 'Admin full access'
    ) THEN
        CREATE POLICY "Admin full access" ON public.faculty
        FOR ALL TO authenticated USING (true);
    END IF;
END $$;

-- Create Policy (Public read access for active members)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'faculty' AND policyname = 'Public read access'
    ) THEN
        CREATE POLICY "Public read access" ON public.faculty
        FOR SELECT TO anon USING (is_active = true);
    END IF;
END $$;