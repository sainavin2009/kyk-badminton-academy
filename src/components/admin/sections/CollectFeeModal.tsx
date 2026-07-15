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
import { Check, DollarSign } from 'lucide-react';

const feeSchema = z.object({
  student_id: z.string().min(1, "Student selection is required"),
  amount: z.string().min(1, "Amount is required"),
  payment_type: z.string().min(1, "Type is required"),
  payment_method: z.string().min(1, "Method is required"),
  billing_month: z.string().optional(),
  notes: z.string().optional(),
});

type FeeFormValues = z.infer<typeof feeSchema>;

interface CollectFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  students: any[];
  selectedStudentId?: string;
}

const CollectFeeModal = ({ isOpen, onClose, onSave, students, selectedStudentId }: CollectFeeModalProps) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FeeFormValues>({
    resolver: zodResolver(feeSchema),
  });

  const paymentType = watch('payment_type');

  useEffect(() => {
    if (isOpen) {
      reset({
        student_id: selectedStudentId || '',
        amount: '',
        payment_type: 'Monthly',
        payment_method: 'UPI',
        billing_month: new Date().toISOString().slice(0, 7),
        notes: '',
      });
    }
  }, [isOpen, selectedStudentId, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <DollarSign className="text-[#FFC107]" size={32} />
              Collect Fee
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Student *</Label>
              <select 
                {...register('student_id')}
                className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107] outline-none"
              >
                <option value="">Choose Student...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (#{s.student_id_serial})</option>
                ))}
              </select>
              {errors.student_id && <p className="text-red-500 text-[10px] font-bold">{errors.student_id.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount ($) *</Label>
                <Input {...register('amount')} type="number" placeholder="0.00" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                {errors.amount && <p className="text-red-500 text-[10px] font-bold">{errors.amount.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fee Type</Label>
                <select 
                  {...register('payment_type')}
                  className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81]"
                >
                  <option value="Monthly">Monthly Fee</option>
                  <option value="Admission">Admission Fee</option>
                  <option value="Tournament">Tournament Fee</option>
                  <option value="Custom">Custom Charge</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Method</Label>
                <select 
                  {...register('payment_method')}
                  className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81]"
                >
                  <option value="UPI">UPI / GPay</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Transfer">Bank Transfer</option>
                </select>
              </div>
              {paymentType === 'Monthly' && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Billing Month</Label>
                  <Input {...register('billing_month')} type="month" className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notes / Remarks</Label>
              <Textarea {...register('notes')} placeholder="Optional notes about this payment..." className="min-h-[100px] rounded-2xl bg-slate-50 border-none font-bold p-5" />
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
              Confirm Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectFeeModal;