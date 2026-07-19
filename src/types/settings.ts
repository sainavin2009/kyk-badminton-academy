"use client";

export interface WorkingHour {
  days: string;
  hours: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProgramSchedule {
  label: string;
  time: string;
}

export interface SiteSettings {
  id: number;
  hero_heading: string;
  hero_subheading: string;
  programs_hero_title: string;
  programs_hero_subtitle: string;
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

export interface ContactInfo {
  id: number;
  academy_name: string;
  address: string;
  google_maps_url: string;
  primary_phone: string;
  secondary_phone: string;
  email: string;
  whatsapp_number: string;
  instagram_url: string;
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
  schedule: ProgramSchedule[];
  icon_name: string;
  color_class: string;
  order_index: number;
  is_visible: boolean;
  created_at?: string;
}