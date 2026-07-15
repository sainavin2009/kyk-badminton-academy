"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, RefreshCcw } from 'lucide-react';

interface ContentSettingsProps {
  title: string;
  type: 'about' | 'contact' | 'settings';
}

const ContentSettings = ({ title, type }: ContentSettingsProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{title} Management</h2>
          <p className="text-slate-500 font-medium">Update the public-facing {title.toLowerCase()} information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-10 rounded-[3rem] border-none shadow-sm space-y-8">
            {type === 'about' && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Academy Heading</label>
                  <Input defaultValue="Shaping the Next Elite" className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-lg text-[#0F4C81]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mission Statement</label>
                  <Textarea 
                    defaultValue="Founded with a passion for excellence, KYK Badminton Academy is more than a gym—it's a high-performance sanctuary for aspiring professionals." 
                    className="min-h-[150px] rounded-[2rem] bg-slate-50 border-none font-medium resize-none p-6"
                  />
                </div>
              </>
            )}

            {type === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                  <Input defaultValue="info@kykacademy.com" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Phone Number</label>
                  <Input defaultValue="+1 (234) 567-890" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Physical Address</label>
                  <Input defaultValue="123 Smash Court, Badminton Valley, Sports City 54321" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              </div>
            )}

            {type === 'settings' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Admin Username</label>
                  <Input defaultValue="Admin_KYK" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">New Password</label>
                  <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20">
                <Save className="mr-2" size={20} />
                Save Changes
              </Button>
              <Button variant="ghost" className="h-16 px-10 rounded-2xl text-slate-400 font-bold hover:bg-slate-50">
                <RefreshCcw className="mr-2" size={20} />
                Reset
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-slate-50">
            <h4 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest mb-4">Pro Tip</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Changes made here will be reflected instantly on the public website. Always double-check information for accuracy before saving.
            </p>
          </Card>
          <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-[#0F4C81]/5">
            <h4 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest mb-4">Last Modified</h4>
            <div className="flex items-center gap-3 text-[#0F4C81]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[10px] font-black">AD</div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">Admin User</span>
                <span className="text-[10px] font-black opacity-50 uppercase">2 hours ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentSettings;