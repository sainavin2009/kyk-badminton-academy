"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Target, 
  Star, 
  Loader2, 
  ChevronRight, 
  Play, 
  Users, 
  MapPin, 
  GraduationCap, 
  Dumbbell,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Trophy: Trophy,
  Zap: Zap,
  Target: Target,
  Star: Star
};

const Programs = () => {
  const { programs, settings, loading } = useSettings();
  const [showTimings, setShowTimings] = useState(false);
  
  const visiblePrograms = programs.filter(p => p.is_visible);
  // Only show programs that actually have a schedule defined
  const programsWithTimings = visiblePrograms.filter(p => p.schedule && p.schedule.length > 0);

  if (loading) {
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
      {/* Informative Hero Section */}
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

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
              >
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
                  onClick={() => setShowTimings(!showTimings)}
                  variant="outline"
                  className={cn(
                    "h-14 px-10 rounded-full border-2 transition-all font-black uppercase tracking-widest text-base backdrop-blur-md",
                    showTimings 
                      ? "bg-[#FFC107] border-[#FFC107] text-[#0F4C81]" 
                      : "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white"
                  )}
                >
                  View Batch Timings
                  <motion.div
                    animate={{ rotate: showTimings ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </Button>
              </motion.div>

              {/* Expandable Batch Timings Section */}
              <AnimatePresence>
                {showTimings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-12 pb-8">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 text-left max-w-6xl mx-auto shadow-2xl">
                        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                          <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl">
                            <Calendar size={28} strokeWidth={2.5} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">Complete Batch Schedule</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107] mt-1">Official Academy Timings</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {programsWithTimings.map((program) => (
                            <motion.div 
                              key={program.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4 group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">🏸</span>
                                <h4 className="font-black uppercase tracking-tight text-white group-hover:text-[#FFC107] transition-colors">{program.title}</h4>
                              </div>
                              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                                {program.schedule.map((slot, idx) => (
                                  <div key={idx} className="space-y-1 border-l-2 border-[#FFC107] pl-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]/60">{slot.label}</p>
                                    <p className="text-sm font-bold text-white/90">{slot.time}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
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