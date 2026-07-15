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
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  item?: any;
  type: 'image' | 'video';
}

const MediaModal = ({ isOpen, onClose, onSave, item, type }: MediaModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setUrl(item.url || '');
      setThumbnail(item.thumbnail || '');
      setPreview(item.type === 'video' ? item.thumbnail : item.url);
    } else {
      setTitle('');
      setDescription('');
      setUrl('');
      setThumbnail('');
      setPreview(null);
    }
  }, [item, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setUrl(result);
        if (type === 'video' && !thumbnail) {
          setThumbnail(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title || !url) {
      toast.error('Please fill in the required fields');
      return;
    }

    onSave({
      id: item?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      type,
      url,
      thumbnail: type === 'video' ? (thumbnail || url) : undefined,
    });
    
    toast.success(item ? 'Asset updated successfully' : 'Asset added successfully');
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
              {item ? 'Modify your existing gallery asset.' : `Add a new ${type} to your professional gallery.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Media Title *</Label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Morning Sprints"
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the story behind this shot..."
                  className="min-h-[120px] rounded-2xl bg-slate-50 border-none font-medium p-4 resize-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preview & Upload</Label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFC107] hover:bg-slate-100 transition-all overflow-hidden group",
                  preview && "border-none"
                )}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-black uppercase text-xs tracking-widest">Change File</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-[#0F4C81]">
                      {type === 'image' ? <ImageIcon size={24} /> : <Play size={24} />}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Click to Upload</p>
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
              
              {type === 'video' && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Video URL (Optional)</Label>
                  <Input 
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); if(!preview) setPreview(e.target.value); }}
                    placeholder="Youtube/Vimeo link"
                    className="h-10 rounded-xl bg-slate-50 border-none font-medium text-xs focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                  />
                </div>
              )}
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
            className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all"
          >
            <Check className="mr-2" size={20} />
            {item ? 'Update Asset' : 'Add to Gallery'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;