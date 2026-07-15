"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, GraduationCap, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const highlights = [
  {
    icon: Target,
    title: "Precision Vision",
    description: "Developing the technical surgicality required for international circuit dominance."
  },
  {
    icon: Users,
    title: "Elite Mentorship",
    description: "Learn from coaches who have stood on national podiums."
  },
  {
    icon: Shield,
    title: "Iron Discipline",
    description: "We don't just build athletes; we forge character and mental toughness."
  },
  {
    icon: GraduationCap,
    title: "Scientific Growth",
    description: "Data-driven performance tracking ensuring consistent evolution."
  }
];

const AboutSection = () => {
  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
          {/* Content Side */}
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
                Forging the <br />
                <span className="text-[#FFC107]">Next Generation</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium"
              >
                At KYK Academy, we believe badminton is a game of millimeters. Our training philosophy combines biomechanical precision with strategic warfare.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0F4C81] group-hover:bg-[#FFC107] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-[#0F4C81] text-sm uppercase tracking-wider">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Button asChild variant="link" className="text-[#0F4C81] font-black uppercase tracking-widest p-0 h-auto hover:text-[#FFC107] transition-colors group">
                <Link to="/about" className="flex items-center gap-2">
                  Learn more about our legacy
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200" 
                alt="Elite Training Session"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-[2000ms]"
              />
            </div>

            {/* Stats Badge */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 z-20 bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col gap-6 min-w-[280px]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC107]/10 flex items-center justify-center text-[#FFC107]">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#0F4C81]">100+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tournament Medals</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#0F4C81]/5 flex items-center justify-center text-[#0F4C81]">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#0F4C81]">500+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Athletes</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);