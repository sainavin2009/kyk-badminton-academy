"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Play, 
  Check,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  item?: any;
  type: 'image' | 'video';
}

const CATEGORIES = ['Badminton', 'CrossFit', 'Events', 'Academy'];

const MediaModal = ({ isOpen, onClose, onSave, item, type }: MediaModalProps) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Badminton');
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setCaption(item.caption || '');
      setCategory(item.category || 'Badminton');
      setUrl(item.url || '');
      setPreview(item.url);
    } else {
      setTitle('');
      setCaption('');
      setCategory('Badminton');
      setUrl('');
      setPreview(null);
    }
  }, [item, isOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setProgress(10);

      // Create a local preview
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      setUrl(publicUrl);
      setProgress(100);
      toast.success('File uploaded successfully');
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!title || !url) {
      toast.error('Please fill in the title and upload a file');
      return;
    }

    onSave({
      id: item?.id,
      title,
      caption,
      category,
      type,
      url,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {item ? 'Edit Media' : `Upload ${type === 'image' ? 'Photo' : 'Video'}`}
            </DialogTitle>
            <DialogDescription className="text-white/60 font-medium italic">
              {item ? 'Modify gallery asset metadata.' : `Add a new ${type} to the professional gallery.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6 bg-white max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title *</Label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Smash in Slow Motion"
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107] outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Caption / Story</Label>
                <Textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tell the story behind this asset..."
                  className="min-h-[120px] rounded-2xl bg-slate-50 border-none font-medium p-4 resize-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">File Preview</Label>
              <div 
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={cn(
                  "relative aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFC107] hover:bg-slate-100 transition-all overflow-hidden group",
                  preview && "border-none",
                  uploading && "cursor-wait opacity-70"
                )}
              >
                {uploading ? (
                  <div className="text-center space-y-4">
                    <Loader2 className="animate-spin mx-auto text-[#0F4C81]" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]">Uploading {progress}%</p>
                  </div>
                ) : preview ? (
                  <>
                    {type === 'image' ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <Play className="text-white" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-black uppercase text-xs tracking-widest">Change File</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-[#0F4C81]">
                      <Upload size={24} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drop file here or click</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept={type === 'image' ? 'image/*' : 'video/*'} 
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 flex items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={uploading || !url}
            className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all disabled:opacity-50"
          >
            {uploading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Check className="mr-2" size={20} />}
            {item ? 'Update Asset' : 'Add to Gallery'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;