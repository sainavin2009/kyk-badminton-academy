"use client";

export type AdminRole = 
  | 'Super Admin' 
  | 'Admin' 
  | 'Reception' 
  | 'Coach' 
  | 'Accountant' 
  | 'Staff';

export type AdminStatus = 'Active' | 'Inactive' | 'Invited';

export interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: AdminStatus;
  avatar_url?: string;
  last_login?: string;
  created_at: string;
  created_by?: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  ip_address: string;
  device: string;
  browser: string;
  details: any;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export interface AdminInvite {
  id: string;
  email: string;
  role: AdminRole;
  inviter_id: string;
  status: 'Pending' | 'Accepted' | 'Expired';
  expires_at: string;
  created_at: string;
  inviter?: {
    full_name: string;
  };
}