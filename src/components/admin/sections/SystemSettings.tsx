"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Receipt, Bell, Save, Send } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SystemSettings = () => {
  const [emailHost, setEmailHost] = useState("smtp.gmail.com");
  const [receiptPrefix, setReceiptPrefix] = useState("KYK-");
  const [notifyAdmission, setNotifyAdmission] = useState(true);
  const [notifyFee, setNotifyFee] = useState(true);

  const handleSave = () => {
    toast.success("System configurations updated!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Email Server</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">SMTP Host</Label>
              <Input value={emailHost} onChange={(e) => setEmailHost(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Port</Label>
                <Input defaultValue="587" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Encryption</Label>
                <select className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-xs">
                  <option>TLS</option>
                  <option>SSL</option>
                </select>
              </div>
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-2 border-slate-200 font-bold text-slate-400 hover:text-[#0F4C81] hover:border-[#0F4C81]">
              <Send className="mr-2" size={16} /> Send Test Mail
            </Button>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Receipt size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Receipt Config</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Receipt No Prefix</Label>
              <Input value={receiptPrefix} onChange={(e) => setReceiptPrefix(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Receipt Footer Text</Label>
              <Textarea defaultValue="Engineering Excellence since 2014. Professional Badminton Training." className="h-24 rounded-xl bg-slate-50 border-none font-medium p-4 resize-none" />
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white col-span-full">
           <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <Bell size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Notification Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50">
                <div className="space-y-1">
                   <p className="font-bold text-[#0F4C81]">New Admissions</p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase">Alert admin when a student registers</p>
                </div>
                <Switch checked={notifyAdmission} onCheckedChange={setNotifyAdmission} />
             </div>
             <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50">
                <div className="space-y-1">
                   <p className="font-bold text-[#0F4C81]">Fee Reminders</p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase">Notify on pending or overdue fees</p>
                </div>
                <Switch checked={notifyFee} onCheckedChange={setNotifyFee} />
             </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="h-16 px-12 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl">
          <Save className="mr-2" size={20} />
          Save System Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;