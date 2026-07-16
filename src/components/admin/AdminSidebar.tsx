"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Package, 
  BarChart3, 
  Image as ImageIcon, 
  Globe, 
  FileText, 
  Settings, 
  LogOut,
  Trophy,
  Calendar,
  UserCheck,
  TrendingDown,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export type AdminTab = 
  | 'dashboard' 
  | 'students' 
  | 'attendance'
  | 'fees' 
  | 'inventory' 
  | 'sales' 
  | 'gallery' 
  | 'events'
  | 'expenses'
  | 'messages'
  | 'content' 
  | 'reports' 
  | 'settings'
  | 'administration';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'sales', label: 'Sales', icon: BarChart3 },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'messages', label: 'Inquiries', icon: MessageSquare },
    { id: 'content', label: 'Website Content', icon: Globe },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Super Admin and Admin can access Administration
  const canAccessAdministration = profile?.role === 'Super Admin' || profile?.role === 'Admin';

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="w-72 bg-[#0F4C81] h-screen fixed left-0 top-0 text-white flex flex-col shadow-2xl z-50">
      <div className="p-8 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 bg-[#FFC107] rounded-xl text-[#0F4C81]">
          <Trophy size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black tracking-tighter uppercase text-xl leading-none">KYK Admin</span>
          <span className="text-[10px] font-bold text-[#FFC107] tracking-widest uppercase">Elite Portal</span>
        </div>
      </div>

      <nav className="flex-grow p-6 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminTab)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-200 uppercase text-[10px] tracking-widest group",
              activeTab === item.id 
                ? "bg-[#FFC107] text-[#0F4C81] shadow-lg shadow-[#FFC107]/20" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={18} className={cn(
              "transition-transform group-hover:scale-110",
              activeTab === item.id ? "stroke-[3px]" : "stroke-[2px]"
            )} />
            {item.label}
          </button>
        ))}

        {canAccessAdministration && (
          <div className="pt-4 mt-4 border-t border-white/5">
            <p className="px-4 mb-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/30">Privileged Guard</p>
            <button
              onClick={() => setActiveTab('administration')}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-200 uppercase text-[10px] tracking-widest group",
                activeTab === 'administration'
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <ShieldAlert size={18} className={cn(
                "transition-transform group-hover:scale-110",
                activeTab === 'administration' ? "stroke-[3px]" : "stroke-[2px]"
              )} />
              Administration
            </button>
          </div>
        )}
      </nav>

      <div className="p-6 border-t border-white/10 bg-[#0A2A47]/50">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;