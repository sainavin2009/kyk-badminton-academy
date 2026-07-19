"use client";

export interface BatchTimingRow {
  days: string;
  time: string;
}

export interface BatchSection {
  title?: string | null;
  timings: BatchTimingRow[];
}

export interface BatchTiming {
  id: string;
  name: string;
  age_group: string;
  sections: BatchSection[];
  order_index: number;
  is_visible: boolean;
  created_at?: string;
}