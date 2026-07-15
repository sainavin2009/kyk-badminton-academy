"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: MapPin,
    title: "Academy Address",
    content: "123 Shuttlecock Lane, Smash City, SC 54321",
    color: "bg-blue-50 text-[#0F4C81]"
  },
  {
    icon: Phone,
    title: "Phone Number",
    content: "+1 (234) 567-890",
    color: "bg-yellow-50 text-[#FFC107]"
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "contact@kykacademy.com",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Clock,
    title: "Training Timings",
    content: "Mon-Sat: 6:00 AM - 10:00 PM\nSun: 8:00 AM - 1:00 PM",
    color: "bg-purple-50 text-purple-600"
  }
];

const ContactSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Information Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#FFC107] uppercase">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight">
                Ready to Join the <br />
                <span className="text-[#FFC107]">Winning Team?</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Have questions about our programs or want to book a trial session? Reach out to us and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-[#FFC107]/30 transition-colors">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${info.color} flex items-center justify-center`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F4C81] text-sm mb-1">{info.title}</h4>
                    <p className="text-sm text-slate-500 whitespace-pre-line leading-snug">
                      {info.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-inner bg-slate-100 border-2 border-slate-50">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070')] bg-cover bg-center grayscale opacity-50" />
              <div className="absolute inset-0 bg-[#0F4C81]/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20 flex items-center gap-3">
                  <MapPin className="text-[#0F4C81]" size={20} />
                  <span className="text-sm font-bold text-[#0F4C81]">Find us on Google Maps</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <Card className="p-8 md:p-10 rounded-[3rem] shadow-2xl border-none bg-slate-50 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107]/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-[#0F4C81]">Send a Message</h4>
                  <p className="text-sm text-slate-500">Fill out the form below and we'll contact you soon.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                      <Input placeholder="John Doe" className="h-12 rounded-xl bg-white border-none shadow-sm focus-visible:ring-[#FFC107]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                      <Input placeholder="+1 234 567 890" className="h-12 rounded-xl bg-white border-none shadow-sm focus-visible:ring-[#FFC107]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                    <Input placeholder="john@example.com" type="email" className="h-12 rounded-xl bg-white border-none shadow-sm focus-visible:ring-[#FFC107]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Program of Interest</label>
                    <select className="flex h-12 w-full rounded-xl border-none bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFC107] text-slate-500">
                      <option>Badminton Foundation (Kids)</option>
                      <option>Advanced Competitive Training</option>
                      <option>Adult Fitness & Social</option>
                      <option>CrossFit & Strength</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Your Message</label>
                    <Textarea placeholder="How can we help you?" className="min-h-[120px] rounded-xl bg-white border-none shadow-sm focus-visible:ring-[#FFC107] resize-none" />
                  </div>

                  <Button className="w-full h-14 rounded-xl bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold text-lg shadow-xl shadow-[#0F4C81]/20 group">
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>

                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest pt-4">
                  By clicking send, you agree to our privacy policy.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;