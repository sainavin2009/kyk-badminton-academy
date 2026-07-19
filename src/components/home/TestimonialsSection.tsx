"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/testimonial';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      setTestimonials(data || []);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [testimonials, currentIndex]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="animate-spin text-[#0F4C81]" size={32} />
      </div>
    );
  }

  const displayItems = testimonials.length > 0 ? testimonials : [{
    id: 'fallback',
    athlete_name: 'Rohan Varma',
    designation: 'National Junior Squad',
    testimonial: "The intensity at KYK is unlike any other academy. They don't just teach you the smash; they teach you how to dominate the court mentally. Within 6 months, my national ranking jumped significantly.",
    image_url: 'https://i.pravatar.cc/200?img=12'
  } as Testimonial];

  const currentItem = displayItems[currentIndex];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="lg:w-1/3 space-y-6">
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Wall of Glory</span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F4C81] leading-[0.9] tracking-tighter uppercase">
                  What Our <br />
                  <span className="text-[#FFC107]">Athletes Say</span>
                </h3>
             </div>
             <div className="w-20 h-2 bg-[#FFC107] rounded-full" />
             
             {displayItems.length > 1 && (
               <div className="flex gap-4 pt-8">
                 <button 
                  onClick={() => paginate(-1)}
                  className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] hover:bg-[#FFC107] transition-all shadow-sm"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 <button 
                  onClick={() => paginate(1)}
                  className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all shadow-xl"
                 >
                   <ChevronRight size={24} />
                 </button>
               </div>
             )}
          </div>

          <div className="lg:w-2/3 w-full relative min-h-[450px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="w-full bg-slate-50 p-10 md:p-20 rounded-[4rem] relative shadow-inner overflow-hidden"
              >
                <div className="absolute top-10 left-10 text-[#FFC107]/10 font-serif text-[12rem] leading-none pointer-events-none">“</div>
                <Quote className="absolute top-20 right-20 text-[#0F4C81]/5 w-24 h-24" strokeWidth={1} />
                
                <p className="text-xl md:text-3xl font-bold text-[#0F4C81] italic leading-relaxed relative z-10 mb-10">
                  {currentItem.testimonial}
                </p>

                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-slate-200 overflow-hidden border-4 border-white shadow-xl rotate-3">
                    <img 
                      src={currentItem.image_url} 
                      alt={currentItem.athlete_name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-black text-[#0F4C81] uppercase tracking-tight leading-none">
                      {currentItem.athlete_name}
                    </div>
                    <div className="text-[10px] font-black text-[#FFC107] uppercase tracking-[0.2em]">
                      {currentItem.designation}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {displayItems.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {displayItems.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#FFC107]' : 'w-2 bg-slate-200'}`} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;