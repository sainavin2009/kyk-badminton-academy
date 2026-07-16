"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Save, 
  Share2, 
  Trophy,
  Trash2,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { SocialLink } from '@/types/settings';
import HeroManager from './HeroManager';
import ProgramManager from './ProgramManager';
import ImageUpload from '../shared/ImageUpload';

const ContentSettings = () => {
  const { settings, refresh } = useSettings();
  const [logo, setLogo] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setLogo(settings.logo_url || "");
      setSocialLinks(settings.social_links || []);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          logo_url: logo,
          social_links: socialLinks
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success("Global settings saved!");
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
    }
  };

  const addSocial = () => {
    setSocialLinks([...socialLinks, { platform: 'Instagram', url: '' }]);
    setIsDirty(true);
  };

  const removeSocial = (idx: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== idx));
    setIsDirty(true);
  };

  const updateSocial = (idx: number, field: keyof SocialLink, val: string) => {
    const newLinks = [...socialLinks];
    newLinks[idx][field] = val;
    setSocialLinks(newLinks);
    setIsDirty(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Website Content Management</h2>
          <p className="text-slate-500 font-medium">Control the brand identity and dynamic sections of your site.</p>
        </div>
      </div>

      <HeroManager />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Brand Identity</h3>
          </div>

          <ImageUpload 
            label="Academy Logo"
            value={logo}
            onChange={(url) => { setLogo(url); setIsDirty(true); }}
          />
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Social Connect</h3>
            </div>
            <Button onClick={addSocial} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]"><Plus className="mr-1" size={14} /> Add Link</Button>
          </div>

          <div className="space-y-4">
            {socialLinks.map((link, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <Input 
                  placeholder="Platform"
                  value={link.platform}
                  onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                  className="h-12 w-32 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                />
                <Input 
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                  className="h-12 flex-grow rounded-xl bg-slate-50 border-none font-medium text-xs" 
                />
                <Button variant="ghost" onClick={() => removeSocial(idx)} className="w-10 h-10 rounded-xl text-slate-300 hover:text-red-500"><Trash2 size={16} /></Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!isDirty} className="h-16 px-12 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl">
          <Save className="mr-2" size={20} />
          Save Identity Settings
        </Button>
      </div>

      <ProgramManager />
    </div>
  );
};

export default ContentSettings;