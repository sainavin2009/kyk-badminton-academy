-- 1. Ensure table exists and has all required columns
CREATE TABLE IF NOT EXISTS public.batch_timings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    batch_name TEXT NOT NULL,
    age_group TEXT NOT NULL,
    days TEXT NOT NULL,
    timings TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Grant explicit API access
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.batch_timings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.batch_timings TO service_role;
GRANT SELECT ON TABLE public.batch_timings TO anon;

-- 3. Enable RLS
ALTER TABLE public.batch_timings ENABLE ROW LEVEL SECURITY;

-- 4. Create secure policies
DROP POLICY IF EXISTS "Public can read batch timings" ON public.batch_timings;
CREATE POLICY "Public can read batch timings" ON public.batch_timings
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage batch timings" ON public.batch_timings;
CREATE POLICY "Admins manage batch timings" ON public.batch_timings
FOR ALL TO authenticated 
USING (
    EXISTS ( 
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('Super Admin', 'Admin')
    )
)
WITH CHECK (
    EXISTS ( 
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('Super Admin', 'Admin')
    )
);