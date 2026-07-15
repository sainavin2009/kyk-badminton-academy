"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Heart, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BadmintonGallery from './BadmintonGallery';
import CrossFitGallery from './CrossFitGallery';

const activities = [
  {
    id: 'badminton',
    label: 'Badminton',
    icon: Trophy,
    title: 'Badminton Excellence',
    subtitle: 'Master the Court',
    description: 'Our core program focuses on developing world-class technical skills, lightning-fast footwork, and strategic game intelligence.',
    color: '#0F4C81'
  },
  {
    id: 'crossfit',
    label: 'CrossFit',
    icon: Zap,
    title: 'CrossFit Power',
    subtitle: 'Build the Foundation',
    description: 'Designed specifically to complement high-performance sports. Functional strength and explosive power sessions.',
    color: '#FFC107'
  }
];

const ActivitiesSection = () => {
  const [activeTab, setActiveTab] = useState(activities[0].id);

  const currentActivity = activities.find(a => a.id === activeTab)!;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#0F4C81] mb-4"
          >
            Train Like a <span className="text-[#FFC107]">Pro</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            We offer specialized training environments tailored to your specific goals and athletic needs.
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="relative flex bg-white p-1.5 rounded-full shadow-md border border-slate-200">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveTab(activity.id)}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-colors z-10 ${
                  activeTab === activity.id ? 'text-[#0F4C81]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <activity.icon size={18} />
                  {activity.label}
                </div>
                {activeTab === activity.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FFC107] rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Tab Header Info */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
              <h3 className="text-sm font-bold tracking-[0.2em] text-[#0F4C81] uppercase">{currentActivity.subtitle}</h3>
              <h4 className="text-4xl font-black text-[#0F4C81]">{currentActivity.title}</h4>
              <p className="text-lg text-slate-600">{currentActivity.description}</p>
            </div>

            {/* Tab Specific Content */}
            {activeTab === 'badminton' ? (
              <BadmintonGallery />
            ) : (
              <CrossFitGallery />
            )}

            <div className="flex justify-center pt-8">
              <Button asChild size="lg" className="rounded-full bg-[#0F4C81] hover:bg-[#0F4C81]/90 px-10 group">
                <Link to="/programs">
                  View Full Program
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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