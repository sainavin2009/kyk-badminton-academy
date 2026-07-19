"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, X, Loader2 } from 'lucide-react';
import { BatchTiming } from '@/types/batch';

interface BatchFormProps {
  initialData?: Partial<BatchTiming>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BatchForm = ({ initialData, onSave, onCancel, isLoading }: BatchFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    age_group: initialData?.age_group || '',
    days: initialData?.days || 'Monday–Friday',
    timing: initialData?.timing || '',
    display_order: initialData?.display_order || 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-[#FFC107] rounded-[2.5rem] p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Name *</Label>
          <Input 
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
            placeholder="e.g. Morning Elite"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group *</Label>
          <Input 
            required
            value={formData.age_group}
            onChange={e => setFormData({...formData, age_group: e.target.value})}
            className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
            placeholder="e.g. 6–12 Years"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Days *</Label>
          <Input 
            required
            value={formData.days}
            onChange={e => setFormData({...formData, days: e.target.value})}
            className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
          <Input 
            type="number"
            value={formData.display_order}
            onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
            className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timing Details *</Label>
          <Textarea 
            required
            value={formData.timing}
            onChange={e => setFormData({...formData, timing: e.target.value})}
            className="min-h-[100px] rounded-xl bg-slate-50 border-none font-medium p-4" 
            placeholder="Morning: 6:00 AM – 7:30 AM"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel}
          className="h-12 px-8 rounded-xl font-bold text-slate-400"
        >
          <X className="mr-2" size={18} /> Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="h-12 px-10 rounded-xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" />}
          Save Batch
        </Button>
      </div>
    </form>
  );
};

export default BatchForm;