"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Save, 
  RefreshCcw, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { WorkingHour } from '@/types/settings';

const ContactManager = () => {
  const { settings, refresh } = useSettings();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [timings, setTimings] = useState<WorkingHour[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setAddress(settings.address);
      setPhone(settings.phone);
      setEmail(settings.email);
      setWhatsapp(settings.whatsapp);
      setMapLink(settings.map_link);
      setTimings(settings.working_hours || []);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          address,
          phone,
          email,
          whatsapp,
          map_link: mapLink,
          working_hours: timings
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success("Contact information updated!");
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
    }
  };

  const addTiming = () => {
    setTimings([...timings, { days: "", hours: "" }]);
    setIsDirty(true);
  };

  const removeTiming = (index: number) => {
    setTimings(timings.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const updateTiming = (index: number, field: keyof WorkingHour, value: string) => {
    const newTimings = [...timings];
    newTimings[index][field] = value;
    setTimings(newTimings);
    setIsDirty(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Contact Management</h2>
          <p className="text-slate-500 font-medium">Update how athletes can reach the academy.</p>
        </div>
      </div>

      <Card className="p-8 md:p-10 rounded-[3rem] border-none shadow-sm space-y-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Email</label>
            <Input value={email} onChange={(e) => { setEmail(e.target.value); setIsDirty(true); }} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Phone</label>
            <Input value={phone} onChange={(e) => { setPhone(e.target.value); setIsDirty(true); }} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp Number</label>
            <Input value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value); setIsDirty(true); }} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Map Link</label>
            <Input value={mapLink} onChange={(e) => { setMapLink(e.target.value); setIsDirty(true); }} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Physical Address</label>
            <Textarea value={address} onChange={(e) => { setAddress(e.target.value); setIsDirty(true); }} className="min-h-[100px] rounded-[2rem] bg-slate-50 border-none font-bold p-6 resize-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Timings</label>
            <Button onClick={addTiming} variant="ghost" className="text-[10px] font-black text-[#0F4C81] uppercase tracking-widest"><Plus className="mr-1" size={14} /> Add Slot</Button>
          </div>
          <div className="space-y-3">
            {timings.map((timing, idx) => (
              <div key={idx} className="flex gap-3 group">
                <Input placeholder="Days" value={timing.days} onChange={(e) => updateTiming(idx, 'days', e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-bold flex-1" />
                <Input placeholder="Hours" value={timing.hours} onChange={(e) => updateTiming(idx, 'hours', e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-bold flex-1" />
                <Button variant="ghost" onClick={() => removeTiming(idx)} className="h-12 w-12 rounded-xl text-slate-300 hover:text-red-500"><Trash2 size={18} /></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50">
          <Button onClick={handleSave} disabled={!isDirty} className="h-16 px-10 flex-grow rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20">
            <Save className="mr-2" size={20} /> Save Contact Info
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContactManager;