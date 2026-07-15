"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  category?: string;
  className?: string;
}

const VideoCard = ({ 
  title, 
  description, 
  thumbnail, 
  videoUrl, 
  category,
  className 
}: VideoCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -5 }}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-md transition-all duration-500 hover:shadow-2xl",
            className
          )}
        >
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={thumbnail} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#0F4C81]/20 group-hover:bg-[#0F4C81]/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-2xl transition-all group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] group-hover:border-transparent"
              >
                <Play className="ml-1 fill-current" size={28} />
              </motion.div>
            </div>
            {category && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                  {category}
                </span>
              </div>
            )}
          </div>
          <div className="p-8 space-y-2">
            <h4 className="text-xl font-bold text-[#0F4C81] group-hover:text-[#FFC107] transition-colors line-clamp-1">
              {title}
            </h4>
            {description && (
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none rounded-[2rem] sm:rounded-[3rem]">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <iframe
            src={`${videoUrl}?autoplay=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute top-4 right-4 z-50">
          <DialogClose className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10">
            <X size={20} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCard;