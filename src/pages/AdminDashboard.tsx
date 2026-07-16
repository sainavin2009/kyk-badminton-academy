"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/sections/DashboardOverview';
import StudentManager from '@/components/admin/sections/StudentManager';
import AttendanceManager from '@/components/admin/sections/AttendanceManager';
import FeeManager from '@/components/admin/sections/FeeManager';
import GalleryManager from '@/components/admin/sections/GalleryManager';
import EventManager from '@/components/admin/sections/EventManager';
import AboutManager from '@/components/admin/sections/AboutManager';
import SettingsManager from '@/components/admin/sections/SettingsManager';
import InventoryManager from '@/components/admin/sections/InventoryManager';
import SaleManager from '@/components/admin/sections/SaleManager';
import ReportsManager from '@/components/admin/sections/ReportsManager';
import ExpenseManager from '@/components/admin/sections/ExpenseManager';
import MessagesManager from '@/components/admin/sections/MessagesManager';
import AdministrationManager from '@/components/admin/sections/AdministrationManager';
import { Bell, Search, User, Loader2, Check, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/hooks/use-notifications';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { canAccessTab, getFirstAvailableTab } from '@/utils/permissions';

const AdminDashboard = () => {
  const { profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  useEffect(() => {
    if (profile && !canAccessTab(profile.role, activeTab)) {
      setActiveTab(getFirstAvailableTab(profile.role));
    }
  }, [profile, activeTab]);

  const renderContent = () => {
    if (!profile) return null;
    if (!canAccessTab(profile.role, activeTab)) {
      return (
        <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter">Access Forbidden</h2>
          <p className="text-slate-500 font-medium max-w-md italic">
            Your clearance level ({profile.role}) does not allow entry to the "{activeTab}" intelligence node.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'students': return <StudentManager />;
      case 'attendance': return <AttendanceManager />;
      case 'fees': return <FeeManager />;
      case 'inventory': return <InventoryManager />;
      case 'sales': return <SaleManager />;
      case 'gallery': return <GalleryManager />;
      case 'events': return <EventManager />;
      case 'expenses': return <ExpenseManager />;
      case 'messages': return <MessagesManager />;
      case 'content': return <AboutManager />;
      case 'reports': return <ReportsManager />;
      case 'settings': return <SettingsManager />;
      case 'administration': return <AdministrationManager />;
      default: return <DashboardOverview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#0F4C81]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow ml-72">
        <header className="h-28 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-8">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={18} />
              <Input 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold group-focus-within:bg-white transition-all text-sm" 
                placeholder="Global search..." 
              />
            </div>
            <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Section</span>
              <span className="text-sm font-black text-[#0F4C81] uppercase tracking-tighter">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0F4C81] transition-all">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-3 right-3 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-[2rem] p-4 border-none shadow-2xl mt-4 bg-white">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-black text-[#0F4C81] uppercase text-xs tracking-widest">Notifications</h4>
                  <button onClick={markAllRead} className="text-[9px] font-black uppercase text-[#FFC107] hover:underline">Mark all read</button>
                </div>
                <DropdownMenuSeparator className="bg-slate-50" />
                <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-2 py-2">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <DropdownMenuItem 
                        key={n.id} 
                        onClick={() => markAsRead(n.id)}
                        className={cn(
                          "flex flex-col items-start gap-1 p-4 rounded-2xl cursor-pointer transition-colors",
                          n.is_read ? "opacity-50" : "bg-slate-50"
                        )}
                      >
                        <div className="flex justify-between w-full">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            n.type === 'Warning' ? "text-amber-500" : 
                            n.type === 'Success' ? "text-green-600" : "text-[#0F4C81]"
                          )}>{n.title}</span>
                          <span className="text-[8px] font-bold text-slate-400">{format(new Date(n.created_at), 'HH:mm')}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-600 leading-tight">{n.message}</p>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <Check className="mx-auto text-slate-200 mb-2" size={32} />
                      <p className="text-[10px] font-black uppercase text-slate-300">All caught up!</p>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="flex flex-col text-right">
                <span className="text-xs font-black text-[#0F4C81] uppercase tracking-tight">
                  {profile?.full_name || profile?.email || 'Administrator'}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">
                  {profile?.role || 'Identifying Role...'}
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center text-[#FFC107] shadow-xl overflow-hidden border-2 border-white">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={24} strokeWidth={2.5} />
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto pb-32">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;