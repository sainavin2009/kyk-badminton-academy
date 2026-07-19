"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useSettings } from '@/contexts/SettingsContext';

const registrationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  program: z.string().min(1, "Please select a program"),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const benefits = [
  "Free initial skill assessment session",
  "Access to elite national coaches",
  "Specialized strength & conditioning",
  "Tournament entry guidance",
  "Personalized progress tracking",
  "Academy kit and merchandise"
];

const Join = () => {
  const { programs, loading: loadingPrograms } = useSettings();
  const activePrograms = programs.filter(p => p.is_visible);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (values: RegistrationValues) => {
    try {
      const studentId = `REG-${Date.now().toString().slice(-6)}`;
      
      const { error } = await supabase
        .from('students')
        .insert([{
          student_id: studentId,
          full_name: values.name,
          phone: values.phone,
          program: values.program,
          remarks: `Initial age provided: ${values.age}. Registered via public join form.`,
          fee_status: 'Pending'
        }]);

      if (error) throw error;

      toast.success("Registration successful! Our team will contact you shortly.");
      reset();
    } catch (err: any) {
      toast.error("Failed to submit registration: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-20 bg-[#0F4C81] text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Join the <span className="text-[#FFC107]">Squad</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
              Your journey from the baseline to the podium starts with a single step.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-[#0F4C81] tracking-tighter uppercase leading-[0.9]">
                  Why Start <br />With Us?
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                  We don't just teach the game; we build a lifestyle of discipline and peak performance.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#FFC107] border border-slate-100 group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-all">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-[#0F4C81]/80 text-base">{b}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Need Immediate Help?</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="outline" className="h-16 px-8 rounded-2xl border-2 border-[#0F4C81] text-[#0F4C81] font-black uppercase tracking-widest hover:bg-[#0F4C81] hover:text-white transition-all">
                    <a href="tel:+1234567890" className="flex items-center gap-2">
                      <Phone size={18} />
                      Call Us
                    </a>
                  </Button>
                  <Button asChild className="h-16 px-8 rounded-2xl bg-[#25D366] text-white font-black uppercase tracking-widest shadow-xl shadow-green-500/20">
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener" className="flex items-center gap-2">
                      <MessageSquare size={18} />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <Card className="p-8 md:p-12 rounded-[3.5rem] border-none shadow-[0_40px_80px_-20px_rgba(15,76,129,0.15)] bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Registration Form</h3>
                    <p className="text-sm text-slate-400 font-medium">Fill in the details to schedule your first trial.</p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Student Full Name</Label>
                        <Input 
                          {...register('name')}
                          className="h-14 rounded-xl bg-slate-50 border-none font-bold" 
                          placeholder="John Doe" 
                        />
                        {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age</Label>
                        <Input 
                          {...register('age')}
                          className="h-14 rounded-xl bg-slate-50 border-none font-bold" 
                          placeholder="e.g. 12" 
                        />
                        {errors.age && <p className="text-red-500 text-[10px] font-bold">{errors.age.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parent/Guardian Phone</Label>
                      <Input 
                        {...register('phone')}
                        className="h-14 rounded-xl bg-slate-50 border-none font-bold" 
                        placeholder="+1 (234) 567-890" 
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Program</Label>
                      <select 
                        {...register('program')}
                        disabled={loadingPrograms}
                        className="w-full h-14 rounded-xl bg-slate-50 border-none px-4 font-bold text-slate-900 focus:ring-2 focus:ring-[#FFC107] outline-none appearance-none disabled:opacity-50"
                      >
                        <option value="">{loadingPrograms ? 'Loading programs...' : 'Choose a program'}</option>
                        {activePrograms.map(p => (
                          <option key={p.id} value={p.title}>
                            {p.title} ({p.age_range})
                          </option>
                        ))}
                      </select>
                      {errors.program && <p className="text-red-500 text-[10px] font-bold">{errors.program.message}</p>}
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting || loadingPrograms}
                      className="w-full h-16 rounded-2xl bg-[#0F4C81] text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-[#0F4C81]/20 group hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        <>
                          Submit Registration
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy regarding athlete safety and data usage.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;