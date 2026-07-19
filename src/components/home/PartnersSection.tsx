"use client";

import React from 'react';

const PartnersSection = () => {
  const partners = ["District", "Turf Town", "LYF Skills"];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black text-[#0F4C81] uppercase tracking-tighter">
            Our Partners
          </h2>

          {/* Partner List */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
            {partners.map((partner) => (
              <span 
                key={partner} 
                className="text-2xl md:text-3xl font-black text-[#0F4C81] uppercase tracking-[0.2em]"
              >
                {partner}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <div className="pt-4">
            <p className="text-slate-400 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
              Proudly collaborating for bookings across platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;