"use client";

import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { FacultyMember } from '@/types/faculty';
import { cn } from '@/lib/utils';

interface FacultyCarouselProps {
  members: FacultyMember[];
}

const FacultyCarousel = ({ members }: FacultyCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false
  });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Auto-scroll every 5 seconds
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [emblaApi, onSelect]);

  if (members.length === 0) return null;

  // Single card display
  if (members.length === 1) {
    const member = members[0];
    return (
      <div className="max-w-xl mx-auto">
        <FacultyCard member={member} />
      </div>
    );
  }

  return (
    <div className="relative space-y-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {members.map((member) => (
            <div key={member.id} className="flex-[0_0_100%] min-w-0 pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <FacultyCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selectedIndex ? "w-8 bg-[#FFC107]" : "w-2 bg-slate-200"
              )}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={scrollPrev}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4C81] hover:bg-[#FFC107] transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FacultyCard = ({ member }: { member: FacultyMember }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full flex flex-col"
  >
    <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-slate-100 relative">
      <img 
        src={member.image_url || `https://i.pravatar.cc/400?u=${member.id}`} 
        alt={member.full_name} 
        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {member.experience && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 text-white">
            <Briefcase size={14} className="text-[#FFC107]" />
            <span className="text-[10px] font-black uppercase tracking-widest">{member.experience} Experience</span>
          </div>
        </div>
      )}
    </div>

    <div className="space-y-4 flex-grow">
      <div>
        <h4 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight leading-none mb-2">{member.full_name}</h4>
        <p className="text-[#FFC107] text-[10px] font-black uppercase tracking-widest">{member.designation}</p>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-50">
        {member.qualification && (
          <div className="flex items-center gap-3 text-slate-500">
            <GraduationCap size={16} className="text-[#0F4C81] shrink-0" />
            <span className="text-xs font-bold">{member.qualification}</span>
          </div>
        )}
        {member.specialization && (
          <div className="flex items-center gap-3 text-slate-500">
            <Star size={16} className="text-[#0F4C81] shrink-0" />
            <span className="text-xs font-bold">{member.specialization}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-slate-400 font-medium leading-relaxed italic line-clamp-3 pt-2">
        "{member.bio || 'Professional faculty dedicated to building the next generation of elite athletes.'}"
      </p>
    </div>
  </motion.div>
);

export default FacultyCarousel;