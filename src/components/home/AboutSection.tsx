"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, GraduationCap, Dumbbell, Award } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: "Academy Vision",
    description: "To be the premier center for badminton excellence, fostering talent and sportsmanship."
  },
  {
    icon: Users,
    title: "Expert Coaching",
    description: "Led by certified national-level coaches with years of competitive experience."
  },
  {
    icon: Shield,
    title: "Core Discipline",
    description: "Instilling values of respect, punctuality, and mental fortitude in every athlete."
  },
  {
    icon: GraduationCap,
    title: "Holistic Growth",
    description: "Personalized growth charts tracking technical and physical milestones."
  },
  {
    icon: Dumbbell,
    title: "Physical Elite",
    description: "Specialized strength and conditioning programs for badminton mastery."
  },
  {
    icon: Award,
    title: "Victory Path",
    description: "Strategic match-play preparation for state and national competitions."
  }
];

const AboutSection = () => {
  return (
    <section className="py-32 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-xs font-black tracking-widest uppercase">
                Our Excellence
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F4C81] leading-[1.1] tracking-tighter">
                Shaping the Next <br />
                <span className="text-[#FFC107]">Generation of Pros</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl text-balance">
                Founded with a passion for excellence, KYK Badminton Academy is a sanctuary for aspiring athletes. We combine technical mastery with mental toughness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0F4C81] group-hover:bg-[#FFC107] group-hover:text-white transition-all duration-500 shadow-sm">
                    <item.icon size={28} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-[#0F4C81] text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(15,76,129,0.2)]">
              <img 
                src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070" 
                alt="Elite badminton training at KYK Academy"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/40 to-transparent" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
                <div className="flex justify-between items-center gap-4">
                  <div className="text-center flex-1">
                    <div className="text-3xl font-black text-[#0F4C81]">15+</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Years</div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-100" />
                  <div className="text-center flex-1">
                    <div className="text-3xl font-black text-[#0F4C81]">500+</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Athletes</div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-100" />
                  <div className="text-center flex-1">
                    <div className="text-3xl font-black text-[#0F4C81]">50+</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Medals</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFC107]/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0F4C81]/10 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;