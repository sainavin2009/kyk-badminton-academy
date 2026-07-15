"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  RefreshCcw, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ExternalLink,
  Eye,
  X,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Timing {
  days: string;
  hours: string;
}

const ContactManager = () => {
  // Form State
  const [address, setAddress] = useState("123 Smash Court, Badminton Valley, Sports City 54321");
  const [phone, setPhone] = useState("+1 (234) 567-890");
  const [email, setEmail] = useState("info@kykacademy.com");
  const [whatsapp, setWhatsapp] = useState("1234567890");
  const [mapLink, setMapLink] = useState("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070");
  const [timings, setTimings] = useState<Timing[]>([
    { days: "Mon - Sat", hours: "6:00 AM - 10:00 PM" },
    { days: "Sun", hours: "8:00 AM - 1:00 PM" }
  ]);

  // UI State
  const [isDirty, setIsDirty] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initial State for Reset
  const initialState = {
    address: "123 Smash Court, Badminton Valley, Sports City 54321",
    phone: "+1 (234) 567-890",
    email: "info@kykacademy.com",
    whatsapp: "1234567890",
    mapLink: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070",
    timings: [
      { days: "Mon - Sat", hours: "6:00 AM - 10:00 PM" },
      { days: "Sun", hours: "8:00 AM - 1:00 PM" }
    ]
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.includes('@')) newErrors.email = "Invalid email address";
    if (whatsapp.length < 10) newErrors.whatsapp = "Invalid WhatsApp number";
    if (!address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      toast.success("Contact information updated successfully!");
      setIsDirty(false);
    } else {
      toast.error("Please fix the errors before saving");
    }
  };

  const handleReset = () => {
    setAddress(initialState.address);
    setPhone(initialState.phone);
    setEmail(initialState.email);
    setWhatsapp(initialState.whatsapp);
    setMapLink(initialState.mapLink);
    setTimings(initialState.timings);
    setIsDirty(false);
    setErrors({});
    toast.info("Changes reset to original values");
  };

  const addTiming = () => {
    setTimings([...timings, { days: "", hours: "" }]);
    setIsDirty(true);
  };

  const removeTiming = (index: number) => {
    setTimings(timings.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const updateTiming = (index: number, field: keyof Timing, value: string) => {
    const newTimings = [...timings];
    newTimings[index][field] = value;
    setTimings(newTimings);
    setIsDirty(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Contact Management</h2>
          <p className="text-slate-500 font-medium">Update how athletes can reach the academy.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
            className="h-14 rounded-2xl border-none bg-white shadow-sm font-bold text-[#0F4C81] hover:bg-slate-50"
          >
            {previewMode ? <X className="mr-2" size={20} /> : <Eye className="mr-2" size={20} />}
            {previewMode ? "Close Preview" : "Live Preview"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className={cn(
          "space-y-6 transition-all duration-500",
          previewMode ? "lg:col-span-6" : "lg:col-span-8"
        )}>
          <Card className="p-8 md:p-10 rounded-[3rem] border-none shadow-sm space-y-10 bg-white">
            {/* Essential Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Email</label>
                <Input 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setIsDirty(true); }}
                  className={cn(
                    "h-14 rounded-2xl bg-slate-50 border-none font-bold",
                    errors.email && "ring-2 ring-red-500/20"
                  )}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Phone</label>
                <Input 
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setIsDirty(true); }}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp Number (Digits Only)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                  <Input 
                    value={whatsapp}
                    onChange={(e) => { setWhatsapp(e.target.value); setIsDirty(true); }}
                    className={cn(
                      "h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold",
                      errors.whatsapp && "ring-2 ring-red-500/20"
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Google Maps URL</label>
                <Input 
                  value={mapLink}
                  onChange={(e) => { setMapLink(e.target.value); setIsDirty(true); }}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold"
                  placeholder="Paste URL or image link"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Physical Address</label>
                <Textarea 
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); setIsDirty(true); }}
                  className="min-h-[100px] rounded-[2rem] bg-slate-50 border-none font-bold p-6 resize-none"
                />
              </div>
            </div>

            {/* Timing Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Timings</label>
                <Button 
                  onClick={addTiming}
                  variant="ghost" 
                  className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81] hover:bg-slate-50"
                >
                  <Plus className="mr-1" size={14} /> Add Slot
                </Button>
              </div>
              <div className="space-y-3">
                {timings.map((timing, idx) => (
                  <div key={idx} className="flex gap-3 group">
                    <Input 
                      placeholder="Days (e.g. Mon - Fri)"
                      value={timing.days}
                      onChange={(e) => updateTiming(idx, 'days', e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold flex-1"
                    />
                    <Input 
                      placeholder="Hours (e.g. 9 AM - 6 PM)"
                      value={timing.hours}
                      onChange={(e) => updateTiming(idx, 'hours', e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      onClick={() => removeTiming(idx)}
                      className="h-12 w-12 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50">
              <Button 
                onClick={handleSave}
                disabled={!isDirty}
                className="h-16 px-10 flex-grow rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20"
              >
                <Save className="mr-2" size={20} />
                Save Changes
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleReset}
                disabled={!isDirty}
                className="h-16 px-10 rounded-2xl text-slate-400 font-bold hover:bg-slate-50"
              >
                <RefreshCcw className="mr-2" size={20} />
                Reset
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Column */}
        <div className={cn(
          "transition-all duration-500 space-y-6",
          previewMode ? "lg:col-span-6 block" : "lg:col-span-4 hidden lg:block"
        )}>
          <div className="sticky top-40 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0F4C81]">Widget Preview</span>
              {isDirty ? (
                <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase">
                  <AlertCircle size={12} /> Unsaved Changes
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase">
                  <CheckCircle2 size={12} /> Up to date
                </span>
              )}
            </div>

            <Card className="p-8 rounded-[3rem] border-none shadow-2xl bg-white space-y-8 overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FFC107]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Academy Address</h4>
                    <p className="text-sm font-bold text-[#0F4C81] line-clamp-2">{address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FFC107]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Us</h4>
                    <p className="text-sm font-bold text-[#0F4C81]">{phone}</p>
                    <p className="text-[10px] font-medium text-slate-400">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FFC107]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Hours</h4>
                    {timings.map((t, i) => (
                      <p key={i} className="text-xs font-bold text-[#0F4C81]">{t.days}: {t.hours}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full h-14 rounded-2xl bg-[#25D366] text-white font-black uppercase tracking-widest pointer-events-none opacity-80">
                  <MessageSquare className="mr-2" /> WhatsApp: {whatsapp}
                </Button>
              </div>

              <div className="aspect-video rounded-[2rem] bg-slate-100 overflow-hidden relative">
                <img src={mapLink} alt="Map" className="w-full h-full object-cover grayscale opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <MapPin size={14} className="text-red-500" />
                    <span className="text-[10px] font-black text-[#0F4C81] uppercase tracking-widest">Live Map View</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;