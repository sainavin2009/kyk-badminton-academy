"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Download, Upload, RefreshCw, ShieldAlert, History } from 'lucide-react';
import { toast } from 'sonner';

const MaintenanceSettings = () => {
  const [backingUp, setBackingUp] = useState(false);

  const handleBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      toast.success("Database export generated successfully!");
    }, 2000);
  };

  const handleRestore = () => {
    toast.info("Select a backup file to restore academy data.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-10 rounded-[3.5rem] border-none shadow-sm space-y-8 bg-white flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-blue-50 text-blue-600 flex items-center justify-center">
            <Download size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Database Backup</h3>
            <p className="text-sm text-slate-500 font-medium max-w-[250px]">
              Generate a full snapshot of your students, fees, and inventory records.
            </p>
          </div>
          <Button 
            onClick={handleBackup} 
            disabled={backingUp}
            className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest"
          >
            {backingUp ? <RefreshCw className="animate-spin mr-2" size={20} /> : <Download className="mr-2" size={20} />}
            Trigger Export
          </Button>
        </Card>

        <Card className="p-10 rounded-[3.5rem] border-none shadow-sm space-y-8 bg-white flex flex-col items-center text-center border-2 border-dashed border-slate-100">
          <div className="w-20 h-20 rounded-[2rem] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Upload size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Restore Data</h3>
            <p className="text-sm text-slate-500 font-medium max-w-[250px]">
              Upload a previous backup file to restore your academy database state.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRestore}
            className="w-full h-14 rounded-2xl border-2 border-[#0F4C81] text-[#0F4C81] font-black uppercase tracking-widest hover:bg-[#0F4C81] hover:text-white"
          >
            <Upload className="mr-2" size={20} />
            Import Backup
          </Button>
        </Card>
      </div>

      <Card className="p-8 rounded-[3rem] bg-red-50/30 border border-red-100 space-y-4">
         <div className="flex items-center gap-3 text-red-600">
            <ShieldAlert size={20} />
            <h4 className="font-black uppercase tracking-tight">Danger Zone</h4>
         </div>
         <p className="text-xs font-medium text-red-900/60 leading-relaxed">
            Restoring data will overwrite all current records. Ensure you have a recent backup before proceeding. This action is irreversible once confirmed by system administrator.
         </p>
      </Card>

      <Card className="p-8 rounded-[3rem] bg-white border-none shadow-sm space-y-6">
         <div className="flex items-center gap-3">
            <History size={20} className="text-slate-400" />
            <h4 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Recent Maintenance Logs</h4>
         </div>
         <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-slate-50 text-xs">
               <span className="font-bold text-slate-600">Weekly Auto-Backup</span>
               <span className="text-slate-400">Success • 2 days ago</span>
            </div>
            <div className="flex justify-between items-center py-3 text-xs">
               <span className="font-bold text-slate-600">Manual Export (Admin)</span>
               <span className="text-slate-400">Success • 5 days ago</span>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default MaintenanceSettings;