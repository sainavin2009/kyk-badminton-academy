"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Handshake, Users } from 'lucide-react';

const partners = [
  { 
    name: "DISTRICT", 
    icon: ShieldCheck
  },
  { 
    name: "TURF TOWN", 
    icon: Handshake
  },
  { 
    name: "LYF SKILLS", 
    icon: Users
  }
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-[10px] font-black uppercase tracking-widest border border-[#FFC107]/20">
              Our Network
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F4C81] uppercase tracking-tighter leading-none">
              Our Collaboration <span className="text-[#FFC107]">Partners</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto italic">
              KYK Badminton Academy proudly collaborates with leading organizations to promote badminton excellence, player development, and community engagement.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-[#0F4C81]/20 group-hover:bg-[#FFC107]/10 group-hover:text-[#FFC107] transition-colors mb-8">
                <partner.icon size={48} strokeWidth={1} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">
                  {partner.name}
                </h3>
              </div>

              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#FFC107]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;