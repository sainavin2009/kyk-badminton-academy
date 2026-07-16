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
import { Check, Trophy, Calendar } from 'lucide-react';

const milestoneSchema = z.object({
  student_id: z.string().min(1, "Athlete is required"),
  title: z.string().min(3, "Achievement title is required"),
  description: z.string().optional(),
  type: z.enum(['Skill', 'Tournament', 'Fitness', 'Milestone']),
  achievement_date: z.string().min(1, "Date is required"),
});

type MilestoneFormValues = z.infer<typeof milestoneSchema>;

interface MilestoneFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  students: any[];
  selectedStudentId?: string;
}

const MilestoneForm = ({ isOpen, onClose, onSave, students, selectedStudentId }: MilestoneFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MilestoneFormValues>({
    resolver: zodResolver(milestoneSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        student_id: selectedStudentId || '',
        title: '',
        description: '',
        type: 'Skill',
        achievement_date: new Date().toISOString().split('T')[0],
      });
    }
  }, [isOpen, selectedStudentId, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Trophy className="text-[#FFC107]" size={32} />
              Record Achievement
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Athlete *</Label>
              <select 
                {...register('student_id')}
                className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-[#0F4C81] outline-none"
              >
                <option value="">Choose Athlete...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.full_name} (#{s.student_id})</option>
                ))}
              </select>
              {errors.student_id && <p className="text-red-500 text-[10px] font-bold">{errors.student_id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Achievement Title *</Label>
              <Input {...register('title')} placeholder="e.g. Winner - U15 State Championship" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                <select 
                  {...register('type')}
                  className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-[#0F4C81] outline-none"
                >
                  <option value="Skill">Skill Mastery</option>
                  <option value="Tournament">Tournament Victory</option>
                  <option value="Fitness">Fitness Goal</option>
                  <option value="Milestone">Career Milestone</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date of Achievement</Label>
                <Input type="date" {...register('achievement_date')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Details / Description</Label>
              <Textarea {...register('description')} placeholder="Specific details about the performance..." className="min-h-[100px] rounded-xl bg-slate-50 border-none font-medium p-4 resize-none" />
            </div>
          </div>

          <DialogFooter className="pt-6 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl h-14 px-8 font-bold text-slate-400">Cancel</Button>
            <Button 
              type="submit"
              className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all"
            >
              <Check className="mr-2" size={20} />
              Log Milestone
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneForm;