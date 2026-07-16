"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  RefreshCw, 
  Calendar, 
  Trash2, 
  Edit3, 
  Eye, 
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import EventForm from './EventForm';
import { AcademyEvent } from '@/types/event';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EventManager = () => {
  const [events, setEvents] = useState<AcademyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AcademyEvent | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast.error('Failed to load events: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (selectedEvent) {
        const { data, error } = await supabase
          .from('events')
          .update(formData)
          .eq('id', selectedEvent.id)
          .select();
        
        if (error) throw error;
        setEvents(prev => prev.map(e => e.id === selectedEvent.id ? data[0] : e));
        toast.success('Event updated successfully');
      } else {
        const { data, error } = await supabase
          .from('events')
          .insert([formData])
          .select();
        
        if (error) throw error;
        setEvents(prev => [...prev, data[0]]);
        toast.success('New event published');
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error('Operation failed: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      setEvents(prev => prev.filter(e => e.id !== id));
      toast.success('Event deleted');
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Events</h2>
          <p className="text-slate-500 font-medium">Manage tournaments, workshops, and academy socials.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchEvents} className="h-16 w-16 rounded-2xl text-slate-400 hover:text-[#0F4C81]">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedEvent(null); setIsFormOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group"
          >
            <Plus className="mr-3" />
            Create Event
          </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder="Search events by title..." 
        />
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-200">
          <RefreshCw className="animate-spin" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img 
                  src={event.banner_url} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={cn(
                    "rounded-full px-4 py-1.5 font-black uppercase text-[9px] tracking-widest border-none shadow-xl",
                    event.status === 'Published' ? "bg-green-500 text-white" : "bg-amber-500 text-[#0F4C81]"
                  )}>
                    {event.status}
                  </Badge>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#FFC107]">
                    <Calendar size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {format(new Date(event.event_date), 'PPP')}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#0F4C81] tracking-tight uppercase line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Deadline: {format(new Date(event.registration_deadline), 'MMM dd')}
                    </span>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between gap-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => { setSelectedEvent(event); setIsFormOpen(true); }}
                    className="h-12 w-12 rounded-xl text-blue-500 hover:bg-blue-50"
                  >
                    <Edit3 size={18} />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2.5rem]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-[#0F4C81] uppercase">Delete Event?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">
                          This will permanently remove the event "{event.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(event.id)}
                          className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <EventForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventManager;