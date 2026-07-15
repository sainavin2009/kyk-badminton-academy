"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/sections/DashboardOverview';
import GalleryManager from '@/components/admin/sections/GalleryManager';
import ContentSettings from '@/components/admin/sections/ContentSettings';
import AboutManager from '@/components/admin/sections/AboutManager';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const { session, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin" />
          <span className="font-black text-[#0F4C81] uppercase tracking-widest text-xs">Initializing Session...</span>
        </div>
      </div>
    );
  }

  // Security Gate: Redirect to login if not authenticated
  if (!session) return <Navigate to="/login" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'about': return <AboutManager />;
      case 'badminton': return <GalleryManager title="Badminton" type="badminton" />;
      case 'crossfit': return <GalleryManager title="CrossFit" type="crossfit" />;
      case 'contact': return <ContentSettings title="Contact" type="contact" />;
      case 'settings': return <ContentSettings title="Settings" type="settings" />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow ml-72">
        {/* Top Header */}
        <header className="h-28 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={20} />
            <Input 
              className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold group-focus-within:bg-white group-focus-within:shadow-lg group-focus-within:shadow-slate-200/50 transition-all" 
              placeholder="Search anything..." 
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0F4C81] hover:bg-slate-100 transition-all">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="flex flex-col text-right">
                <span className="text-sm font-black text-[#0F4C81] uppercase tracking-tight">Admin User</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Super Admin</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1561a0] flex items-center justify-center text-white shadow-lg shadow-[#0F4C81]/20">
                <User size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;