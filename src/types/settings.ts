export interface WorkingHour {
  days: string;
  hours: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  id: number;
  hero_heading: string;
  hero_subheading: string;
  about_heading: string;
  about_content: string;
  about_image: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  map_link: string;
  logo_url: string;
  working_hours: WorkingHour[];
  social_links: SocialLink[];
  updated_at: string;
}

export interface ContactInformation {
  id: number;
  academy_name: string;
  address: string;
  primary_phone: string;
  secondary_phone: string;
  email: string;
  whatsapp_number: string;
  google_maps_url: string;
  monday_friday_hours: string;
  saturday_hours: string;
  sunday_hours: string;
  updated_at: string;
}

export interface Program {
  id: string;
  title: string;
  age_range: string;
  description: string;
  features: string[];
  icon_name: string;
  color_class: string;
  order_index: number;
}