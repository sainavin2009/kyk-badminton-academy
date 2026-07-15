"use client";

import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  id: string | number;
  type: 'image' | 'video';
  title: string;
  category?: string;
  thumbnail: string;
  videoUrl?: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
}

const GalleryCard = ({ item, index }: GalleryCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedThumbnail = item.thumbnail.includes('unsplash') 
    ? `${item.thumbnail}&auto=format&fit=crop&w=800&q=80`
    : item.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 will-change-transform"
    >
      <div className={cn(
        "absolute inset-0 bg-slate-200 animate-pulse transition-opacity duration-300",
        isLoaded ? "opacity-0" : "opacity-100"
      )} />

      <img
        src={optimizedThumbnail || "/placeholder.svg"}
        alt={item.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105",
          !isLoaded ? "scale-105" : "scale-100"
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-10">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.category && (
            <span className="inline-block px-4 py-1 rounded-full bg-[#FFC107] text-[#0F4C81] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              {item.category}
            </span>
          )}
          <h4 className="text-white font-black text-2xl tracking-tight uppercase leading-tight">{item.title}</h4>
        </div>
      </div>

      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
          >
            <Play className="text-white fill-white ml-1 w-8 h-8" />
          </motion.div>
        </div>
      )}

      <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <button 
          className="p-4 bg-white/10 backdrop-blur-xl rounded-[1.25rem] text-white border border-white/20 hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all"
          aria-label={`View ${item.title}`}
        >
          <Maximize2 size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default memo(GalleryCard);