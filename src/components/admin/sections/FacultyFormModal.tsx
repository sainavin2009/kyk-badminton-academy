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
import { Check, User, Award, BookOpen, Briefcase, Star, Loader2 } from 'lucide-react';
import ImageUpload from '../shared/ImageUpload';
import { FacultyMember } from '@/types/faculty';

const facultySchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  designation: z.string().min(2, "Designation is required"),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  specialization: z.string().optional(),
  bio: z.string().optional(),
  image_url: z.string().min(1, "Profile photo is required"),
  display_order: z.string().or(z.number()).transform(v => Number(v)),
  is_active: z.boolean().default(true),
});

type FacultyFormValues = z.infer<typeof facultySchema>;

interface FacultyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  member?: FacultyMember | null;
}

const FacultyFormModal = ({ isOpen, onClose, onSave, member }: FacultyFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      is_active: true,
      display_order: 0
    }
  });

  useEffect(() => {
    if (member) {
      reset({
        full_name: member.full_name,
        designation: member.designation,
        qualification: member.qualification || '',
        experience: member.experience || '',
        specialization: member.specialization || '',
        bio: member.bio || '',
        image_url: member.image_url || '',
        display_order: member.display_order,
        is_active: member.is_active,
      });
    } else {
      reset({
        full_name: '',
        designation: '',
        qualification: '',
        experience: '',
        specialization: '',
        bio: '',
        image_url: '',
        display_order: 0,
        is_active: true,
      });
    }
  }, [member, isOpen, reset]);

  const onSubmit = async (data: FacultyFormValues) => {
    setIsSubmitting(true);
    try {
      // Only include id if it's an update (exists on member)
      const submissionData = member?.id ? { ...data, id: member.id } : data;
      await onSave(submissionData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-20">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Award className="text-[#FFC107]" size={32} />
              {member ? 'Modify Faculty Profile' : 'New Faculty Onboarding'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <User size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Core Identity</h3>
                </div>

                <ImageUpload 
                  label="Professional Headshot"
                  value={watch('image_url')}
                  onChange={(url) => setValue('image_url', url)}
                />

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name *</Label>
                  <Input {...register('full_name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Coach Vinay" />
                  {errors.full_name && <p className="text-red-500 text-[10px] font-bold">{errors.full_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Designation *</Label>
                  <Input {...register('designation')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Head Coach" />
                  {errors.designation && <p className="text-red-500 text-[10px] font-bold">{errors.designation.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <BookOpen size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Expertise & Stats</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qualifications</Label>
                    <div className="relative">
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <Input {...register('qualification')} className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold" placeholder="NS-NIS Certified" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <Input {...register('experience')} className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold" placeholder="10+ Years" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specialization</Label>
                  <div className="relative">
                    <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <Input {...register('specialization')} className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold" placeholder="Technical Footwork" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
                    <Input type="number" {...register('display_order')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 self-end h-12">
                      <span className="text-[10px] font-black uppercase text-[#0F4C81]">Live Status</span>
                      <Switch checked={watch('is_active')} onCheckedChange={(val) => setValue('is_active', val)} />
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Biography / Coaching Philosophy</Label>
            <Textarea 
              {...register('bio')} 
              className="min-h-[150px] rounded-[2rem] bg-slate-50 border-none font-medium p-6 resize-none" 
              placeholder="Tell us about the coach's journey..."
            />
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" size={20} />}
              {member ? 'Update Faculty' : 'Publish Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyFormModal;