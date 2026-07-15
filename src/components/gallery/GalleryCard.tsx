"use client";

import React, { useState } from 'react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      <img
        src={item.thumbnail || "/placeholder.svg"}
        alt={item.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
          !isLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFC107] text-[#0F4C81] text-[10px] font-black uppercase tracking-widest mb-2">
              {item.category}
            </span>
          )}
          <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
        </div>
      </div>

      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Play className="text-white fill-white ml-1" size={20} />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-[#FFC107] hover:text-[#0F4C81] transition-colors">
          <Maximize2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default GalleryCard;