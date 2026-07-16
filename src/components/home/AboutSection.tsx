"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, GraduationCap, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';

const highlights = [
  { icon: Target, title: "Precision Vision", description: "Developing technical surgicality for circuit dominance." },
  { icon: Users, title: "Elite Mentorship", description: "Learn from coaches who have stood on national podiums." },
  { icon: Shield, title: "Iron Discipline", description: "We don't just build athletes; we forge character." },
  { icon: GraduationCap, title: "Scientific Growth", description: "Data-driven performance tracking." }
];

const AboutSection = () => {
  const { settings } = useSettings();

  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-5 py-2 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-[10px] font-black tracking-[0.3em] uppercase border border-[#FFC107]/20"
              >
                The Academy Standard
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-[#0F4C81] leading-[0.9] tracking-tighter uppercase"
              >
                {settings?.about_heading || 'Forging the Next Generation'}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium"
              >
                {settings?.about_content || 'At KYK Academy, we believe badminton is a game of millimeters.'}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {highlights.map((item, index) => (
                <div key={index} className="group flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0F4C81] group-hover:bg-[#FFC107] transition-all">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-[#0F4C81] text-sm uppercase tracking-wider">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src={settings?.about_image || 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200'} 
                alt="Elite Training Session"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);