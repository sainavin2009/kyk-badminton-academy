"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Info, 
  Image as ImageIcon, 
  Dumbbell, 
  Phone, 
  Settings, 
  LogOut,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export type AdminTab = 'overview' | 'about' | 'badminton' | 'crossfit' | 'contact' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'badminton', label: 'Badminton Gallery', icon: Trophy },
    { id: 'crossfit', label: 'CrossFit Gallery', icon: Dumbbell },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="w-72 bg-[#0F4C81] h-screen fixed left-0 top-0 text-white flex flex-col shadow-2xl">
      <div className="p-8 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 bg-[#FFC107] rounded-xl text-[#0F4C81]">
          <Trophy size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black tracking-tighter uppercase text-xl leading-none">KYK Admin</span>
          <span className="text-[10px] font-bold text-[#FFC107] tracking-widest uppercase">Management Suite</span>
        </div>
      </div>

      <nav className="flex-grow p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminTab)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 uppercase text-xs tracking-widest group",
              activeTab === item.id 
                ? "bg-[#FFC107] text-[#0F4C81] shadow-lg shadow-[#FFC107]/20" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-transform group-hover:scale-110",
              activeTab === item.id ? "stroke-[3px]" : "stroke-[2px]"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;