"use client";

import React, { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/utils/upload';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, onRemove, className }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      onChange(url);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Ensure you have created a "media" bucket in Supabase Storage.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-4 w-full ${className}`}>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-48 h-60 rounded-3xl overflow-hidden group border-4 border-white shadow-xl">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="w-48 h-60 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-[#FFC107] hover:bg-slate-50 transition-all group">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[#0F4C81] animate-spin" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#FFC107]/10 group-hover:text-[#FFC107] transition-all mb-3">
                  <ImageIcon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#0F4C81]">Select Image</span>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;