"use client";

export interface BatchTiming {
  id: string;
  batch_name: string;
  age_group: string;
  days: string;
  timings: string;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}