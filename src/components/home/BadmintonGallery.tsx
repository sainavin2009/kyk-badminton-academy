"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const BadmintonGallery = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchBadminton = async () => {
      const { data } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('category', 'Badminton')
        .eq('is_visible', true)
        .order('order_index', { ascending: true })
        .limit(5);
      
      setItems(data || []);
    };
    fetchBadminton();
  }, []);

  if (!items.length) return null;

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
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
             <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#FFC107] rounded-full text-[#0F4C81]">
                   {item.type === 'video' ? <Play size={12} className="fill-current" /> : <ImageIcon size={12} />}
                </div>
             </div>
             <h4 className="text-white font-bold text-lg">{item.title}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BadmintonGallery;