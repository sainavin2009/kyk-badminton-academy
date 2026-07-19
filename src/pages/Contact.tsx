"use client";

import React from 'react';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/home/FAQSection';
import { motion } from 'framer-motion';

const Contact = () => {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">Get In Touch</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
              We're always ready to help you take the first step towards excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* FAQ Link / Extra Support */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-[#0F4C81]">Have more questions?</h3>
              <p className="text-slate-500 font-medium">Check out our frequently asked questions or give us a call.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={scrollToFAQ}
                className="px-8 py-4 rounded-full bg-[#0F4C81] text-white font-bold hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all shadow-xl shadow-[#0F4C81]/10"
              >
                View FAQs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;