"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShieldCheck, Clock, Zap, Target, Star, Loader2, ChevronRight, Play, Users, MapPin, GraduationCap, Dumbbell, ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { BatchTiming } from '@/types/batch';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Trophy: Trophy,
  Zap: Zap,
  Target: Target,
  Star: Star
};

const Programs = () => {
  const { programs, settings, loading: settingsLoading } = useSettings();
  const [isBatchPanelOpen, setIsBatchPanelOpen] = useState(false);
  const [batches, setBatches] = useState<BatchTiming[]>([]);
  const [batchesLoading, setBatchesLoading] = useState(true);

  const visiblePrograms = programs.filter(p => p.is_visible);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const { data } = await supabase
          .from('batch_timings')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });
        
        setBatches(data || []);
      } catch (err) {
        console.error('Batch fetch error:', err);
      } finally {
        setBatchesLoading(false);
      }
    };
    fetchBatches();
  }, []);

  if (settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#0F4C81]" size={48} />
      </div>
    );
  }

  const infoBadges = [
    { icon: Target, text: "Beginner to Advanced Coaching" },
    { icon: Users, text: "Kids • Teens • Adults" },
    { icon: MapPin, text: "2 International Synthetic Courts" },
    { icon: GraduationCap, text: "Professional Coaching" },
    { icon: Clock, text: "Morning • Evening • Weekend Batches" },
    { icon: Dumbbell, text: "CrossFit & Conditioning Available" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#0F4C81] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F4C81]/80" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                {settings?.programs_hero_title || 'MASTER THE GAME'}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
                {settings?.programs_hero_subtitle || 'From beginners to competitive athletes, KYK Badminton Academy provides structured coaching for Kids, Teens, and Adults with scientific training methods.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto"
            >
              {infoBadges.map((badge, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[10px] md:text-xs font-black uppercase tracking-wider group hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all duration-300"
                >
                  <badge.icon size={14} className="text-[#FFC107] group-hover:text-[#0F4C81] transition-colors" />
                  {badge.text}
                </div>
              ))}
            </motion.div>

            <div className="space-y-8 pt-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button 
                  asChild 
                  className="h-14 px-10 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-white hover:scale-105 transition-all font-black uppercase tracking-widest text-base shadow-xl group"
                >
                  <Link to="/join">
                    Join Now
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  onClick={() => setIsBatchPanelOpen(!isBatchPanelOpen)}
                  variant="outline"
                  className={cn(
                    "h-14 px-10 rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white transition-all font-black uppercase tracking-widest text-base backdrop-blur-md",
                    isBatchPanelOpen && "bg-[#FFC107] border-transparent text-[#0F4C81] hover:bg-[#FFC107]/90"
                  )}
                >
                  View Batch Timings
                  <ChevronDown className={cn("ml-2 w-5 h-5 transition-transform duration-300", isBatchPanelOpen && "rotate-180")} />
                </Button>
              </div>

              <AnimatePresence>
                {isBatchPanelOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                      {batchesLoading ? (
                         <div className="col-span-full py-10 flex justify-center"><Loader2 className="animate-spin text-[#FFC107]" /></div>
                      ) : batches.map((batch, bIdx) => (
                        <motion.div
                          key={batch.id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: bIdx * 0.1 }}
                          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-left hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl shadow-lg">
                              <Clock size={20} strokeWidth={3} />
                            </div>
                            <div>
                              <h3 className="text-xl font-black uppercase tracking-tight text-[#FFC107]">{batch.batch_name}</h3>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Target Group: {batch.age_group}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-white/40">
                              <Calendar size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{batch.days}</span>
                            </div>
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                              <p className="text-sm font-bold text-white leading-relaxed whitespace-pre-line">
                                {batch.timings}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section id="programs-list" className="py-24 md:py-32">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features?.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-xs font-bold text-[#0F4C81]/70">
                          <ShieldCheck className="text-[#FFC107] w-4 h-4 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full h-14 mt-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20">
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