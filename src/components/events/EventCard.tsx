"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { AcademyEvent } from '@/types/event';

interface EventCardProps {
  event: AcademyEvent;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const isExpired = new Date(event.registration_deadline) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={event.banner_url} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/80 to-transparent" />
        <div className="absolute bottom-6 left-8 flex items-center gap-3">
          <div className="p-2.5 bg-[#FFC107] text-[#0F4C81] rounded-xl shadow-lg">
            <Trophy size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Academy Event</span>
        </div>
      </div>

      <div className="p-10 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#FFC107]">
            <Calendar size={14} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {format(new Date(event.event_date), 'PPP')}
            </span>
          </div>
          <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight leading-[1.1]">
            {event.title}
          </h3>
        </div>

        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 italic">
          "{event.description}"
        </p>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Deadline: {format(new Date(event.registration_deadline), 'MMM dd')}
            </span>
          </div>
          
          <Button 
            asChild 
            disabled={isExpired}
            className="h-12 px-6 rounded-xl bg-[#0F4C81] text-white font-black uppercase tracking-widest text-[10px] group/btn"
          >
            <Link to="/join">
              {isExpired ? 'Closed' : 'Register'}
              <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;