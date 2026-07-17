"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Upload, Trophy, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const BrandingSettings = () => {
  const { settings, refresh } = useSettings();
  const [formData, setFormData] = useState({
    hero_heading: settings?.hero_heading || 'KYK Academy',
    hero_subheading: settings?.hero_subheading || 'SMASH YOUR LIMITS',
    logo_url: settings?.logo_url || ''
  });

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          hero_heading: formData.hero_heading,
          hero_subheading: formData.hero_subheading,
          logo_url: formData.logo_url
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success("Identity settings updated successfully!");
      await refresh();
    } catch (err: any) {
      toast.error("Failed to update branding: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="p-10 md:p-12 rounded-[3.5rem] border-none shadow-sm bg-white space-y-12">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-[1.5rem]">
            <Trophy size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Identity & Branding</h3>
            <p className="text-sm font-medium text-slate-400">Manage your academy's public profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Academy Name</Label>
              <Input 
                value={formData.hero_heading} 
                onChange={(e) => setFormData(prev => ({ ...prev, hero_heading: e.target.value }))}
                className="h-14 rounded-2xl bg-slate-50 border-none font-black text-[#0F4C81] focus-visible:ring-2 focus-visible:ring-[#FFC107] text-lg" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Tagline (Motto)</Label>
              <Input 
                value={formData.hero_subheading} 
                onChange={(e) => setFormData(prev => ({ ...prev, hero_subheading: e.target.value }))}
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
              />
            </div>
          </div>

          <div className="space-y-6">
             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Academy Logo</Label>
             <div className="relative group">
                <div className="aspect-square rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 transition-all group-hover:border-[#FFC107] group-hover:bg-amber-50/30">
                   {formData.logo_url ? (
                     <img src={formData.logo_url} alt="Preview" className="w-full h-full object-contain" />
                   ) : (
                     <>
                       <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-slate-300">
                         <ImageIcon size={32} />
                       </div>
                       <p className="text-[10px] font-black uppercase text-slate-400">No Logo Uploaded</p>
                     </>
                   )}
                </div>
                <Button variant="outline" className="absolute bottom-4 right-4 h-12 rounded-xl bg-white shadow-lg border-none font-bold text-xs">
                  <Upload className="mr-2" size={14} /> Change Logo
                </Button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex justify-end">
          <Button 
            onClick={handleSave}
            className="h-16 px-12 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/10 transition-all active:scale-95"
          >
            <Save className="mr-2" size={20} /> Update Branding
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BrandingSettings;