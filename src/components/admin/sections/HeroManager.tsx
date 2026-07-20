"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Layout, Globe, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '../shared/ImageUpload';

const HeroManager = () => {
  const { settings, refresh } = useSettings();
  const [formData, setFormData] = useState({
    hero_heading: '',
    hero_subheading: '',
    programs_hero_title: '',
    programs_hero_subtitle: '',
    hero_card_image_url: '',
    hero_card_title: ''
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        hero_heading: settings.hero_heading || '',
        hero_subheading: settings.hero_subheading || '',
        programs_hero_title: settings.programs_hero_title || '',
        programs_hero_subtitle: settings.programs_hero_subtitle || '',
        hero_card_image_url: settings.hero_card_image_url || '',
        hero_card_title: settings.hero_card_title || 'Elite Training Session'
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(formData)
        .eq('id', 1);

      if (error) throw error;
      toast.success('Hero content updated successfully');
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error('Failed to save changes: ' + err.message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#0F4C81] rounded-2xl">
            <Layout size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Homepage Hero</h3>
            <p className="text-sm text-slate-400 font-medium">Main entrance experience of the website.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Heading</label>
              <Input 
                value={formData.hero_heading}
                onChange={(e) => handleInputChange('hero_heading', e.target.value)}
                className="h-14 rounded-2xl bg-slate-50 border-none font-black text-[#0F4C81]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sub-heading / Tagline</label>
              <Input 
                value={formData.hero_subheading}
                onChange={(e) => handleInputChange('hero_subheading', e.target.value)}
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Card Title</label>
                <Input 
                  value={formData.hero_card_title}
                  onChange={(e) => handleInputChange('hero_card_title', e.target.value)}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]"
                  placeholder="Elite Training Session"
                />
              </div>
              
              <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100/50">
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  This card floats next to the main image in the About section on the homepage, serving as a highlighted "feature" visual.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <ImageUpload 
                label="Hero Card Image"
                value={formData.hero_card_image_url}
                onChange={(url) => handleInputChange('hero_card_image_url', url)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-[#0F4C81] rounded-2xl">
            <Globe size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Programs Hero</h3>
            <p className="text-sm text-slate-400 font-medium">Hero section specifically for the training programs page.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Programs Title</label>
            <Input 
              value={formData.programs_hero_title}
              onChange={(e) => handleInputChange('programs_hero_title', e.target.value)}
              className="h-14 rounded-2xl bg-slate-50 border-none font-black text-[#0F4C81]"
              placeholder="MASTER THE GAME"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Programs Subtitle</label>
            <Textarea 
              value={formData.programs_hero_subtitle}
              onChange={(e) => handleInputChange('programs_hero_subtitle', e.target.value)}
              className="min-h-[100px] rounded-2xl bg-slate-50 border-none font-medium text-slate-600 p-5 resize-none"
              placeholder="Describe the programs..."
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={!isDirty}
          className="h-16 px-12 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all"
        >
          <Save className="mr-2" size={20} />
          Save All Hero Content
        </Button>
      </div>
    </div>
  );
};

export default HeroManager;