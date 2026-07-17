"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CrossFitGallery = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCrossFit = async () => {
      const { data } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('category', 'CrossFit')
        .eq('is_visible', true)
        .order('order_index', { ascending: true })
        .limit(5);
      
      setItems(data || []);
    };
    fetchCrossFit();
  }, []);

  if (!items.length) {
    return (
      <div className="py-20 text-center bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200">
         <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">CrossFit Action Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative group overflow-hidden rounded-3xl shadow-lg bg-slate-200 ${index === 0 ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}`}
        >
          <img
            src={item.type === 'video' ? item.thumbnail : item.url}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-[#FFC107] rounded-full text-[#0F4C81]">
                {item.type === 'video' ? <Play size={12} className="fill-current" /> : <Zap size={12} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                CrossFit Performance
              </span>
            </div>
            <h4 className="text-white font-bold text-lg">{item.title}</h4>
          </div>

          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                <Play className="fill-current" size={20} />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CrossFitGallery;