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
import { Switch } from '@/components/ui/switch';
import { Check, Quote, User, Award, Loader2 } from 'lucide-react';
import ImageUpload from '../shared/ImageUpload';
import { Testimonial } from '@/types/testimonial';

const testimonialSchema = z.object({
  athlete_name: z.string().min(2, "Athlete name is required"),
  designation: z.string().min(2, "Designation is required"),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters"),
  image_url: z.string().min(1, "Profile image is required"),
  display_order: z.string().or(z.number()).transform(v => Number(v)),
  is_active: z.boolean().default(true),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  testimonial?: Testimonial | null;
}

const TestimonialForm = ({ isOpen, onClose, onSave, testimonial }: TestimonialFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      is_active: true,
      display_order: 0
    }
  });

  useEffect(() => {
    if (testimonial) {
      reset({
        athlete_name: testimonial.athlete_name,
        designation: testimonial.designation,
        testimonial: testimonial.testimonial,
        image_url: testimonial.image_url,
        display_order: testimonial.display_order,
        is_active: testimonial.is_active,
      });
    } else {
      reset({
        athlete_name: '',
        designation: '',
        testimonial: '',
        image_url: '',
        display_order: 0,
        is_active: true,
      });
    }
  }, [testimonial, isOpen, reset]);

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSubmitting(true);
    try {
      await onSave({ ...data, id: testimonial?.id });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Quote className="text-[#FFC107]" size={32} />
              {testimonial ? 'Edit Testimonial' : 'New Athlete Voice'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageUpload 
                label="Athlete Profile Photo"
                value={watch('image_url')}
                onChange={(url) => setValue('image_url', url)}
              />
              {errors.image_url && <p className="text-red-500 text-[10px] font-bold">{errors.image_url.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Athlete Name *</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input {...register('athlete_name')} className="h-12 pl-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Rohan Varma" />
                </div>
                {errors.athlete_name && <p className="text-red-500 text-[10px] font-bold">{errors.athlete_name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Designation *</Label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input {...register('designation')} className="h-12 pl-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. National Junior Squad" />
                </div>
                {errors.designation && <p className="text-red-500 text-[10px] font-bold">{errors.designation.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
                  <Input type="number" {...register('display_order')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2 flex flex-col justify-end pb-1">
                   <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-black uppercase text-[#0F4C81]">Active</span>
                      <Switch checked={watch('is_active')} onCheckedChange={(val) => setValue('is_active', val)} />
                   </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Testimonial Message *</Label>
              <Textarea 
                {...register('testimonial')} 
                className="min-h-[150px] rounded-[2rem] bg-slate-50 border-none font-medium p-6 resize-none" 
                placeholder="Share the athlete's experience..."
              />
              {errors.testimonial && <p className="text-red-500 text-[10px] font-bold">{errors.testimonial.message}</p>}
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" size={20} />}
              {testimonial ? 'Update Review' : 'Publish Review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;