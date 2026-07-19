"use client";

export interface FacultyMember {
  id: string;
  full_name: string;
  designation: string;
  qualification?: string;
  experience?: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}