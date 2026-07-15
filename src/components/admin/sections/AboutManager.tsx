"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  X, 
  Upload, 
  Eye, 
  AlertCircle, 
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const TITLE_LIMIT = 60;
const CONTENT_LIMIT = 1000;

const AboutManager = () => {
  // Form State
  const [title, setTitle] = useState("Shaping the Next Elite");
  const [content, setContent] = useState("Founded with a passion for excellence, KYK Badminton Academy is more than a gym—it's a high-performance sanctuary for aspiring professionals.");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200");
  
  // UI State
  const [isDirty, setIsDirty] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Validation
  const [errors, setErrors] = useState<{title?: string; content?: string}>({});

  useEffect(() => {
    const newErrors: {title?: string; content?: string} = {};
    if (title.length < 5) newErrors.title = "Title is too short (min 5 characters)";
    if (content.length < 50) newErrors.content = "Content is too short (min 50 characters)";
    setErrors(newErrors);
  }, [title, content]);

  const handleSave = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before saving");
      return;
    }
    
    toast.success("About Us content updated successfully!");
    setIsDirty(false);
  };

  const handleCancel = () => {
    // Reset to defaults or fetch from API
    setTitle("Shaping the Next Elite");
    setContent("Founded with a passion for excellence, KYK Badminton Academy is more than a gym—it's a high-performance sanctuary for aspiring professionals.");
    setIsDirty(false);
    toast.info("Changes discarded");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">About Us Management</h2>
          <p className="text-slate-500 font-medium">Customize the core identity of the academy.</p>
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
        {/* Editor Side */}
        <div className={cn(
          "space-y-6 transition-all duration-500",
          previewMode ? "lg:col-span-6" : "lg:col-span-8"
        )}>
          <Card className="p-8 md:p-10 rounded-[3rem] border-none shadow-sm space-y-8 bg-white">
            {/* Title Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Academy Heading</label>
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
              {errors.title && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-2">
                  <AlertCircle size={14} /> {errors.title}
                </p>
              )}
            </div>

            {/* Content Input */}
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
                  "min-h-[250px] rounded-[2.5rem] bg-slate-50 border-none font-medium text-slate-600 leading-relaxed p-8 focus-visible:ring-2 focus-visible:ring-[#FFC107] transition-all",
                  errors.content && "ring-2 ring-red-500/20"
                )}
              />
              {errors.content && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-red-500 mt-2">
                  <AlertCircle size={14} /> {errors.content}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Cover Image</label>
              <div className="relative group">
                <div className="aspect-video w-full rounded-[2.5rem] bg-slate-100 overflow-hidden relative">
                  <img src={image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="rounded-full bg-white text-black border-none" asChild>
                      <label className="cursor-pointer">
                        <Upload className="mr-2" size={18} />
                        Change Photo
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <Button 
                disabled={!isDirty || Object.keys(errors).length > 0}
                onClick={handleSave}
                className="h-16 px-10 flex-grow rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 disabled:opacity-50"
              >
                <Save className="mr-2" size={20} />
                Save Changes
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCancel}
                disabled={!isDirty}
                className="h-16 px-10 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 hover:text-red-500"
              >
                <X className="mr-2" size={20} />
                Cancel
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Side */}
        <div className={cn(
          "transition-all duration-500 space-y-6",
          previewMode ? "lg:col-span-6 block" : "lg:col-span-4 hidden lg:block"
        )}>
          <div className="sticky top-40 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0F4C81]">Live Preview</span>
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
            
            <Card className="overflow-hidden rounded-[3.5rem] border-none shadow-2xl bg-white relative">
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-[10px] font-black tracking-widest uppercase border border-[#FFC107]/20">
                    Academy Excellence
                  </span>
                  <h3 className="text-3xl font-black text-[#0F4C81] leading-[0.9] tracking-tighter uppercase break-words">
                    {title.split(' ').slice(0, -2).join(' ')} <br />
                    <span className="text-[#FFC107]">{title.split(' ').slice(-2).join(' ')}</span>
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {content}
                  </p>
                </div>
                
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden">
                  <img src={image} className="w-full h-full object-cover" alt="Preview" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-[2rem] bg-[#0F4C81]/5 border-none">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm text-[#0F4C81]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-[#0F4C81]">Mobile Responsive</h4>
                  <p className="text-[10px] text-slate-500 font-medium">This layout adjusts perfectly for smartphones.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManager;