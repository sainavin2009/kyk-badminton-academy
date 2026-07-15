"use client";

import React from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import ContactSection from '@/components/home/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <ActivitiesSection />
      
      {/* Motivational Quote Section */}
      <section className="py-24 bg-[#0F4C81]">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">"Excellence is not a skill, it's an attitude."</h2>
            <div className="w-20 h-1 bg-[#FFC107] mx-auto mb-8" />
            <p className="text-xl text-white/70">
              Join the academy where winners are made. Our specialized training programs are designed to push you to your limits and beyond.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default Home;