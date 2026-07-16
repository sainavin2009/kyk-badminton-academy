"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Calendar, ImageIcon, Clock, AlertCircle } from 'lucide-react';
import { AcademyEvent } from '@/types/event';

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  banner_url: z.string().url("Please enter a valid image URL"),
  event_date: z.string().min(1, "Event date is required"),
  registration_deadline: z.string().min(1, "Deadline is required"),
  status: z.enum(['Published', 'Draft']),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  event?: AcademyEvent | null;
}

const EventForm = ({ isOpen, onClose, onSave, event }: EventFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'Draft'
    }
  });

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description,
        banner_url: event.banner_url,
        event_date: event.event_date.split('T')[0],
        registration_deadline: event.registration_deadline.split('T')[0],
        status: event.status,
      });
    } else {
      reset({
        title: '',
        description: '',
        banner_url: '',
        event_date: '',
        registration_deadline: '',
        status: 'Draft',
      });
    }
  }, [event, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {event ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-8 bg-white max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Title *</Label>
                <Input {...register('title')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" placeholder="e.g. Annual Badminton Championship 2024" />
                {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Banner Image URL *</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input {...register('banner_url')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" placeholder="https://images.unsplash.com/..." />
                </div>
                {errors.banner_url && <p className="text-red-500 text-[10px] font-bold">{errors.banner_url.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input type="date" {...register('event_date')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              {errors.event_date && <p className="text-red-500 text-[10px] font-bold">{errors.event_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reg. Deadline *</Label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input type="date" {...register('registration_deadline')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              {errors.registration_deadline && <p className="text-red-500 text-[10px] font-bold">{errors.registration_deadline.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Description *</Label>
              <Textarea {...register('description')} className="min-h-[150px] rounded-[2rem] bg-slate-50 border-none font-medium p-6 resize-none" placeholder="Details about the event, prizes, and rules..." />
              {errors.description && <p className="text-red-500 text-[10px] font-bold">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Publishing Status</Label>
              <select 
                {...register('status')}
                className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107] outline-none"
              >
                <option value="Draft">Draft (Hidden)</option>
                <option value="Published">Published (Live)</option>
              </select>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all"
            >
              <Check className="mr-2" size={20} />
              {event ? 'Update Event' : 'Publish Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;