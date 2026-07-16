"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';

const iconMap: Record<string, any> = {
  Star,
  Trophy,
  Zap,
};

const Programs = () => {
  const { programs } = useSettings();

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Master the <span className="text-[#FFC107]">Game</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
              From absolute beginners to national champions, we have a specialized path for every athlete.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, idx) => {
              const Icon = iconMap[program.icon_name] || Star;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <div className={`w-20 h-20 rounded-[1.5rem] ${program.color_class} flex items-center justify-center mb-8`}>
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">{program.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                        {program.age_range}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {program.features?.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-3 text-sm font-bold text-[#0F4C81]/80">
                        <ShieldCheck className="text-[#FFC107] w-5 h-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white font-black uppercase tracking-widest">
                    <Link to="/join">Enquire Now</Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;