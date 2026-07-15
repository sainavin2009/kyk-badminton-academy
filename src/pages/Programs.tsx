"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: "Junior Foundation",
    age: "Age 6-12",
    description: "Developing fundamental movements, racket grip, and basic footwork in a fun, high-energy environment.",
    icon: Star,
    color: "bg-blue-50 text-blue-600",
    features: ["Racket Coordination", "Basic Footwork", "Motor Skill Growth", "Fun Matchplay"]
  },
  {
    title: "Elite Competitive",
    age: "Age 13-18",
    description: "High-intensity training for tournament-ready players focusing on advanced tactics and physical peak.",
    icon: Trophy,
    color: "bg-[#FFC107]/10 text-[#0F4C81]",
    features: ["Advanced Tactics", "Mental Resilience", "Video Analysis", "Strength & Stamina"]
  },
  {
    title: "Adult Performance",
    age: "Age 18+",
    description: "Tailored programs for adults looking to improve their competitive game or master the sport from scratch.",
    icon: Zap,
    color: "bg-green-50 text-green-600",
    features: ["Skill Refinement", "Cardio Training", "Doubles Strategy", "League Preparation"]
  }
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/20 text-[#FFC107] text-xs font-black tracking-widest uppercase border border-[#FFC107]/30">
              Training Paths
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Master the <span className="text-[#FFC107]">Game</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
              From absolute beginners to national champions, we have a specialized path for every athlete.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-20 h-20 rounded-[1.5rem] ${program.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <program.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">{program.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                      {program.age}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {program.description}
                  </p>
                </div>
                <ul className="space-y-4 mb-10">
                  {program.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm font-bold text-[#0F4C81]/80">
                      <ShieldCheck className="text-[#FFC107] w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all font-black uppercase tracking-widest">
                  <Link to="/join">Enquire Now</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop" 
                  alt="Training Philosophy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#FFC107] rounded-full flex items-center justify-center p-6 shadow-2xl border-4 border-white">
                <div className="text-center">
                  <div className="text-4xl font-black text-[#0F4C81]">100%</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#0F4C81]">Commitment</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight tracking-tighter uppercase">
                Our Training <br />
                <span className="text-[#FFC107]">Philosophy</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium">
                <p>We believe that champions aren't born; they are forged through consistent discipline, expert technical guidance, and mental fortitude.</p>
                <p>Our curriculum combines traditional Eastern footwork techniques with Western sports science to minimize injury risk and maximize explosive power on the court.</p>
              </div>
              <Button asChild variant="outline" className="h-16 px-10 rounded-full border-2 border-[#0F4C81] text-[#0F4C81] font-black uppercase tracking-widest hover:bg-[#0F4C81] hover:text-white transition-all">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;