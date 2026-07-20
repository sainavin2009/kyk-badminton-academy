-- Add missing columns to site_settings table
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS hero_card_image_url TEXT,
ADD COLUMN IF NOT EXISTS hero_card_title TEXT DEFAULT 'Elite Training Session',
ADD COLUMN IF NOT EXISTS programs_hero_title TEXT DEFAULT 'MASTER THE GAME',
ADD COLUMN IF NOT EXISTS programs_hero_subtitle TEXT DEFAULT 'From beginners to competitive athletes, KYK Badminton Academy provides structured coaching for all ages.';

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';