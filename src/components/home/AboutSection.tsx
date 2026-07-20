"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Award, 
  Zap, 
  Ruler, 
  Star, 
  Trophy, 
  Image as LucideImage 
} from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const highlights = [
  { icon: Award, title: "NS-NIS Certified", description: "Learn from expert coaches certified by the premier national sports institute." },
  { icon: Target, title: "Scientific Methods", description: "Data-driven training focusing on biomechanics and performance optimization." },
  { icon: Zap, title: "Agility Focus", description: "Specialized physical fitness and agility development for all age groups." },
  { icon: Ruler, title: "Pro Infrastructure", description: "International standard synthetic courts for an elite training experience." },
  { icon: Users, title: "All Ages Welcome", description: "Structured progression programs designed for both kids and adults." },
  { icon: Star, title: "Technique Mastery", description: "Deep-dive focus on footwork, technique, and tactical court awareness." }
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
                {settings?.about_content || 'At KYK Academy, we provide professional coaching for kids and adults using NS-NIS certified scientific training methods. Our focus is on physical fitness, agility, and technical footwork on international standard synthetic courts.'}
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
            {/* Redesigned Floating Feature Card */}
            <div className="absolute top-10 -left-12 z-20 hidden xl:block animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
              <div className="relative group">
                <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-[280px] relative overflow-hidden border-4 border-white aspect-[4/5]">
                  {settings?.hero_card_image_url ? (
                    <img 
                      src={settings.hero_card_image_url} 
                      alt={settings.hero_card_title || 'Feature'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-200 bg-white">
                      <LucideImage size={40} strokeWidth={1} />
                    </div>
                  )}
                  
                  {/* Overlay Gradient and Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/20 to-transparent flex flex-col justify-end p-8">
                    <h4 className="text-white font-black uppercase tracking-tight text-xl leading-tight">
                      {settings?.hero_card_title || 'Elite Training Session'}
                    </h4>
                    <p className="text-[#FFC107] font-black uppercase text-[9px] tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Master the Court
                    </p>
                  </div>
                </div>

                {/* Relocated gold #1 badge to overlap the floating card corner */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFC107] rounded-3xl flex items-center justify-center shadow-2xl rotate-12 z-30 group-hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <div className="text-[#0F4C81] text-4xl font-black italic">#1</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white bg-white aspect-[4/5] flex items-center justify-center">
              {settings?.about_image ? (
                <img 
                  src={settings.about_image} 
                  alt="Elite Training Session"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-200">
                  <LucideImage size={64} strokeWidth={1} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Academy Visual</p>
                </div>
              )}
            </div>

            <div className="absolute -bottom-10 -right-10 w-full h-full bg-[#0F4C81]/5 rounded-[4rem] -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);