"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Shield, Users, Heart, Star, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const values = [
  { icon: Target, title: "Precision", desc: "Focusing on the smallest technical details that make the biggest difference on court." },
  { icon: Shield, title: "Discipline", desc: "Building character through punctuality, hard work, and respect for the game." },
  { icon: Users, title: "Community", desc: "A supportive ecosystem where athletes push each other toward greatness." },
  { icon: Heart, title: "Passion", desc: "Fueling every smash and every drill with an undying love for the sport." }
];

const About = () => {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, role, avatar_url')
        .eq('role', 'Coach')
        .eq('status', 'Active')
        .limit(3);
      
      setCoaches(data || []);
      setLoading(false);
    };
    fetchCoaches();
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
              Our Story
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Built for <br />
              <span className="text-[#FFC107]">Excellence</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium leading-relaxed italic">
              KYK Academy was founded with a singular vision: to create a world-class training ground for the next generation of badminton legends.
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
                  alt="Academy History" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FFC107] rounded-[3rem] p-10 flex flex-col justify-center shadow-2xl">
                <Trophy size={48} className="text-[#0F4C81] mb-4" />
                <div className="text-4xl font-black text-[#0F4C81] leading-none mb-1">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0F4C81]/60">Years of Legacy</div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-[#0F4C81] tracking-tighter uppercase leading-[0.9]">
                  Rooted in <br />
                  Professionalism
                </h2>
                <div className="w-20 h-2 bg-[#FFC107] rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Started by a group of former national players, KYK Academy was born out of a necessity for structured, high-intensity training that bridges the gap between amateur play and professional competition.
                </p>
                <p>
                  We don't just coach badminton; we engineer athletes. Our approach integrates traditional court wisdom with modern sports science, focusing on biomechanics, endurance, and mental fortitude.
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

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] tracking-tighter uppercase">Our Leadership</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">The Minds Behind the Academy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-[#0F4C81]" /></div>
            ) : coaches.length > 0 ? (
              coaches.map((coach, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-100"
                >
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100 relative">
                    <img src={coach.avatar_url || `https://i.pravatar.cc/400?img=${i + 15}`} alt={coach.full_name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[#0F4C81]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">{coach.full_name}</h4>
                  <p className="text-[#FFC107] text-[10px] font-black uppercase tracking-widest mb-4">{coach.role}</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                    Certified Elite Coach with a focus on professional circuit readiness.
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                 <p className="font-black uppercase text-slate-300 text-xs tracking-widest">Faculty records being synchronized...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;