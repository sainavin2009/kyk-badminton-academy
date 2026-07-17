"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Undo2, MapPin, Phone, Clock, MessageSquare, Instagram, Mail } from 'lucide-react';
import { toast } from 'sonner';

const ContactInformationManager = () => {
  const { contactInfo, refresh } = useSettings();
  const [formData, setFormData] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (contactInfo) {
      setFormData({ ...contactInfo });
    }
  }, [contactInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('contact_information')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success('Contact information updated successfully');
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error('Failed to save changes: ' + err.message);
    }
  };

  const handleReset = () => {
    if (contactInfo) {
      setFormData({ ...contactInfo });
      setIsDirty(false);
      toast.info('Changes discarded');
    }
  };

  if (!formData) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Contact Information</h2>
          <p className="text-slate-500 font-medium">Manage the academy's official contact details and location.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={handleReset}
            disabled={!isDirty}
            className="h-14 px-6 rounded-2xl text-slate-400 font-bold"
          >
            <Undo2 className="mr-2" size={20} /> Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isDirty}
            className="h-14 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all"
          >
            <Save className="mr-2" size={20} /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-[#0F4C81] rounded-2xl"><MapPin size={24} /></div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase">Academy Presence</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Name</Label>
              <Input name="academy_name" value={formData.academy_name} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Physical Address</Label>
              <Textarea name="address" value={formData.address} onChange={handleInputChange} className="min-h-[120px] rounded-2xl bg-slate-50 border-none font-bold p-5 resize-none" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Google Maps Embed URL</Label>
              <Input name="google_maps_url" value={formData.google_maps_url} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-medium text-xs" />
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Phone size={24} /></div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase">Communication</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Phone</Label>
                <Input name="primary_phone" value={formData.primary_phone} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secondary Phone</Label>
                <Input name="secondary_phone" value={formData.secondary_phone} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input name="email" value={formData.email} onChange={handleInputChange} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp Number</Label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input name="whatsapp_number" value={formData.whatsapp_number} onChange={handleInputChange} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram URL</Label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input name="instagram_url" value={formData.instagram_url} onChange={handleInputChange} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={24} /></div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase">Operational Hours</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monday – Friday</Label>
              <Input name="monday_friday_hours" value={formData.monday_friday_hours} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Saturday</Label>
              <Input name="saturday_hours" value={formData.saturday_hours} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sunday</Label>
              <Input name="sunday_hours" value={formData.sunday_hours} onChange={handleInputChange} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactInformationManager;