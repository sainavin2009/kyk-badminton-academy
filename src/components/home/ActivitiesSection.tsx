"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Heart, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const activities = [
  {
    id: 'badminton',
    label: 'Badminton',
    icon: Trophy,
    title: 'Elite Badminton Coaching',
    subtitle: 'Master the Court with Professional Guidance',
    description: 'Our core program focuses on developing world-class technical skills, lightning-fast footwork, and strategic game intelligence. Whether you are a beginner or an elite athlete, we have a path for you.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070',
    benefits: [
      { icon: Target, text: 'Precision Stroke Techniques' },
      { icon: Zap, text: 'Explosive Court Movement' },
      { icon: Heart, text: 'Competitive Match Play' }
    ],
    color: '#0F4C81'
  },
  {
    id: 'crossfit',
    label: 'CrossFit',
    icon: Zap,
    title: 'CrossFit for Athletes',
    subtitle: 'Build the Foundation of a Champion',
    description: 'Designed specifically to complement high-performance sports. Our CrossFit sessions focus on functional strength, explosive power, and metabolic conditioning to keep you performing at your peak.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070',
    benefits: [
      { icon: Zap, text: 'Functional Power' },
      { icon: Heart, text: 'Elite Endurance' },
      { icon: Target, text: 'Core Stability' }
    ],
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
        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              {/* Text Content */}
              <div className="lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-[0.2em] text-[#0F4C81] uppercase">{currentActivity.subtitle}</h3>
                  <h4 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight">
                    {currentActivity.title.split(currentActivity.label)[0]}
                    <span className="text-[#FFC107]">{currentActivity.label}</span>
                    {currentActivity.title.split(currentActivity.label)[1]}
                  </h4>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {currentActivity.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentActivity.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#0F4C81]">
                        <benefit.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-tight">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full bg-[#0F4C81] hover:bg-[#0F4C81]/90 px-8 group">
                    <Link to="/join">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FFC107] to-[#0F4C81] opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000"></div>
                  <motion.div 
                    layoutId={`image-${activeTab}`}
                    className="relative aspect-video lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl"
                  >
                    <img 
                      src={currentActivity.image} 
                      alt={currentActivity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/40 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;