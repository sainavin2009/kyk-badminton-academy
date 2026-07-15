"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GripVertical, 
  Trash2, 
  Edit3, 
  Play, 
  ImageIcon, 
  Eye 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

interface GalleryItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  onDelete: (id: string) => void;
  onEdit: (item: any) => void;
}

const GalleryItemCard = ({ item, onDelete, onEdit }: GalleryItemCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="aspect-square relative overflow-hidden bg-slate-100">
        <img 
          src={item.type === 'video' ? item.thumbnail : item.url} 
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#0F4C81] border border-white/20">
            {item.type === 'video' ? <Play size={10} className="fill-current" /> : <ImageIcon size={10} />}
            {item.type}
          </div>
        </div>

        {/* Drag Handle */}
        <div className="absolute top-4 right-4 z-10 cursor-grab active:cursor-grabbing p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-400 hover:text-[#0F4C81] transition-colors shadow-sm">
          <GripVertical size={18} />
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-[#0F4C81]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button 
            size="icon"
            onClick={() => onEdit(item)}
            className="w-12 h-12 rounded-2xl bg-white text-[#0F4C81] hover:bg-[#FFC107] hover:text-[#0F4C81] shadow-xl border-none"
          >
            <Edit3 size={20} />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="icon"
                className="w-12 h-12 rounded-2xl bg-white text-red-500 hover:bg-red-500 hover:text-white shadow-xl border-none"
              >
                <Trash2 size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2.5rem]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Delete Media?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-500 font-medium">
                  This action cannot be undone. This will permanently delete "{item.title}" from the gallery.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(item.id)}
                  className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="p-6 space-y-1">
        <h4 className="font-bold text-[#0F4C81] truncate text-lg">{item.title}</h4>
        <p className="text-xs text-slate-400 font-medium line-clamp-1">{item.description}</p>
      </div>
    </Card>
  );
};

export default GalleryItemCard;