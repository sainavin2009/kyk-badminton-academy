-- Create gallery_items table
CREATE TABLE public.gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  storage_path TEXT,
  type TEXT NOT NULL, -- 'image' or 'video'
  title TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL, -- 'Badminton', 'CrossFit', 'Events', 'Academy'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.gallery_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.gallery_items TO service_role;
GRANT SELECT ON TABLE public.gallery_items TO anon;

-- Database Policies
CREATE POLICY "gallery_read_policy" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "gallery_admin_policy" ON public.gallery_items TO authenticated USING (true) WITH CHECK (true);

-- Note: Please ensure a storage bucket named 'gallery' is created in your Supabase console.
-- After creating the bucket, you can apply these policies for storage access:
-- 1. SELECT: true (Public)
-- 2. INSERT/UPDATE/DELETE: auth.role() = 'authenticated'