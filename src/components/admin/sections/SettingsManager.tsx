"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Settings2, 
  Database, 
  Moon,
  Sun,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import SystemSettings from './SystemSettings';
import MaintenanceSettings from './MaintenanceSettings';
import AdministrationManager from './AdministrationManager';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

type SettingsTab = 'general' | 'system' | 'security' | 'maintenance' | 'admins';

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [darkMode, setDarkMode] = useState(false);
  const { profile } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode applied.`);
  };

  const tabs = [
    { id: 'general', label: 'Identity', icon: Globe },
    { id: 'system', label: 'System', icon: Settings2 },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'maintenance', label: 'Database', icon: Database },
  ];

  // Add Admins tab only for Super Admin
  if (profile?.role === 'Super Admin') {
    tabs.push({ id: 'admins', label: 'Admins', icon: Users });
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">System Configuration</h2>
          <p className="text-slate-500 font-medium">Global settings and personnel management.</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={toggleDarkMode}
          className="h-14 w-14 rounded-2xl bg-white border-none shadow-sm text-slate-400"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 p-2 bg-white rounded-[2.5rem] shadow-sm w-fit border border-slate-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SettingsTab)}
            className={cn(
              "px-6 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3",
              activeTab === tab.id 
                ? "bg-[#0F4C81] text-white shadow-xl" 
                : "text-slate-400 hover:text-[#0F4C81] hover:bg-slate-50"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'system' && <SystemSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'maintenance' && <MaintenanceSettings />}
        {activeTab === 'admins' && <AdministrationManager />}
      </div>
    </div>
  );
};

export default SettingsManager;