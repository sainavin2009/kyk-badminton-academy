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
import { Check, Plus, Trash2, Trophy, Target, Zap, Star } from 'lucide-react';
import { Program, ProgramSchedule } from '@/types/settings';

const programSchema = z.object({
  title: z.string().min(3, "Title is required"),
  age_range: z.string().min(2, "Age group is required"),
  description: z.string().min(10, "Description is required"),
  icon_name: z.string().default('Trophy'),
  color_class: z.string().default('bg-blue-50'),
  is_visible: z.boolean().default(true),
});

type ProgramFormValues = z.infer<typeof programSchema>;

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  program?: Program | null;
}

const ICONS = ['Trophy', 'Target', 'Zap', 'Star'];
const COLORS = [
  { label: 'Blue', value: 'bg-blue-50' },
  { label: 'Amber', value: 'bg-amber-50' },
  { label: 'Green', value: 'bg-emerald-50' },
  { label: 'Purple', value: 'bg-purple-50' },
  { label: 'Rose', value: 'bg-rose-50' }
];

const ProgramFormModal = ({ isOpen, onClose, onSave, program }: ProgramFormModalProps) => {
  const [features, setFeatures] = React.useState<string[]>([]);
  const [schedule, setSchedule] = React.useState<ProgramSchedule[]>([]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
  });

  useEffect(() => {
    if (program) {
      reset({
        title: program.title,
        age_range: program.age_range,
        description: program.description,
        icon_name: program.icon_name,
        color_class: program.color_class,
        is_visible: program.is_visible,
      });
      setFeatures(program.features || []);
      setSchedule(program.schedule || []);
    } else {
      reset({
        title: '',
        age_range: '',
        description: '',
        icon_name: 'Trophy',
        color_class: 'bg-blue-50',
        is_visible: true,
      });
      setFeatures([]);
      setSchedule([{ label: 'Monday–Friday', time: '6:00 PM – 8:00 PM' }]);
    }
  }, [program, isOpen, reset]);

  const onSubmit = (values: ProgramFormValues) => {
    onSave({
      ...values,
      features,
      schedule,
      id: program?.id
    });
  };

  const addFeature = () => setFeatures([...features, '']);
  const updateFeature = (idx: number, val: string) => {
    const next = [...features];
    next[idx] = val;
    setFeatures(next);
  };
  const removeFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx));

  const addBatch = () => setSchedule([...schedule, { label: '', time: '' }]);
  const updateBatch = (idx: number, field: keyof ProgramSchedule, val: string) => {
    const next = [...schedule];
    next[idx] = { ...next[idx], [field]: val };
    setSchedule(next);
  };
  const removeBatch = (idx: number) => setSchedule(schedule.filter((_, i) => i !== idx));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-20">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {program ? 'Edit Program' : 'Create New Program'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Program Name *</Label>
                <Input {...register('title')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Advanced Coaching" />
                {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group *</Label>
                <Input {...register('age_range')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. 13-18 Years" />
                {errors.age_range && <p className="text-red-500 text-[10px] font-bold">{errors.age_range.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea {...register('description')} className="min-h-[120px] rounded-xl bg-slate-50 border-none font-medium p-4 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Icon</Label>
                  <select {...register('icon_name')} className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm">
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Theme Color</Label>
                  <select {...register('color_class')} className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm">
                    {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-[#0F4C81] uppercase">Program Status</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Visible on public site</p>
                </div>
                <Switch 
                  checked={watch('is_visible')} 
                  onCheckedChange={(val) => setValue('is_visible', val)} 
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Key Features</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addFeature} className="text-[10px] font-black uppercase text-[#0F4C81]">
                    <Plus size={14} className="mr-1" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={f} onChange={(e) => updateFeature(i, e.target.value)} className="h-10 rounded-lg bg-slate-50 border-none text-xs font-bold" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(i)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Timings</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addBatch} className="text-[10px] font-black uppercase text-[#0F4C81]">
                    <Plus size={14} className="mr-1" /> Add Batch
                  </Button>
                </div>
                <div className="space-y-3">
                  {schedule.map((s, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2">
                      <div className="col-span-5">
                        <Input value={s.label} onChange={(e) => updateBatch(i, 'label', e.target.value)} placeholder="Days" className="h-10 rounded-lg bg-slate-50 border-none text-[10px] font-bold" />
                      </div>
                      <div className="col-span-6">
                        <Input value={s.time} onChange={(e) => updateBatch(i, 'time', e.target.value)} placeholder="Time" className="h-10 rounded-lg bg-slate-50 border-none text-[10px] font-bold" />
                      </div>
                      <div className="col-span-1">
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeBatch(i)} className="text-slate-300 hover:text-red-500 h-10 w-full"><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400">Cancel</Button>
            <Button type="submit" className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20">
              <Check className="mr-2" size={20} />
              Save Program
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramFormModal;