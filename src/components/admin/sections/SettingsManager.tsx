"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Settings2, 
  Database, 
  Palette, 
  Bell, 
  Moon,
  Sun,
  Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import SystemSettings from './SystemSettings';
import MaintenanceSettings from './MaintenanceSettings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type SettingsTab = 'general' | 'system' | 'security' | 'maintenance';

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode applied for this session.`);
  };

  const tabs = [
    { id: 'general', label: 'Identity', icon: Globe },
    { id: 'system', label: 'System', icon: Settings2 },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'maintenance', label: 'Maintenance', icon: Database },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Settings</h2>
          <p className="text-slate-500 font-medium">Control your digital presence and system behavior.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button 
            variant="outline" 
            onClick={toggleDarkMode}
            className="h-14 w-14 rounded-2xl bg-white border-none shadow-sm text-slate-400 hover:text-[#0F4C81]"
           >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
           </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-2 bg-white rounded-[2.5rem] shadow-sm w-fit border border-slate-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SettingsTab)}
            className={cn(
              "px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3",
              activeTab === tab.id 
                ? "bg-[#0F4C81] text-white shadow-xl shadow-[#0F4C81]/20" 
                : "text-slate-400 hover:text-[#0F4C81] hover:bg-slate-50"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'system' && <SystemSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'maintenance' && <MaintenanceSettings />}
      </div>
    </div>
  );
};

export default SettingsManager;