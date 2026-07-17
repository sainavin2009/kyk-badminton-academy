-- 1. Create table safely
CREATE TABLE IF NOT EXISTS public.homepage_statistics (
  id INTEGER PRIMARY KEY DEFAULT 1,
  coaches_number TEXT NOT NULL DEFAULT '3+',
  coaches_label TEXT NOT NULL DEFAULT 'Professional Coaches',
  courts_number TEXT NOT NULL DEFAULT '2',
  courts_label TEXT NOT NULL DEFAULT 'Courts',
  members_number TEXT NOT NULL DEFAULT '300+',
  members_label TEXT NOT NULL DEFAULT 'Active Members',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT one_row_only CHECK (id = 1)
);

-- 2. Insert initial data if not present
INSERT INTO public.homepage_statistics (id, coaches_number, coaches_label, courts_number, courts_label, members_number, members_label)
VALUES (1, '3+', 'Professional Coaches', '2', 'Courts', '300+', 'Active Members')
ON CONFLICT (id) DO NOTHING;

-- 3. Grants (These are safe to rerun)
GRANT SELECT ON TABLE public.homepage_statistics TO anon;
GRANT SELECT ON TABLE public.homepage_statistics TO authenticated;
GRANT ALL ON TABLE public.homepage_statistics TO service_role;
GRANT UPDATE ON TABLE public.homepage_statistics TO authenticated;

-- 4. RLS (Enable is safe to rerun)
ALTER TABLE public.homepage_statistics ENABLE ROW LEVEL SECURITY;

-- 5. Policies (Drop first to make rerunnable)
DROP POLICY IF EXISTS "Allow public read access" ON public.homepage_statistics;
CREATE POLICY "Allow public read access" ON public.homepage_statistics
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin update" ON public.homepage_statistics;
CREATE POLICY "Allow admin update" ON public.homepage_statistics
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('Super Admin', 'Admin')
  )
);