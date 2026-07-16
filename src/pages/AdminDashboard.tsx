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
import { Bell, Search, User, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdminDashboardProps {
  customView?: React.ReactNode;
  activeTab?: AdminTab;
}

const AdminDashboard = ({ customView, activeTab: initialTab }: AdminDashboardProps) => {
  const { profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab || 'dashboard');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const renderContent = () => {
    if (customView) return customView;

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
            <button className="relative p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0F4C81] transition-all">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-50 border-2 border-white rounded-full" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="flex flex-col text-right">
                <span className="text-xs font-black text-[#0F4C81] uppercase tracking-tight">
                  {profile?.full_name || profile?.email || 'Administrator'}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">
                  {profile?.role || 'Identifying Role...'}
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center text-[#FFC107] shadow-xl overflow-hidden">
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