"use client";

import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload = ({ value, onChange, label, className }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PNG, JPG, SVG, or WebP.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Maximum limit is 5MB.');
      return false;
    }
    return true;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>}
      
      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={cn(
          "relative aspect-video sm:aspect-[3/1] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFC107] hover:bg-slate-100 transition-all overflow-hidden group",
          value && "border-none"
        )}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-contain p-4" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-black uppercase text-xs tracking-widest">Change Image</p>
            </div>
          </>
        ) : (
          <div className="text-center p-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-[#0F4C81]">
              {uploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {uploading ? 'Uploading...' : 'Click to Upload Image'}
            </p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>

      {value && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => { e.stopPropagation(); onChange(''); }}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 text-[10px] font-black uppercase tracking-widest h-8 px-3"
        >
          <X className="mr-1" size={14} /> Remove Image
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;