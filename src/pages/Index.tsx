"use client";

import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import ContactSection from '@/components/home/ContactSection';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    document.title = "KYK Badminton Academy | Elite Training for Champions";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <ActivitiesSection />
      
      {/* Performance Statistics / Trust Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Medals Won", value: "150+" },
              { label: "Elite Athletes", value: "80+" },
              { label: "Professional Coaches", value: "12" },
              { label: "Training Courts", value: "10" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-6xl font-black text-[#0F4C81] tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-32 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC107]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black italic leading-tight tracking-tight uppercase">
                "The training at KYK transformed my game. It's not just about speed, it's about the <span className="text-[#FFC107]">winning mindset</span>."
              </h2>
            </motion.div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-[#FFC107]">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" alt="Athlete" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-black uppercase tracking-tight text-[#FFC107]">Rahul Sharma</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">National Junior Rank #4</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default Index;