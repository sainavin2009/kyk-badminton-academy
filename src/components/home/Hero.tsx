"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';

const Hero = () => {
  const { settings } = useSettings();

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F4C81]">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C81]/80 via-[#0F4C81]/40 to-[#0F4C81]/95" />
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFC107] text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC107] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC107]"></span>
            </span>
            Elite Training Academy
          </div>
        </motion.div>

        <div className="space-y-8 max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter uppercase leading-[0.85] will-change-[transform,opacity]"
          >
            {settings?.hero_heading || 'KYK Academy'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-white/70 font-bold tracking-tight italic max-w-3xl mx-auto uppercase"
          >
            SMASH YOUR LIMITS
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Button 
              asChild 
              className="h-16 px-12 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 font-black uppercase tracking-widest text-lg shadow-2xl shadow-[#FFC107]/20 group"
            >
              <Link to="/join">
                Join Now
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              className="h-16 px-12 rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white transition-all duration-300 font-black uppercase tracking-widest text-lg backdrop-blur-md"
            >
              <Link to="/programs">
                View Programs
                <Play className="ml-2 w-4 h-4 fill-current" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);