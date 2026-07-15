"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#0F4C81]">
      {/* Background with optimized image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop')`,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C81]/90 via-[#0F4C81]/60 to-[#0F4C81]/95" />
      </div>

      <motion.div 
        className="container relative z-10 px-4 mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-10 flex justify-center">
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
            className="relative p-6 bg-white/10 backdrop-blur-xl border-2 border-[#FFC107]/50 rounded-full shadow-2xl shadow-[#FFC107]/10"
          >
            <Trophy className="w-14 h-14 md:w-24 md:h-24 text-[#FFC107]" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <div className="space-y-6 md:space-y-10">
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter uppercase leading-[0.85] text-balance"
          >
            KYK <span className="text-[#FFC107] drop-shadow-[0_0_30px_rgba(255,193,7,0.3)]">Badminton</span> <br className="hidden md:block" /> Academy
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-3xl text-white/80 max-w-2xl mx-auto font-bold tracking-tight italic"
          >
            "Train Hard. Play Smart. <span className="text-[#FFC107]">Achieve Greatness.</span>"
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto h-20 px-12 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 text-2xl font-black shadow-2xl shadow-[#FFC107]/20 transition-all hover:scale-105 active:scale-95 group uppercase tracking-tight"
            >
              <Link to="/join">
                Start Training
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-20 px-12 rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 text-2xl font-black backdrop-blur-md transition-all hover:scale-105 active:scale-95 uppercase tracking-tight"
            >
              <Link to="/programs">Our Programs</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#FFC107] to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;