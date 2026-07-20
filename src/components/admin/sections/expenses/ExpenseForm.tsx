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
import { Check, DollarSign, Calendar, Tag } from 'lucide-react';
import { AcademyExpense } from '@/types/expense';

const CATEGORIES = ['Rent', 'Utilities', 'Salaries', 'Maintenance', 'Equipment', 'Marketing', 'Other'];

const expenseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  amount: z.string().or(z.number()).transform(v => Number(v)),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  expense?: AcademyExpense | null;
}

const ExpenseForm = ({ isOpen, onClose, onSave, expense }: ExpenseFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
  });

  useEffect(() => {
    if (expense) {
      reset({
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        date: expense.date.split('T')[0],
        notes: expense.notes || '',
      });
    } else {
      reset({
        title: '',
        category: 'Rent',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
  }, [expense, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <span className="text-[#FFC107] text-2xl font-black">₹</span>
              Record Expense
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expense Title *</Label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input {...register('title')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold text-[#0F4C81]" placeholder="e.g. Electricity Bill Jan" />
              </div>
              {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount (₹) *</Label>
                <Input type="number" step="0.01" {...register('amount')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
                {errors.amount && <p className="text-red-500 text-[10px] font-bold">{errors.amount.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                <select 
                  {...register('category')}
                  className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107] outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input type="date" {...register('date')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              {errors.date && <p className="text-red-500 text-[10px] font-bold">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Remarks / Description</Label>
              <Textarea {...register('notes')} placeholder="Optional receipt or breakdown details..." className="min-h-[100px] rounded-2xl bg-slate-50 border-none font-bold p-5" />
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
              {expense ? 'Update Expense' : 'Log Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;