"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Shield, Users, Heart, Star, Loader2, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import FacultyCarousel from '@/components/home/FacultyCarousel';
import { FacultyMember } from '@/types/faculty';

const values = [
  { icon: Target, title: "Precision", desc: "Focusing on technical details and technique mastery for the best results on court." },
  { icon: Shield, title: "Discipline", desc: "Character through hard work, and dedicated training sessions." },
  { icon: Users, title: "Community", desc: "A supportive ecosystem where athletes push each other toward greatness." },
  { icon: Heart, title: "Passion", desc: "Fueling every smash and drill with an undying love for sports." }
];

const About = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      const { data } = await supabase
        .from('faculty')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      setFaculty(data || []);
      setLoading(false);
    };
    fetchFaculty();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-[#0F4C81] text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/20 text-[#FFC107] text-xs font-black tracking-widest uppercase border border-[#FFC107]/30">
              The Academy Standard
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Built for <br />
              <span className="text-[#FFC107]">Excellence</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium leading-relaxed italic">
              KYK Badminton Academy provides professional coaching for kids and adults using NS-NIS certified scientific training methods.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200" 
                  alt="Academy Training" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FFC107] rounded-[3rem] p-10 flex flex-col justify-center shadow-2xl">
                <Trophy size={48} className="text-[#0F4C81] mb-4" />
                <div className="text-4xl font-black text-[#0F4C81] leading-none mb-1">Elite</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]/60">Synthetic Courts</div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-[#0F4C81] tracking-tighter uppercase leading-[0.9]">
                  Scientific <br />
                  Training Methods
                </h2>
                <div className="w-20 h-2 bg-[#FFC107] rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  At KYK Academy, we focus on physical fitness, agility development, and technique mastery. Our training environment is designed to bridge the gap between amateur play and professional competition.
                </p>
                <p>
                  We provide international standard synthetic courts and a structured progression for every skill level, ensuring every athlete has a specialized path toward their goals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl text-[#0F4C81] h-fit">
                      <v.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-[#0F4C81] uppercase tracking-tight">{v.title}</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 block">The Elite Team</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#0F4C81] tracking-tighter uppercase leading-[0.9]">
                Our <span className="text-[#FFC107]">Faculty</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] max-w-xs md:text-right">
              Certified NS-NIS Professional Coaches delivering world-class training.
            </p>
          </div>
          
          {loading ? (
            <div className="py-40 flex justify-center"><Loader2 className="animate-spin text-[#0F4C81]" size={48} /></div>
          ) : faculty.length > 0 ? (
            <FacultyCarousel members={faculty} />
          ) : (
            <div className="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-200">
               <Award className="mx-auto mb-6 text-slate-200" size={64} />
               <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Coaching records are being synchronized...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;