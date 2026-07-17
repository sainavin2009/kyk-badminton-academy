"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ChevronRight, Target, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BadmintonGallery from './BadmintonGallery';
import CrossFitGallery from './CrossFitGallery';

const activities = [
  {
    id: 'badminton',
    label: 'Badminton',
    icon: Target,
    title: 'Court Supremacy',
    description: 'Specialized coaching for all skill levels on international standard courts.',
    details: [
      {
        label: "Beginner Batch",
        info: "Morning: 6:00 AM – 7:00 AM | Evening: 4:30 – 5:30 PM, 5:00 – 6:00 PM, 6:00 – 7:00 PM"
      },
      {
        label: "Intermediate Batch",
        info: "Monday – Friday: 6:30 PM – 8:00 PM"
      },
      {
        label: "Adult Batch",
        info: "Monday – Friday: 7:00 PM – 8:00 PM"
      },
      {
        label: "Weekend Batch",
        info: "Saturday: 5:00 PM – 7:00 PM | Sunday: 7:00 AM – 9:00 AM"
      }
    ],
    stats: ["2 Courts", "Elite Coaching", "Junior Programs"]
  },
  {
    id: 'crossfit',
    label: 'CrossFit',
    icon: Zap,
    title: 'SS Performance Lab',
    description: 'Functional power and conditioning designed to build elite athletes and confidence.',
    details: [
      { label: "Batch 1", info: "7:00 AM – 8:00 AM" },
      { label: "Batch 2", info: "8:00 AM – 9:00 AM" },
      { label: "Batch 3", info: "9:00 AM – 10:00 AM" },
      { label: "Trial", info: "Free Trial Class Available" }
    ],
    features: [
      "Functional Strength",
      "Endurance Improvement",
      "Conditioning",
      "Confidence Building",
      "Goal-based Training",
      "Community Driven"
    ],
    stats: ["Strength Drills", "Conditioning", "Mobility Focus"]
  }
];

const ActivitiesSection = () => {
  const [activeTab, setActiveTab] = useState(activities[0].id);
  const currentActivity = activities.find(a => a.id === activeTab)!;

  return (
    <section id="activities" className="py-32 md:py-48 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block"
          >
            Training Specializations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black text-[#0F4C81] leading-[0.85] uppercase tracking-tighter"
          >
            The Path to <span className="text-[#FFC107]">Greatness</span>
          </motion.h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose your domain. Our dual-focus training environment ensures you have the power to match your skill.
          </p>
        </div>

        {/* Premium Tab Switcher */}
        <div className="flex justify-center mb-24">
          <div className="relative flex bg-white p-3 rounded-[2.5rem] shadow-2xl border border-slate-100 min-w-[400px]">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveTab(activity.id)}
                className={`relative flex-1 px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all z-10 flex items-center justify-center gap-3 ${
                  activeTab === activity.id ? 'text-[#0F4C81]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <activity.icon size={18} strokeWidth={2.5} />
                {activity.label}
                {activeTab === activity.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FFC107] rounded-[2rem] -z-10 shadow-xl shadow-[#FFC107]/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-12 border-b border-slate-200">
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-2">
                  <h4 className="text-4xl font-black text-[#0F4C81] tracking-tight uppercase">
                    {currentActivity.title}
                  </h4>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {currentActivity.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentActivity.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1"><Clock size={16} className="text-[#FFC107]" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]">{detail.label}</p>
                        <p className="text-xs font-bold text-slate-500">{detail.info}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {currentActivity.features && (
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {currentActivity.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase">
                        <CheckCircle2 size={12} className="text-[#FFC107]" /> {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 md:flex-col lg:flex-row">
                {currentActivity.stats.map((stat, i) => (
                  <div key={i} className="px-6 py-4 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col min-w-[140px]">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Academy Pro</span>
                    <span className="text-sm font-black text-[#0F4C81]">{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {activeTab === 'badminton' ? <BadmintonGallery /> : <CrossFitGallery />}
            </div>

            <div className="flex justify-center pt-12">
              <Button asChild className="h-18 px-14 rounded-full bg-[#0F4C81] text-white hover:bg-black transition-all duration-500 text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 group">
                <Link to="/join" className="flex items-center gap-3">
                  Join the Squad
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ActivitiesSection;