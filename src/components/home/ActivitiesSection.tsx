"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BadmintonGallery from './BadmintonGallery';
import CrossFitGallery from './CrossFitGallery';

const activities = [
  {
    id: 'badminton',
    label: 'Badminton',
    icon: Trophy,
    title: 'Court Mastery',
    subtitle: 'Elite Performance',
    description: 'Our core program focuses on developing world-class technical skills, explosive footwork, and strategic intelligence.',
    color: '#0F4C81'
  },
  {
    id: 'crossfit',
    label: 'CrossFit',
    icon: Zap,
    title: 'CrossFit Power',
    subtitle: 'Base Foundation',
    description: 'Designed specifically to complement high-performance racket sports. Build functional strength and elite stamina.',
    color: '#FFC107'
  }
];

const ActivitiesSection = () => {
  const [activeTab, setActiveTab] = useState(activities[0].id);

  const currentActivity = activities.find(a => a.id === activeTab)!;

  return (
    <section id="activities" className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-4 block"
          >
            Training Domains
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-[#0F4C81] leading-tight uppercase tracking-tighter"
          >
            Train Like a <span className="text-[#FFC107] drop-shadow-sm">Winner</span>
          </motion.h2>
        </div>

        <div className="flex justify-center mb-20">
          <div className="relative flex bg-white p-2 rounded-full shadow-2xl border border-slate-200">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveTab(activity.id)}
                className={`relative px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all z-10 flex items-center gap-3 ${
                  activeTab === activity.id ? 'text-[#0F4C81]' : 'text-slate-400 hover:text-slate-600'
                }`}
                aria-selected={activeTab === activity.id}
                role="tab"
              >
                <activity.icon size={20} strokeWidth={2} />
                {activity.label}
                {activeTab === activity.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FFC107] rounded-full -z-10 shadow-lg shadow-[#FFC107]/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-16"
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-sm font-black tracking-[0.3em] text-[#0F4C81] uppercase opacity-60">
                {currentActivity.subtitle}
              </h3>
              <h4 className="text-4xl md:text-5xl font-black text-[#0F4C81] tracking-tighter uppercase">
                {currentActivity.title}
              </h4>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                {currentActivity.description}
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              {activeTab === 'badminton' ? <BadmintonGallery /> : <CrossFitGallery />}
            </div>

            <div className="flex justify-center pt-8">
              <Button asChild size="lg" className="h-20 px-12 rounded-full bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 text-2xl font-black uppercase tracking-tight shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                <Link to="/programs">
                  View Full Program
                  <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
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