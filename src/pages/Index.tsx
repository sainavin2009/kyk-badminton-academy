"use client";

import React, { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import ContactSection from '@/components/home/ContactSection';
import { motion } from 'framer-motion';
import { Award, Target, Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { HomepageStats } from '@/types/homepage';

const Index = () => {
  const [statsData, setStatsData] = useState<HomepageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "KYK Badminton Academy | World Class Training Center";
    
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_statistics')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) throw error;
        setStatsData(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = statsData ? [
    { label: statsData.coaches_label, value: statsData.coaches_number, icon: Target },
    { label: statsData.courts_label, value: statsData.courts_number, icon: Award },
    { label: statsData.members_label, value: statsData.members_number, icon: Zap }
  ] : [];

  return (
    <div className="min-h-screen bg-white selection:bg-[#FFC107] selection:text-[#0F4C81]">
      {/* 1. Hero Experience */}
      <Hero />

      {/* 2. Philosophy & About */}
      <AboutSection />

      {/* 3. Performance Metrics Mid-Section */}
      <section className="py-24 bg-[#0F4C81] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFC107]/5 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 skew-x-12 -translate-x-1/2" />
        
        <div className="container mx-auto px-12 relative z-10">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-[#FFC107]" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col items-center lg:items-start space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC107] group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-all duration-500">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]/60">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Training Domains & Gallery */}
      <ActivitiesSection />

      {/* 5. Client Testimonial / Trust Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/3">
              <h3 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-[0.9] tracking-tighter uppercase mb-8">
                What Our <br />
                <span className="text-[#FFC107]">Athletes Say</span>
              </h3>
              <div className="w-20 h-2 bg-[#FFC107] rounded-full" />
            </div>
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-12 md:p-20 rounded-[4rem] relative shadow-inner"
              >
                <div className="absolute top-10 left-10 text-[#FFC107]/20 font-serif text-[12rem] leading-none">“</div>
                <p className="text-2xl md:text-3xl font-bold text-[#0F4C81] italic leading-relaxed relative z-10 mb-10">
                  The intensity at KYK is unlike any other academy. They don't just teach you the smash; they teach you how to dominate the court mentally. Within 6 months, my national ranking jumped significantly.
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Athlete" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-[#0F4C81] uppercase tracking-tight">Rohan Varma</div>
                    <div className="text-[10px] font-black text-[#FFC107] uppercase tracking-[0.2em]">National Junior Squad</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact & Enrollment */}
      <ContactSection />
    </div>
  );
};

export default Index;