"use client";

export interface Testimonial {
  id: string;
  athlete_name: string;
  designation: string;
  testimonial: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}