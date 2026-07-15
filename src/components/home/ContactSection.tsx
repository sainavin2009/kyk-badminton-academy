"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const contactDetails = [
  {
    icon: MapPin,
    title: "Academy Address",
    content: "123 Smash Court, Badminton Valley, Sports City 54321",
    subContent: "Near Olympic Stadium"
  },
  {
    icon: Phone,
    title: "Phone Number",
    content: "+1 (234) 567-890",
    subContent: "Main Office Line"
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "info@kykacademy.com",
    subContent: "General Inquiries"
  },
  {
    icon: Clock,
    title: "Coaching Timings",
    content: "Mon - Sat: 6:00 AM - 10:00 PM",
    subContent: "Sun: 8:00 AM - 1:00 PM"
  }
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-12 items-stretch"
        >
          {/* Left Column: Contact Info */}
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-xs font-black tracking-widest uppercase">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight tracking-tighter">
                Let's Start Your <br />
                <span className="text-[#FFC107]">Professional Journey</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Whether you're a beginner or looking to join our elite squad, we're here to guide you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactDetails.map((item, idx) => (
                <Card key={idx} className="p-6 rounded-[2rem] border-none bg-slate-50 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#FFC107] shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0F4C81] text-base">{item.title}</h4>
                      <p className="text-sm font-semibold text-slate-800">{item.content}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.subContent}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                asChild
                className="h-16 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-lg shadow-xl shadow-green-500/20 group transition-all hover:scale-105 active:scale-95"
              >
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageSquare className="fill-current" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Map Embed Placeholder */}
          <div className="lg:w-1/2 min-h-[400px]">
            <Card className="h-full w-full rounded-[3rem] overflow-hidden border-none shadow-2xl relative group">
              {/* This is a placeholder for a Google Map Embed */}
              <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:animate-none transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/80 via-transparent to-transparent opacity-60" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFC107] text-[#0F4C81] flex items-center justify-center mb-4 shadow-xl shadow-[#FFC107]/40 transform group-hover:scale-110 transition-transform duration-500">
                  <MapPin size={32} />
                </div>
                <h4 className="text-white text-2xl font-black mb-2 tracking-tight">Visit Our Facilities</h4>
                <p className="text-white/80 text-sm max-w-xs mb-6 font-medium">Click below to get directions directly on Google Maps.</p>
                <Button variant="outline" className="rounded-full border-2 border-white/50 text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#0F4C81] transition-all font-bold">
                  Get Directions
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;