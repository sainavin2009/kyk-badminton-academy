-- Add new columns for the hero floating card
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS hero_card_image_url TEXT,
ADD COLUMN IF NOT EXISTS hero_card_title TEXT DEFAULT 'Elite Training Session';

-- Refresh the grants to ensure API access
GRANT SELECT, UPDATE ON TABLE public.site_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.site_settings TO service_role;
GRANT SELECT ON TABLE public.site_settings TO anon;