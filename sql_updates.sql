-- Update Homepage Statistics
UPDATE public.homepage_statistics 
SET 
  coaches_number = '3+', 
  coaches_label = 'Professional Coaches',
  courts_number = '2', 
  courts_label = 'Courts',
  members_number = '300+', 
  members_label = 'Active Members'
WHERE id = 1;

-- Update Site Settings
UPDATE public.site_settings
SET
  hero_subheading = 'Professional Badminton & CrossFit Training for Kids, Adults and Competitive Players.',
  about_heading = 'Forging the Next Generation of Athletes',
  about_content = 'We provide professional coaching for kids and adults using NS-NIS certified scientific training methods. Our programs focus on physical fitness, agility development, technical footwork, and structured progression for every skill level on international standard synthetic courts.',
  address = 'No. 65, Appasamy Street, Poompuhar Nagar East Extension, Kolathur, Chennai – 600099',
  phone = '+91 93639 78810',
  whatsapp = '919363978810'
WHERE id = 1;

-- Update Core Programs to match the requested batches
UPDATE public.programs SET
  title = 'Beginner Batch',
  description = 'Foundational training for kids and adults. Focus on technique, footwork, and scientific training methods.',
  features = '["Morning: 6-7 AM", "Eve: 4:30-5:30, 5-6, 6-7 PM", "NS-NIS Coaching", "Synthetic Courts"]'
WHERE order_index = 0;

UPDATE public.programs SET
  title = 'Intermediate / Adult',
  description = 'Competitive training and adult performance sessions focusing on circuit readiness and agility.',
  features = '["Inter: Mon-Fri 6:30-8 PM", "Adult: Mon-Fri 7-8 PM", "Physical Fitness", "Tournament Prep"]'
WHERE order_index = 1;

UPDATE public.programs SET
  title = 'Weekend Special',
  description = 'Intensive weekend training sessions for students and working professionals.',
  features = '["Saturday: 5:00-7:00 PM", "Sunday: 7:00-9:00 AM", "Technique Drills", "Match Play"]'
WHERE order_index = 2;