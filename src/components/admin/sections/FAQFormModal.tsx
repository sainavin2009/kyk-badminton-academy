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
import { Check, HelpCircle, Loader2 } from 'lucide-react';
import { FAQ } from '@/types/faq';

const faqSchema = z.object({
  question: z.string().min(5, "Question is too short"),
  answer: z.string().min(10, "Answer is too short"),
  display_order: z.string().or(z.number()).transform(v => Number(v)),
  is_active: z.boolean().default(true),
});

type FAQFormValues = z.infer<typeof faqSchema>;

interface FAQFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  faq?: FAQ | null;
}

const FAQFormModal = ({ isOpen, onClose, onSave, faq }: FAQFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      is_active: true,
      display_order: 0
    }
  });

  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
        display_order: faq.display_order,
        is_active: faq.is_active,
      });
    } else {
      reset({
        question: '',
        answer: '',
        display_order: 0,
        is_active: true,
      });
    }
  }, [faq, isOpen, reset]);

  const onSubmit = async (data: FAQFormValues) => {
    setIsSubmitting(true);
    try {
      await onSave({ ...data, id: faq?.id });
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
              <HelpCircle className="text-[#FFC107]" size={32} />
              {faq ? 'Update FAQ' : 'New Question'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Question *</Label>
              <Input 
                {...register('question')} 
                className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" 
                placeholder="e.g. What are the academy timings?"
              />
              {errors.question && <p className="text-red-500 text-[10px] font-bold">{errors.question.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer *</Label>
              <Textarea 
                {...register('answer')} 
                className="min-h-[150px] rounded-[2rem] bg-slate-50 border-none font-medium p-6 resize-none" 
                placeholder="Provide a detailed response..."
              />
              {errors.answer && <p className="text-red-500 text-[10px] font-bold">{errors.answer.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
                <Input type="number" {...register('display_order')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                 <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-[#0F4C81]">Active on Website</span>
                    <Switch checked={watch('is_active')} onCheckedChange={(val) => setValue('is_active', val)} />
                 </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" size={20} />}
              {faq ? 'Update FAQ' : 'Publish FAQ'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FAQFormModal;