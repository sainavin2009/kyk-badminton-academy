"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, GraduationCap, Dumbbell, Award } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: "Academy Vision",
    description: "To be the premier center for badminton excellence, fostering talent and sportsmanship in every athlete."
  },
  {
    icon: Users,
    title: "Professional Coaching",
    description: "Led by certified national-level coaches who bring years of competitive experience to the court."
  },
  {
    icon: Shield,
    title: "Discipline",
    description: "We instill core values of punctuality, respect, and mental fortitude that extend beyond the game."
  },
  {
    icon: GraduationCap,
    title: "Student Development",
    description: "Personalized growth charts for each student, tracking technical skills and physical milestones."
  },
  {
    icon: Dumbbell,
    title: "Fitness & Agility",
    description: "Comprehensive strength and conditioning programs designed specifically for badminton players."
  },
  {
    icon: Award,
    title: "Tournament Prep",
    description: "Strategic match-play training and psychological preparation for state and national competitions."
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#FFC107] uppercase">Our Legacy</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight">
                Shaping Champions at <br />
                <span className="text-[#FFC107]">KYK Academy</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Founded with a passion for excellence, KYK Badminton Academy has become a sanctuary for aspiring athletes. Our holistic approach combines technical mastery with physical conditioning and mental toughness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0F4C81] group-hover:bg-[#FFC107] group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0F4C81]">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070" 
                alt="Badminton training session"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 to-transparent" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex justify-between items-center">
                  <div className="text-center px-4 border-r border-slate-200">
                    <div className="text-2xl font-black text-[#0F4C81]">15+</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Years Exp</div>
                  </div>
                  <div className="text-center px-4 border-r border-slate-200">
                    <div className="text-2xl font-black text-[#0F4C81]">500+</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Students</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-2xl font-black text-[#0F4C81]">50+</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Medals</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FFC107]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#0F4C81]/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;