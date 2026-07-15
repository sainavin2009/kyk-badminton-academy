"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  RefreshCcw, 
  Globe, 
  Palette, 
  Search, 
  Share2, 
  Upload, 
  X,
  Trophy,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Trash2,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: string;
  url: string;
}

const ContentSettings = () => {
  // General State
  const [siteName, setSiteName] = useState("KYK Academy");
  const [footerText, setFooterText] = useState("© 2024 KYK Badminton Academy. All Rights Reserved.");
  
  // SEO State
  const [seoTitle, setSeoTitle] = useState("KYK Badminton Academy | Elite Training for Champions");
  const [seoDesc, setSeoDesc] = useState("Join the premier center for badminton excellence. Professional coaching, elite fitness, and a winning mindset.");
  
  // Appearance State
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [secondaryColor, setSecondaryColor] = useState("#FFC107");
  
  // Assets State
  const [logo, setLogo] = useState("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200");
  const [favicon, setFavicon] = useState("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=32");
  
  // Social State
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Instagram', url: 'https://instagram.com/kykacademy' },
    { platform: 'Facebook', url: 'https://facebook.com/kykacademy' }
  ]);

  const [isDirty, setIsDirty] = useState(false);

  const handleSave = () => {
    toast.success("Global settings saved successfully!");
    setIsDirty(false);
  };

  const handleImageUpload = (type: 'logo' | 'favicon', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') setLogo(reader.result as string);
        else setFavicon(reader.result as string);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocial = () => {
    setSocialLinks([...socialLinks, { platform: 'Twitter', url: '' }]);
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Global Site Settings</h2>
          <p className="text-slate-500 font-medium">Control the brand identity, appearance, and search presence.</p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setIsDirty(false)}
            className="h-14 rounded-2xl text-slate-400 font-bold hover:bg-slate-50"
          >
            <RefreshCcw className="mr-2" size={20} />
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isDirty}
            className="h-14 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 disabled:opacity-50"
          >
            <Save className="mr-2" size={20} />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Brand Assets */}
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Brand Assets</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Logo</label>
              <div className="relative group aspect-video rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200">
                <img src={logo} alt="Logo" className="max-h-20 max-w-[80%] object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-bold text-xs">
                    Upload New
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logo', e)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Favicon</label>
              <div className="relative group w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200">
                <img src={favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <Upload className="text-white" size={16} />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('favicon', e)} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website Name</label>
            <Input 
              value={siteName} 
              onChange={(e) => { setSiteName(e.target.value); setIsDirty(true); }}
              className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
            />
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Palette size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Appearance</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Color</label>
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl shadow-sm border border-slate-100" style={{ backgroundColor: primaryColor }} />
                <Input 
                  value={primaryColor} 
                  onChange={(e) => { setPrimaryColor(e.target.value); setIsDirty(true); }}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-mono font-bold" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secondary Color</label>
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl shadow-sm border border-slate-100" style={{ backgroundColor: secondaryColor }} />
                <Input 
                  value={secondaryColor} 
                  onChange={(e) => { setSecondaryColor(e.target.value); setIsDirty(true); }}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-mono font-bold" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Footer Attribution Text</label>
            <Input 
              value={footerText} 
              onChange={(e) => { setFooterText(e.target.value); setIsDirty(true); }}
              className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
            />
          </div>
        </Card>

        {/* SEO Settings */}
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Search Optimization (SEO)</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">SEO Title Tag</label>
              <Input 
                value={seoTitle} 
                onChange={(e) => { setSeoTitle(e.target.value); setIsDirty(true); }}
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Description</label>
              <Textarea 
                value={seoDesc} 
                onChange={(e) => { setSeoDesc(e.target.value); setIsDirty(true); }}
                className="min-h-[120px] rounded-[2rem] bg-slate-50 border-none font-medium p-6 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Social Media Links</h3>
            </div>
            <Button 
              onClick={addSocial}
              variant="ghost" 
              className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81] hover:bg-slate-50"
            >
              <Plus className="mr-1" size={14} /> Add Platform
            </Button>
          </div>

          <div className="space-y-4">
            {socialLinks.map((link, idx) => (
              <div key={idx} className="flex gap-4 items-center animate-in slide-in-from-left-4 duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#0F4C81]">
                  {link.platform.includes('Instagram') && <Instagram size={18} />}
                  {link.platform.includes('Facebook') && <Facebook size={18} />}
                  {link.platform.includes('Twitter') && <Twitter size={18} />}
                  {link.platform.includes('Youtube') && <Youtube size={18} />}
                  {!['Instagram', 'Facebook', 'Twitter', 'Youtube'].includes(link.platform) && <Globe size={18} />}
                </div>
                <Input 
                  placeholder="Platform Name"
                  value={link.platform}
                  onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                  className="h-12 w-32 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                />
                <Input 
                  placeholder="Profile URL"
                  value={link.url}
                  onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                  className="h-12 flex-grow rounded-xl bg-slate-50 border-none font-medium text-xs" 
                />
                <Button 
                  variant="ghost" 
                  onClick={() => removeSocial(idx)}
                  className="w-12 h-12 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentSettings;