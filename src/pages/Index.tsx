"use client";

import React, { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import PartnersSection from '@/components/home/PartnersSection';
import GuestPlaySection from '@/components/home/GuestPlaySection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import ContactSection from '@/components/home/ContactSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Award, Target, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { HomepageStats } from '@/types/homepage';

const Index = () => {
  const [statsData, setStatsData] = useState<HomepageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_statistics')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (error) throw error;
        if (data) setStatsData(data);
      } catch (err) {
        console.error('Stats Fetch Warning:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { 
      label: statsData?.coaches_label || "Professional Coaches", 
      value: statsData?.coaches_number || "3+", 
      icon: Target 
    },
    { 
      label: statsData?.courts_label || "Courts", 
      value: statsData?.courts_number || "2", 
      icon: Award 
    },
    { 
      label: statsData?.members_label || "Active Members", 
      value: statsData?.members_number || "300+", 
      icon: Zap 
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KYK Badminton Academy",
    "image": "https://kykacademy.com/logo.png",
    "@id": "https://kykacademy.com",
    "url": "https://kykacademy.com",
    "telephone": "+919363978810",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 65, Appasamy Street",
      "addressLocality": "Kolathur, Chennai",
      "postalCode": "600099",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1256,
      "longitude": 80.2134
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "06:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/kyk_badminton_academy/"
    ]
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#FFC107] selection:text-[#0F4C81]">
      <SEO 
        title="World Class Badminton Training Center"
        description="Elite badminton coaching in Chennai for all ages. Professional NS-NIS certified trainers, international standard synthetic courts, and CrossFit performance programs."
        path="/"
      >
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEO>

      <Hero />
      <AboutSection />
      <PartnersSection />
      <GuestPlaySection />

      <section className="py-24 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFC107]/5 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 skew-x-12 -translate-x-1/2" />
        
        <div className="container mx-auto px-12 relative z-10">
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
        </div>
      </section>

      <ActivitiesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default Index;