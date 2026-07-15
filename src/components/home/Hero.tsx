"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F4C81]">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C81]/80 via-[#0F4C81]/60 to-[#0F4C81]/95" />
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        {/* Large Logo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-44 md:h-44 bg-white/10 backdrop-blur-2xl rounded-[3rem] border-2 border-[#FFC107] flex items-center justify-center shadow-2xl shadow-[#FFC107]/20">
            <Trophy className="w-16 h-16 md:w-24 md:h-24 text-[#FFC107]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter uppercase leading-[0.85]"
          >
            KYK <span className="text-[#FFC107]">Academy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-white/80 font-bold tracking-tight italic"
          >
            Elevating Your Game to <span className="text-[#FFC107]">National Standards.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 text-lg font-black shadow-xl transition-all hover:scale-105 active:scale-95 group uppercase tracking-widest"
            >
              <Link to="/join">
                Enroll Now
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 rounded-full border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 text-lg font-black backdrop-blur-md transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              <a href="#activities" className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                View Gallery
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFC107] to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;