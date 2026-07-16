"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AcademyEvent } from '@/types/event';
import EventCard from '../components/events/EventCard';
import { motion } from 'framer-motion';
import { Calendar, Loader2, Sparkles } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState<AcademyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'Published')
        .order('event_date', { ascending: true });
      
      setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/20 text-[#FFC107] text-xs font-black tracking-widest uppercase border border-[#FFC107]/30">
              <Sparkles size={14} /> Upcoming Action
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              The <span className="text-[#FFC107]">Arena</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
              From competitive showdowns to social mixers, find your place in the academy schedule.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Calendar size={600} />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-300">
              <Loader2 className="animate-spin" size={48} />
              <p className="font-black uppercase text-[10px] tracking-widest">Gathering Upcoming Events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center space-y-6 py-20">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200">
                <Calendar size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Peace on the Courts</h3>
                <p className="text-slate-500 font-medium">No public events are scheduled right now. Check back soon for the next championship announcement.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;