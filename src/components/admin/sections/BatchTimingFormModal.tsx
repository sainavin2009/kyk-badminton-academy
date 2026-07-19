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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { BatchTiming } from '@/types/batch';

const batchSchema = z.object({
  batch_name: z.string().min(1, "Batch name is required"),
  age_group: z.string().min(1, "Age group is required"),
  days: z.string().min(1, "Training days are required"),
  timings: z.string().min(1, "Timing details are required"),
  description: z.string().optional(),
  display_order: z.preprocess((val) => Number(val), z.number().min(0)),
});

type BatchFormValues = z.infer<typeof batchSchema>;

interface BatchTimingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  batch?: BatchTiming | null;
}

const BatchTimingFormModal = ({ isOpen, onClose, onSave, batch }: BatchTimingFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
  });

  useEffect(() => {
    if (batch) {
      reset({
        batch_name: batch.batch_name,
        age_group: batch.age_group,
        days: batch.days,
        timings: batch.timings,
        description: batch.description || '',
        display_order: batch.display_order
      });
    } else {
      reset({
        batch_name: '',
        age_group: '',
        days: 'Monday–Friday',
        timings: '',
        description: '',
        display_order: 0
      });
    }
  }, [batch, isOpen, reset]);

  const onSubmit = (data: BatchFormValues) => {
    onSave({
      id: batch?.id,
      ...data
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Clock className="text-[#FFC107]" size={32} />
              {batch ? 'Edit Batch Configuration' : 'Create New Batch'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Name *</Label>
              <Input 
                {...register('batch_name')}
                placeholder="e.g. Beginner Foundation" 
                className={`h-12 rounded-xl bg-slate-50 border-none font-bold ${errors.batch_name ? 'ring-2 ring-red-500' : ''}`} 
              />
              {errors.batch_name && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle size={12} /> {errors.batch_name.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group *</Label>
                <Input 
                  {...register('age_group')}
                  placeholder="e.g. 6–12 Years" 
                  className={`h-12 rounded-xl bg-slate-50 border-none font-bold ${errors.age_group ? 'ring-2 ring-red-500' : ''}`} 
                />
                {errors.age_group && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle size={12} /> {errors.age_group.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
                <Input 
                  {...register('display_order')}
                  type="number" 
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Days *</Label>
              <Input 
                {...register('days')}
                placeholder="e.g. Monday–Friday" 
                className={`h-12 rounded-xl bg-slate-50 border-none font-bold ${errors.days ? 'ring-2 ring-red-500' : ''}`} 
              />
              {errors.days && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle size={12} /> {errors.days.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timing Details *</Label>
              <Textarea 
                {...register('timings')}
                placeholder="e.g. Morning: 6:00 AM – 7:00 AM" 
                className={`min-h-[100px] rounded-xl bg-slate-50 border-none font-medium p-4 ${errors.timings ? 'ring-2 ring-red-500' : ''}`} 
              />
              {errors.timings && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1"><AlertCircle size={12} /> {errors.timings.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Additional Info (Optional)</Label>
              <Input 
                {...register('description')}
                placeholder="e.g. Limited slots available" 
                className="h-12 rounded-xl bg-slate-50 border-none font-medium" 
              />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500">
              Discard
            </Button>
            <Button type="submit" className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all">
              <Check className="mr-2" size={20} />
              {batch ? 'Synchronize Updates' : 'Commit Batch'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BatchTimingFormModal;