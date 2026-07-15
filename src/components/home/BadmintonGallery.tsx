"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Trophy, Users, Timer } from 'lucide-react';

const galleryItems = [
  {
    title: "Tournament Highlights",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070",
    icon: Trophy,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Training Sessions",
    category: "Practice",
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070",
    icon: Users,
    span: "col-span-1",
  },
  {
    title: "Action Shots",
    category: "Photos",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070",
    icon: ImageIcon,
    span: "col-span-1",
  },
  {
    title: "Skill Drills",
    category: "Video",
    image: "https://images.unsplash.com/photo-1613912111169-58bc44933a0e?q=80&w=2070",
    icon: Play,
    span: "col-span-1",
    isVideo: true,
  },
  {
    title: "Practice Moments",
    category: "Daily",
    image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=2070",
    icon: Timer,
    span: "col-span-1",
  }
];

const BadmintonGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
      {galleryItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative group overflow-hidden rounded-3xl shadow-lg bg-slate-200 ${item.span}`}
        >
          {/* Background Image */}
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-[#FFC107] rounded-full text-[#0F4C81]">
                <item.icon size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                {item.category}
              </span>
            </div>
            <h4 className="text-white font-bold text-lg">{item.title}</h4>
          </div>

          {/* Video Play Icon Overlay (Only for videos) */}
          {item.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="text-white fill-white" size={20} />
              </div>
            </div>
          )}

          {/* Static Label (Visible when not hovered) */}
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 group-hover:hidden transition-opacity">
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
              {item.category}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BadmintonGallery;