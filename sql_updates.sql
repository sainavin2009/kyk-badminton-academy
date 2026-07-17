-- Add visibility and updated_at columns
ALTER TABLE public.gallery_items 
ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing items to have Badminton as default if empty
UPDATE public.gallery_items SET category = 'Badminton' WHERE category IS NULL;