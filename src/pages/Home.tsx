"use client";

import React from 'react';
import Hero from '@/components/home/Hero';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {/* Other sections will go here */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F4C81] mb-6">Why Choose KYK Academy?</h2>
            <p className="text-lg text-slate-600">
              We provide state-of-the-art facilities and professional coaching to help you master the game of badminton. From beginners to advanced competitive players, we have a program tailored for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;