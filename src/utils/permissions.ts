"use client";

import { AdminTab } from '@/components/admin/AdminSidebar';
import { AdminRole } from '@/types/administration';

const PERMISSION_MATRIX: Record<AdminRole, AdminTab[]> = {
  'Super Admin': [
    'dashboard', 'students', 'attendance', 'fees', 'inventory', 
    'sales', 'gallery', 'events', 'expenses', 'messages', 
    'content', 'reports', 'settings', 'administration'
  ],
  'Admin': [
    'dashboard', 'students', 'attendance', 'fees', 'inventory', 
    'sales', 'gallery', 'events', 'expenses', 'messages', 
    'content', 'reports', 'settings', 'administration'
  ],
  'Accountant': [
    'dashboard', 'fees', 'inventory', 'sales', 'expenses', 'reports'
  ],
  'Reception': [
    'dashboard', 'students', 'attendance', 'fees', 'sales', 'messages', 'events'
  ],
  'Coach': [
    'dashboard', 'students', 'attendance', 'gallery', 'events'
  ],
  'Staff': [
    'dashboard', 'attendance', 'gallery'
  ]
};

export const canAccessTab = (role: AdminRole, tab: AdminTab): boolean => {
  return PERMISSION_MATRIX[role]?.includes(tab) || false;
};

export const getFirstAvailableTab = (role: AdminRole): AdminTab => {
  return PERMISSION_MATRIX[role]?.[0] || 'dashboard';
};