"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/sections/DashboardOverview';
import StudentManager from '@/components/admin/sections/StudentManager';
import AttendanceManager from '@/components/admin/sections/AttendanceManager';
import FeeManager from '@/components/admin/sections/FeeManager';
import GalleryManager from '@/components/admin/sections/GalleryManager';
import EventManager from '@/components/admin/sections/EventManager';
import SettingsManager from '@/components/admin/sections/SettingsManager';
import InventoryManager from '@/components/admin/sections/InventoryManager';
import SaleManager from '@/components/admin/sections/SaleManager';
import ReportsManager from '@/components/admin/sections/ReportsManager';
import ExpenseManager from '@/components/admin/sections/ExpenseManager';
import MessagesManager from '@/components/admin/sections/MessagesManager';
import AdministrationManager from '@/components/admin/sections/AdministrationManager';
import HomepageStatsManager from '@/components/admin/sections/HomepageStatsManager';
import ContactInformationManager from '@/components/admin/sections/ContactInformationManager';
import BatchTimingsManager from '@/components/admin/sections/BatchTimingsManager';
import TestimonialsManager from '@/components/admin/sections/TestimonialsManager';
import FacultyManager from '@/components/admin/sections/FacultyManager';
import FAQManager from '@/components/admin/sections/FAQManager';
import ContentSettings from '@/components/admin/sections/ContentSettings';
import SEO from '@/components/SEO';
import { Bell, Search, User, Loader2, Check, ExternalLink, Globe } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'students': return <StudentManager />;
      case 'attendance': return <AttendanceManager />;
      case 'fees': return <FeeManager />;
      case 'inventory': return <InventoryManager />;
      case 'sales': return <SaleManager />;
      case 'gallery_badminton': return <GalleryManager category="Badminton" />;
      case 'gallery_crossfit': return <GalleryManager category="CrossFit" />;
      case 'testimonials': return <TestimonialsManager />;
      case 'faculty': return <FacultyManager />;
      case 'faqs': return <FAQManager />;
      case 'events': return <EventManager />;
      case 'expenses': return <ExpenseManager />;
      case 'messages': return <MessagesManager />;
      case 'contact_info': return <ContactInformationManager />;
      case 'homepage_mgmt': return <HomepageStatsManager />;
      case 'batch_timings': return <BatchTimingsManager />;
      case 'content': return <ContentSettings />;
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
      <SEO title="Admin Portal" description="KYK Academy Administration" path="/admin" noindex />
      
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
              <span className="text-sm font-black text-[#0F4C81] uppercase tracking-tighter">{activeTab.replace(/_/g, ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              asChild
              className="hidden xl:flex items-center gap-2 h-12 px-6 rounded-2xl text-slate-400 font-bold hover:text-[#0F4C81] hover:bg-slate-50"
            >
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Globe size={18} />
                View Website
                <ExternalLink size={12} className="opacity-50" />
              </a>
            </Button>

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
                            n.type === 'Warning' ? "text-amber-500" : "text-[#0F4C81]"
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