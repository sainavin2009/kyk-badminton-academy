"use client";

import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import ContactSection from '@/components/home/ContactSection';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    document.title = "KYK Badminton Academy | Landing Page";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <Hero />

      {/* 2. About Us */}
      <AboutSection />

      {/* 3. Activities */}
      <ActivitiesSection />

      {/* Trust & Performance Mid-Section (Optional polish for premium feel) */}
      <section className="py-20 bg-[#0F4C81]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Elite Coaches", value: "12+" },
              { label: "Courts", value: "08" },
              { label: "Active Members", value: "250+" },
              { label: "Medals Won", value: "100+" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-6xl font-black text-[#FFC107] tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact */}
      <ContactSection />
    </div>
  );
};

export default Index;