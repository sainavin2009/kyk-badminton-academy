"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Programs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Master the <span className="text-[#FFC107]">Game</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
              From absolute beginners to national champions, we have a specialized path for every athlete.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Card Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-10 md:p-16 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 max-w-3xl w-full"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 text-[#0F4C81] flex items-center justify-center mb-8 group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-colors">
                <Trophy size={36} strokeWidth={1.5} />
              </div>
              
              {/* Title & Age Badge */}
              <div className="space-y-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-3xl md:text-4xl font-black text-[#0F4C81] uppercase tracking-tight">
                    Badminton Training Program
                  </h3>
                  <span className="inline-block w-fit text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-200 text-[#0F4C81] shadow-sm">
                    6+ to 40+ Years
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Professional badminton training designed for beginners, intermediate players, adults, and competitive athletes. Every trainee follows a structured learning path with individual attention based on their skill level and goals.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  "Technique & Footwork Development",
                  "Agility & Physical Fitness",
                  "Match Strategy & Skill Progression",
                  "Individual Training Focus"
                ].map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3 text-sm font-bold text-[#0F4C81]/80">
                    <ShieldCheck className="text-[#FFC107] w-5 h-5 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button asChild className="w-full h-16 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest text-lg transition-all shadow-xl shadow-[#0F4C81]/10">
                <Link to="/join">Enquire Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;