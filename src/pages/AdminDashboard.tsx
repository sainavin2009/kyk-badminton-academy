"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/sections/DashboardOverview';
import StudentManager from '@/components/admin/sections/StudentManager';
import FeeManager from '@/components/admin/sections/FeeManager';
import GalleryManager from '@/components/admin/sections/GalleryManager';
import ContentSettings from '@/components/admin/sections/ContentSettings';
import AboutManager from '@/components/admin/sections/AboutManager';
import ContactManager from '@/components/admin/sections/ContactManager';
import InventoryManager from '@/components/admin/sections/InventoryManager';
import SaleManager from '@/components/admin/sections/SaleManager';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PlaceholderSection = ({ title }: { title: string }) => (
  <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
      <Search size={48} />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{title} Section</h2>
      <p className="text-slate-500 font-medium max-w-md">The management system for {title.toLowerCase()} is being initialized with your database.</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'students': return <StudentManager />;
      case 'fees': return <FeeManager />;
      case 'inventory': return <InventoryManager />;
      case 'sales': return <SaleManager />;
      case 'gallery': return <GalleryManager />;
      case 'content': return <AboutManager />;
      case 'reports': return <PlaceholderSection title="Reports" />;
      case 'settings': return <ContentSettings />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow ml-72">
        <header className="h-28 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-8">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={18} />
              <Input 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:shadow-slate-200/40 transition-all text-sm" 
                placeholder="Global admin search..." 
              />
            </div>
            <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Section</span>
              <span className="text-sm font-black text-[#0F4C81] uppercase tracking-tighter">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0F4C81] hover:bg-[#FFC107]/10 transition-all">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="flex flex-col text-right">
                <span className="text-xs font-black text-[#0F4C81] uppercase tracking-tight">Admin User</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Super Administrator</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center text-[#FFC107] shadow-xl shadow-[#0F4C81]/20">
                <User size={24} strokeWidth={2.5} />
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