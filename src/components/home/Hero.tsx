"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F4C81]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070')`,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C81]/80 via-[#0F4C81]/60 to-[#0F4C81]/95" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#FFC107] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-6 bg-[#0F4C81]/80 backdrop-blur-md border-2 border-[#FFC107] rounded-full">
              <Trophy className="w-12 h-12 md:w-20 md:h-20 text-[#FFC107]" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9] text-balance">
            KYK <span className="text-[#FFC107]">Badminton</span> <br className="hidden md:block" /> Academy
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-medium tracking-wide italic">
            "Train Hard. Play Smart. Achieve Greatness."
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 text-xl font-bold shadow-xl shadow-[#FFC107]/20 transition-all hover:scale-105 active:scale-95 group"
            >
              <Link to="/join">
                Join Now
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 rounded-full border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 text-xl font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              <Link to="/programs">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFC107] to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;