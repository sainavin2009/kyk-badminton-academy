"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, GraduationCap, Dumbbell, Award } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: "Academy Vision",
    description: "The premier center for badminton excellence, fostering talent and elite sportsmanship."
  },
  {
    icon: Users,
    title: "Expert Coaching",
    description: "Certified national-level coaches with decades of competitive circuit experience."
  },
  {
    icon: Shield,
    title: "Core Discipline",
    description: "Instilling values of respect, punctuality, and mental fortitude in every athlete."
  },
  {
    icon: GraduationCap,
    title: "Holistic Growth",
    description: "Personalized growth charts tracking technical, physical, and mental milestones."
  },
  {
    icon: Dumbbell,
    title: "Physical Elite",
    description: "Specialized strength and conditioning programs optimized for court speed."
  },
  {
    icon: Award,
    title: "Victory Path",
    description: "Strategic match-play preparation for state and national level podium finishes."
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-xs font-black tracking-widest uppercase border border-[#FFC107]/20">
                Academy Excellence
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[#0F4C81] leading-[0.9] tracking-tighter uppercase">
                Shaping the <br />
                <span className="text-[#FFC107]">Next Elite</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                Founded with a passion for excellence, KYK Badminton Academy is more than a gym—it's a high-performance sanctuary for aspiring professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-[#0F4C81] group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[#0F4C81] text-lg uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(15,76,129,0.25)] border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200&auto=format&fit=crop" 
                alt="Elite badminton training at KYK Academy"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 p-8 rounded-[2.5rem] bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20">
                <div className="flex justify-between items-center gap-6">
                  <div className="text-center flex-1">
                    <div className="text-4xl font-black text-[#0F4C81] leading-none mb-1">15+</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Years Exp</div>
                  </div>
                  <div className="w-[1px] h-12 bg-slate-100" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-black text-[#0F4C81] leading-none mb-1">500+</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Athletes</div>
                  </div>
                  <div className="w-[1px] h-12 bg-slate-100" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-black text-[#0F4C81] leading-none mb-1">50+</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Medals</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#FFC107]/15 rounded-full blur-[120px] -z-10" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#0F4C81]/10 rounded-full blur-[120px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;