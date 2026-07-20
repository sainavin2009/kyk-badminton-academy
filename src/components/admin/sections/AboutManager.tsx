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
  X, 
  Eye, 
  AlertCircle, 
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ImageUpload from '../shared/ImageUpload';

const TITLE_LIMIT = 60;
const CONTENT_LIMIT = 1000;

const AboutManager = () => {
  const { settings, refresh } = useSettings();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<{title?: string; content?: string}>({});

  useEffect(() => {
    if (settings) {
      setTitle(settings.about_heading || "");
      setContent(settings.about_content || "");
      setImage(settings.about_image || "");
    }
  }, [settings]);

  useEffect(() => {
    const newErrors: {title?: string; content?: string} = {};
    if (title.length < 5) newErrors.title = "Title is too short (min 5 characters)";
    if (content.length < 50) newErrors.content = "Content is too short (min 50 characters)";
    setErrors(newErrors);
  }, [title, content]);

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before saving");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          about_heading: title,
          about_content: content,
          about_image: image
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success("Academy identity updated successfully!");
      setIsDirty(false);
      await refresh();
    } catch (err: any) {
      toast.error("Failed to update: " + err.message);
    }
  };

  const handleCancel = () => {
    if (settings) {
      setTitle(settings.about_heading);
      setContent(settings.about_content);
      setImage(settings.about_image);
    }
    setIsDirty(false);
    toast.info("Changes discarded");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Identity</h2>
          <p className="text-slate-500 font-medium">Customize the core branding and about section content.</p>
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
        <div className={cn(
          "space-y-6 transition-all duration-500",
          previewMode ? "lg:col-span-6" : "lg:col-span-8"
        )}>
          <Card className="p-8 md:p-10 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Heading</label>
                <span className={cn(
                  "text-[10px] font-bold",
                  title.length > TITLE_LIMIT ? "text-red-500" : "text-slate-400"
                )}>
                  {title.length}/{TITLE_LIMIT}
                </span>
              </div>
              <Input 
                value={title}
                onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
                className={cn(
                  "h-16 rounded-2xl bg-slate-50 border-none font-black text-xl text-[#0F4C81] focus-visible:ring-2 focus-visible:ring-[#FFC107] transition-all",
                  errors.title && "ring-2 ring-red-500/20"
                )}
              />
              {errors.title && <p className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-2"><AlertCircle size={14} /> {errors.title}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Featured Image</label>
              <ImageUpload 
                value={image}
                onChange={(url) => { setImage(url); setIsDirty(true); }}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mission Statement</label>
                <span className={cn(
                  "text-[10px] font-bold",
                  content.length > CONTENT_LIMIT ? "text-red-500" : "text-slate-400"
                )}>
                  {content.length}/{CONTENT_LIMIT}
                </span>
              </div>
              <Textarea 
                value={content}
                onChange={(e) => { setContent(e.target.value); setIsDirty(true); }}
                className={cn(
                  "min-h-[200px] rounded-[2rem] bg-slate-50 border-none font-medium text-slate-600 leading-relaxed p-8 focus-visible:ring-2 focus-visible:ring-[#FFC107] transition-all resize-none",
                  errors.content && "ring-2 ring-red-500/20"
                )}
              />
              {errors.content && <p className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-2"><AlertCircle size={14} /> {errors.content}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <Button 
                disabled={!isDirty || Object.keys(errors).length > 0}
                onClick={handleSave}
                className="h-16 px-10 flex-grow rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20"
              >
                <Save className="mr-2" size={20} />
                Save Changes
              </Button>
              <Button variant="ghost" onClick={handleCancel} disabled={!isDirty} className="h-16 px-10 rounded-2xl text-slate-400 font-bold hover:bg-slate-50">
                <X className="mr-2" size={20} />
                Cancel
              </Button>
            </div>
          </Card>
        </div>

        {!previewMode && (
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-8 rounded-[3rem] bg-[#0F4C81] text-white border-none shadow-xl space-y-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#FFC107]">
                   <ImageIcon size={24} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black uppercase tracking-tighter">Hero Card Visual</h3>
                   <p className="text-xs text-white/60 font-medium leading-relaxed">The image you upload here will be displayed as the main feature on your homepage with the "Elite Training Session" floating badge.</p>
                </div>
             </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutManager;