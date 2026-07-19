"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';

const GuestPlaySection = () => {
  const { contactInfo } = useSettings();
  const whatsappNumber = (contactInfo?.whatsapp_number || '919363978810').replace(/\D/g, '');
  const message = encodeURIComponent("Hi KYK Badminton Academy, I would like to book a Guest Play session.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-[#0F4C81] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                Guest <span className="text-[#FFC107]">Play</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                Want to experience the KYK Badminton Academy courts? Book your Guest Play session instantly through WhatsApp.
              </p>
            </div>

            <Button 
              asChild
              className="h-20 px-12 rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-white hover:scale-105 transition-all duration-300 font-black uppercase tracking-widest text-xl shadow-2xl shadow-[#FFC107]/20 group"
            >
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <MessageSquare className="fill-current w-6 h-6" />
                🏸 Book Guest Play
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuestPlaySection;