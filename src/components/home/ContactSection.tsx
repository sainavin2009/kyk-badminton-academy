"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Send, Loader2 } from 'lucide-react';
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
  const { settings } = useSettings();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([values]);

      if (error) throw error;
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch (err: any) {
      toast.error("Failed to send message: " + err.message);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Academy Address",
      content: settings?.address || "123 Smash Court, Badminton Valley, Sports City 54321",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: settings?.phone || "+1 (234) 567-890",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: settings?.email || "info@kykacademy.com",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-12 items-stretch"
        >
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/10 text-[#0F4C81] text-xs font-black tracking-widest uppercase">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] leading-tight tracking-tighter">
                Let's Start Your <br />
                <span className="text-[#FFC107]">Professional Journey</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactDetails.map((item, idx) => (
                <Card key={idx} className="p-6 rounded-[2rem] border-none bg-slate-50 shadow-sm group">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#FFC107] shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0F4C81] text-base">{item.title}</h4>
                      <p className="text-sm font-semibold text-slate-800">{item.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {settings?.working_hours?.map((t: any, idx: number) => (
                <Card key={`timing-${idx}`} className="p-6 rounded-[2rem] border-none bg-slate-50 shadow-sm group">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#FFC107] shadow-sm">
                      <Clock size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0F4C81] text-base">{t.days}</h4>
                      <p className="text-sm font-semibold text-slate-800">{t.hours}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="h-16 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-lg shadow-xl shadow-green-500/20 group transition-all"
              >
                <a href={`https://wa.me/${settings?.whatsapp || '1234567890'}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageSquare className="fill-current" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <Card className="p-8 md:p-12 rounded-[3.5rem] bg-[#0F4C81] text-white border-none shadow-2xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107]/5 rounded-full blur-3xl" />
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Send a Message</h3>
                  <p className="text-sm text-white/50 font-medium italic">Have a specific question? Ask us anything.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name</Label>
                      <Input {...register('name')} className="h-12 rounded-xl bg-white/10 border-none text-white placeholder:text-white/20 font-bold focus-visible:ring-1 focus-visible:ring-[#FFC107]" placeholder="Your name" />
                      {errors.name && <p className="text-[#FFC107] text-[10px] font-bold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Address</Label>
                      <Input {...register('email')} className="h-12 rounded-xl bg-white/10 border-none text-white placeholder:text-white/20 font-bold focus-visible:ring-1 focus-visible:ring-[#FFC107]" placeholder="email@example.com" />
                      {errors.email && <p className="text-[#FFC107] text-[10px] font-bold">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Subject</Label>
                    <Input {...register('subject')} className="h-12 rounded-xl bg-white/10 border-none text-white placeholder:text-white/20 font-bold focus-visible:ring-1 focus-visible:ring-[#FFC107]" placeholder="Inquiry about..." />
                    {errors.subject && <p className="text-[#FFC107] text-[10px] font-bold">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Message</Label>
                    <Textarea {...register('message')} className="min-h-[120px] rounded-2xl bg-white/10 border-none text-white placeholder:text-white/20 font-medium p-5 focus-visible:ring-1 focus-visible:ring-[#FFC107] resize-none" placeholder="Your message here..." />
                    {errors.message && <p className="text-[#FFC107] text-[10px] font-bold">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-[#FFC107] text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#FFC107]/20 transition-all hover:bg-white"
                  >
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