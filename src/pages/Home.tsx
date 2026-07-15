"use client";

import React from 'react';
// @ts-expect-error - temporary bypass for workspace type resolution
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070')] bg-cover bg-center" />
        <div className="container relative z-10 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
          >
            Nurturing <span className="text-green-500">Champions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Experience world-class badminton coaching at KYK Academy. Elevate your game with our expert-led programs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full bg-green-600 hover:bg-green-700 h-14 px-8 text-lg">
              <Link to="/join">Join the Academy</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white text-white hover:bg-white/10">
              <Link to="/programs">Explore Programs</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;