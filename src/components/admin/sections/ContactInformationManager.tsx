"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Undo2, MapPin, Phone, Clock, MessageSquare, Instagram, Mail, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { WorkingHour } from '@/types/settings';

const ContactInformationManager = () => {
  const { settings, refresh } = useSettings();
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    map_link: '',
    working_hours: [] as WorkingHour[]
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        address: settings.address || '',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsapp: settings.whatsapp || '',
        map_link: settings.map_link || '',
        working_hours: settings.working_hours || []
      });
    }
  }, [settings]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          whatsapp: formData.whatsapp,
          map_link: formData.map_link,
          working_hours: formData.working_hours,
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

  const addTiming = () => {
    setFormData(prev => ({
      ...prev,
      working_hours: [...prev.working_hours, { days: '', hours: '' }]
    }));
    setIsDirty(true);
  };

  const updateTiming = (index: number, field: keyof WorkingHour, value: string) => {
    const next = [...formData.working_hours];
    next[index][field] = value;
    setFormData(prev => ({ ...prev, working_hours: next }));
    setIsDirty(true);
  };

  const removeTiming = (index: number) => {
    setFormData(prev => ({
      ...prev,
      working_hours: prev.working_hours.filter((_, i) => i !== index)
    }));
    setIsDirty(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Contact & Operations</h2>
          <p className="text-slate-500 font-medium">Manage how athletes reach the academy and your training hours.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={() => refresh()}
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
            <h3 className="text-xl font-black text-[#0F4C81] uppercase">Location</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Physical Address</Label>
              <Textarea 
                value={formData.address} 
                onChange={(e) => handleInputChange('address', e.target.value)} 
                className="min-h-[120px] rounded-2xl bg-slate-50 border-none font-bold p-5 resize-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Map Link (URL)</Label>
              <Input 
                value={formData.map_link} 
                onChange={(e) => handleInputChange('map_link', e.target.value)} 
                className="h-14 rounded-2xl bg-slate-50 border-none font-medium text-xs" 
                placeholder="Google Maps link..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Phone size={24} /></div>
            <h3 className="text-xl font-black text-[#0F4C81] uppercase">Contact Details</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Phone</Label>
                <Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</Label>
                <Input value={formData.whatsapp} onChange={(e) => handleInputChange('whatsapp', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[3rem] border-none shadow-sm space-y-8 bg-white lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={24} /></div>
              <h3 className="text-xl font-black text-[#0F4C81] uppercase">Academy Timings</h3>
            </div>
            <Button onClick={addTiming} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]">
              <Plus className="mr-1" size={14} /> Add Slot
            </Button>
          </div>

          <div className="space-y-4">
            {formData.working_hours.map((timing, idx) => (
              <div key={idx} className="flex gap-4 items-center animate-in slide-in-from-left-4 duration-300">
                <Input 
                  placeholder="Days (e.g. Mon - Fri)"
                  value={timing.days}
                  onChange={(e) => updateTiming(idx, 'days', e.target.value)}
                  className="h-14 flex-1 rounded-2xl bg-slate-50 border-none font-bold" 
                />
                <Input 
                  placeholder="Hours (e.g. 6:00 AM - 9:00 PM)"
                  value={timing.hours}
                  onChange={(e) => updateTiming(idx, 'hours', e.target.value)}
                  className="h-14 flex-1 rounded-2xl bg-slate-50 border-none font-bold" 
                />
                <Button variant="ghost" onClick={() => removeTiming(idx)} className="h-14 w-14 rounded-2xl text-slate-300 hover:text-red-500">
                  <Trash2 size={20} />
                </Button>
              </div>
            ))}
            {formData.working_hours.length === 0 && (
              <div className="py-10 text-center text-slate-300 uppercase text-[10px] font-black">No hours configured.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactInformationManager;