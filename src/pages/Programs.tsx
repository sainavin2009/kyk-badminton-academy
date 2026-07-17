"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Clock, Zap, Target, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';

const iconMap: Record<string, any> = {
  Trophy: Trophy,
  Zap: Zap,
  Target: Target,
  Star: Star
};

const Programs = () => {
  const { programs, loading } = useSettings();
  const visiblePrograms = programs.filter(p => p.is_visible);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#0F4C81]" size={48} />
      </div>
    );
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {visiblePrograms.map((program, idx) => {
              const Icon = iconMap[program.icon_name] || Trophy;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-10 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <div className={`w-16 h-16 rounded-2xl ${program.color_class || 'bg-blue-50'} text-[#0F4C81] flex items-center justify-center mb-8 group-hover:bg-[#FFC107] transition-colors`}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">{program.age_range}</span>
                      <h3 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tight leading-none">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-base text-slate-500 font-medium leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  <div className="space-y-6 flex-grow">
                    {program.schedule && program.schedule.length > 0 && (
                      <div className="space-y-3 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81] flex items-center gap-2">
                          <Clock size={12} /> Training Schedule
                        </h4>
                        <div className="space-y-2">
                          {program.schedule.map((item, sidx) => (
                            <div key={sidx} className="flex justify-between items-start gap-4 text-xs">
                              <span className="font-bold text-[#0F4C81] whitespace-nowrap">{item.label}</span>
                              <span className="text-slate-500 font-medium text-right">{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-xs font-bold text-[#0F4C81]/70">
                          <ShieldCheck className="text-[#FFC107] w-4 h-4 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full h-14 mt-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/10">
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