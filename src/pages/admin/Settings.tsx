"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from '@/contexts/SettingsContext';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { Settings as SettingsIcon, Save, ArrowLeft, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
  const { settings, refreshSettings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    about_heading: '',
    about_content: '',
    about_image: '',
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        about_heading: settings.about_heading || '',
        about_content: settings.about_content || '',
        about_image: settings.about_image || '',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .update(formData)
        .eq('id', 1);

      if (error) throw error;

      toast.success('Settings saved successfully');
      await refreshSettings();
    } catch (error: any) {
      toast.error('Update failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-3 bg-white hover:bg-[#FFC107] hover:text-[#0F4C81] rounded-2xl transition-all shadow-sm border border-slate-100 text-slate-400">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tight flex items-center gap-3">
                Site Content
              </h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage landing page sections</p>
            </div>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="h-14 px-8 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0F4C81]/20 flex items-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white space-y-10 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFC107]/10 flex items-center justify-center text-[#0F4C81]">
                <Layout size={20} />
              </div>
              <h2 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">About Section</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">About Image</label>
                  <ImageUpload 
                    value={formData.about_image}
                    onChange={(url) => setFormData(prev => ({ ...prev, about_image: url }))}
                    onRemove={() => setFormData(prev => ({ ...prev, about_image: '' }))}
                  />
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                    Tip: Professional photos with high contrast work best. 4:5 aspect ratio recommended.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Section Heading</label>
                  <Input 
                    value={formData.about_heading}
                    onChange={(e) => setFormData(prev => ({ ...prev, about_heading: e.target.value }))}
                    placeholder="e.g. Forging the Next Generation"
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold text-[#0F4C81]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Section Content</label>
                  <Textarea 
                    value={formData.about_content}
                    onChange={(e) => setFormData(prev => ({ ...prev, about_content: e.target.value }))}
                    placeholder="Tell your story..."
                    rows={6}
                    className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium text-slate-600 resize-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;