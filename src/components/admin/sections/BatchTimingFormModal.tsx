"use client";

import React, { useEffect, useState } from 'react';
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
import { Check, Clock } from 'lucide-react';
import { BatchTiming } from '@/types/batch';

interface BatchTimingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  batch?: BatchTiming | null;
}

const BatchTimingFormModal = ({ isOpen, onClose, onSave, batch }: BatchTimingFormModalProps) => {
  const [formData, setFormData] = useState({
    batch_name: '',
    age_group: '',
    days: '',
    timings: '',
    display_order: 0
  });

  useEffect(() => {
    if (batch) {
      setFormData({
        batch_name: batch.batch_name,
        age_group: batch.age_group,
        days: batch.days,
        timings: batch.timings,
        display_order: batch.display_order
      });
    } else {
      setFormData({
        batch_name: '',
        age_group: '',
        days: 'Monday–Friday',
        timings: '',
        display_order: 0
      });
    }
  }, [batch, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'display_order' ? parseInt(value) || 0 : value }));
  };

  const handleSave = () => {
    onSave({
      id: batch?.id,
      ...formData
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Clock className="text-[#FFC107]" size={32} />
              {batch ? 'Edit Batch Timing' : 'Add New Batch'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Name *</Label>
              <Input name="batch_name" value={formData.batch_name} onChange={handleChange} placeholder="e.g. Beginner Batch" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group *</Label>
                <Input name="age_group" value={formData.age_group} onChange={handleChange} placeholder="e.g. 6–12 Years" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</Label>
                <Input name="display_order" type="number" value={formData.display_order} onChange={handleChange} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Days *</Label>
              <Input name="days" value={formData.days} onChange={handleChange} placeholder="e.g. Monday–Friday" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timing Details *</Label>
              <Textarea 
                name="timings" 
                value={formData.timings} 
                onChange={handleChange} 
                placeholder="e.g. Morning: 6:00 AM – 7:00 AM | Evening: 4:30 PM – 5:30 PM" 
                className="min-h-[100px] rounded-xl bg-slate-50 border-none font-medium p-4" 
              />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400">Cancel</Button>
            <Button onClick={handleSave} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl">
              <Check className="mr-2" size={20} />
              Save Configuration
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchTimingFormModal;