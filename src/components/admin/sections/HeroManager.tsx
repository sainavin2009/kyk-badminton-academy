"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const HeroManager = () => {
  const { settings, refresh } = useSettings();
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setHeading(settings.hero_heading);
      setSubheading(settings.hero_subheading);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          hero_heading: heading,
          hero_subheading: subheading
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success('Hero content updated successfully');
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error('Failed to save changes: ' + err.message);
    }
  };

  return (
    <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Hero Experience</h3>
        <p className="text-sm text-slate-400 font-medium">This is the first thing users see on the homepage.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Heading</label>
          <Input 
            value={heading}
            onChange={(e) => { setHeading(e.target.value); setIsDirty(true); }}
            className="h-14 rounded-2xl bg-slate-50 border-none font-black text-[#0F4C81]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sub-heading / Tagline</label>
          <Input 
            value={subheading}
            onChange={(e) => { setSubheading(e.target.value); setIsDirty(true); }}
            className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-slate-600"
          />
        </div>
      </div>

      <Button 
        onClick={handleSave}
        disabled={!isDirty}
        className="h-14 px-8 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all"
      >
        <Save className="mr-2" size={20} />
        Save Hero Settings
      </Button>
    </Card>
  );
};

export default HeroManager;