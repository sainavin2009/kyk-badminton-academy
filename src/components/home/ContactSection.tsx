"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Loader2, PhoneCall } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type ContactValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { contactInfo } = useSettings();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      const { error } = await supabase.from('contact_messages').insert([values]);
      if (error) throw error;
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch (err: any) {
      toast.error("Failed to send message: " + err.message);
    }
  };

  if (!contactInfo) return null;

  const contactDetails = [
    { icon: MapPin, title: "Academy Address", content: contactInfo.address },
    { icon: Phone, title: "Primary Contact", content: contactInfo.primary_phone },
    { icon: PhoneCall, title: "Secondary Contact", content: contactInfo.secondary_phone },
    { icon: Mail, title: "Email Address", content: contactInfo.email },
  ];

  const timings = [
    { days: "Monday – Friday", hours: contactInfo.monday_friday_hours },
    { days: "Saturday", hours: contactInfo.saturday_hours },
    { days: "Sunday", hours: contactInfo.sunday_hours },
  ];

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col lg:flex-row gap-12 items-stretch">
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-xs font-black tracking-widest uppercase">Connect With Us</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight tracking-tighter">Visit our <br /><span className="text-[#FFC107]">Badminton Arena</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactDetails.map((item, idx) => (
                <Card key={idx} className="p-6 rounded-[2rem] border-none bg-slate-50 shadow-sm group">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#FFC107] shadow-sm"><item.icon size={24} /></div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0F4C81] text-base">{item.title}</h4>
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {timings.map((t, idx) => (
                <Card key={`timing-${idx}`} className="p-6 rounded-[2rem] border-none bg-slate-50 shadow-sm group">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#FFC107] shadow-sm"><Clock size={24} /></div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0F4C81] text-base">{t.days}</h4>
                      <p className="text-sm font-semibold text-slate-800">{t.hours}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-16 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-lg shadow-xl group transition-all">
                <a href={`https://wa.me/${contactInfo.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageSquare className="fill-current" /> WhatsApp
                </a>
              </Button>
              {contactInfo.google_maps_url && (
                <div className="flex-grow rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-lg min-h-[150px]">
                  <iframe src={contactInfo.google_maps_url} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <Card className="p-8 md:p-12 rounded-[3.5rem] bg-[#0F4C81] text-white border-none shadow-2xl relative overflow-hidden h-full">
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Send a Message</h3>
                  <p className="text-sm text-white/50 font-medium italic">Have a question? We respond within 24 hours.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name</Label>
                      <Input {...register('name')} className="h-12 rounded-xl bg-white/10 border-none text-white font-bold" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Address</Label>
                      <Input {...register('email')} className="h-12 rounded-xl bg-white/10 border-none text-white font-bold" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Subject</Label>
                    <Input {...register('subject')} className="h-12 rounded-xl bg-white/10 border-none text-white font-bold" placeholder="Inquiry about..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Message</Label>
                    <Textarea {...register('message')} className="min-h-[120px] rounded-2xl bg-white/10 border-none text-white font-medium p-5" placeholder="Your message here..." />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-[#FFC107] text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-white">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send className="mr-2" size={18} /> Send Inquiry</>}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;