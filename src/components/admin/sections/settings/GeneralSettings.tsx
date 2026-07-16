"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Trophy, Palette, Globe } from 'lucide-react';
import { toast } from 'sonner';

const GeneralSettings = () => {
  const { settings, refresh } = useSettings();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [secondaryColor, setSecondaryColor] = useState("#FFC107");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setName(settings.hero_heading || "");
      setLogo(settings.logo_url || "");
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          hero_heading: name,
          logo_url: logo,
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success("General settings saved!");
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Brand Identity</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Name</Label>
              <Input 
                value={name} 
                onChange={(e) => { setName(e.target.value); setIsDirty(true); }}
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logo URL</Label>
              <Input 
                value={logo} 
                onChange={(e) => { setLogo(e.target.value); setIsDirty(true); }}
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
              />
            </div>
          </div>

          <div className="space-y-4">
             <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Theme Colors</Label>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <p className="text-[9px] font-bold text-slate-400 uppercase">Primary</p>
                   <div className="flex gap-2">
                      <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-12 p-1 rounded-xl border-none bg-slate-50" />
                      <Input value={primaryColor} readOnly className="h-12 rounded-xl bg-slate-50 border-none font-mono text-xs" />
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] font-bold text-slate-400 uppercase">Secondary</p>
                   <div className="flex gap-2">
                      <Input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-12 h-12 p-1 rounded-xl border-none bg-slate-50" />
                      <Input value={secondaryColor} readOnly className="h-12 rounded-xl bg-slate-50 border-none font-mono text-xs" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={!isDirty} className="h-14 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl">
            <Save className="mr-2" size={20} />
            Update General Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GeneralSettings;