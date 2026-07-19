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
import { Plus, Trash2, Check, Clock } from 'lucide-react';
import { BatchTiming, BatchSection } from '@/types/batch';

interface BatchTimingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  batch?: BatchTiming | null;
}

const BatchTimingFormModal = ({ isOpen, onClose, onSave, batch }: BatchTimingFormModalProps) => {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [sections, setSections] = useState<BatchSection[]>([]);

  useEffect(() => {
    if (batch) {
      setName(batch.name);
      setAgeGroup(batch.age_group);
      setSections(batch.sections || []);
    } else {
      setName('');
      setAgeGroup('');
      setSections([{ title: 'General', timings: [{ days: 'Monday–Friday', time: '' }] }]);
    }
  }, [batch, isOpen]);

  const addSection = () => {
    setSections([...sections, { title: '', timings: [{ days: '', time: '' }] }]);
  };

  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const updateSectionTitle = (idx: number, title: string) => {
    const next = [...sections];
    next[idx].title = title;
    setSections(next);
  };

  const addTiming = (sIdx: number) => {
    const next = [...sections];
    next[sIdx].timings.push({ days: '', time: '' });
    setSections(next);
  };

  const removeTiming = (sIdx: number, tIdx: number) => {
    const next = [...sections];
    next[sIdx].timings = next[sIdx].timings.filter((_, i) => i !== tIdx);
    setSections(next);
  };

  const updateTiming = (sIdx: number, tIdx: number, field: 'days' | 'time', value: string) => {
    const next = [...sections];
    next[sIdx].timings[tIdx][field] = value;
    setSections(next);
  };

  const handleSave = () => {
    onSave({
      id: batch?.id,
      name,
      age_group: ageGroup,
      sections,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Clock className="text-[#FFC107]" size={32} />
              {batch ? 'Edit Batch Timing' : 'Add New Batch'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Beginner Batch" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group *</Label>
              <Input value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} placeholder="e.g. 6–12 Years" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Time Slots & Sections</h3>
              <Button onClick={addSection} variant="ghost" className="text-[10px] font-black uppercase text-[#0F4C81]">
                <Plus className="mr-1" size={14} /> Add Section
              </Button>
            </div>

            {sections.map((section, sIdx) => (
              <div key={sIdx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                <div className="flex items-center gap-4">
                  <Input 
                    value={section.title || ''} 
                    onChange={(e) => updateSectionTitle(sIdx, e.target.value)} 
                    placeholder="Section Title (e.g. Morning - Optional)" 
                    className="h-10 rounded-lg bg-white border-none font-bold text-xs flex-grow"
                  />
                  <Button onClick={() => removeSection(sIdx)} variant="ghost" className="text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="space-y-3">
                  {section.timings.map((timing, tIdx) => (
                    <div key={tIdx} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-5">
                        <Input 
                          value={timing.days} 
                          onChange={(e) => updateTiming(sIdx, tIdx, 'days', e.target.value)} 
                          placeholder="Days (e.g. Mon–Fri)" 
                          className="h-10 rounded-lg bg-white border-none text-xs font-medium"
                        />
                      </div>
                      <div className="col-span-6">
                        <Input 
                          value={timing.time} 
                          onChange={(e) => updateTiming(sIdx, tIdx, 'time', e.target.value)} 
                          placeholder="Time (e.g. 6:00 AM – 7:00 AM)" 
                          className="h-10 rounded-lg bg-white border-none text-xs font-medium"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button onClick={() => removeTiming(sIdx, tIdx)} variant="ghost" className="h-8 w-8 p-0 text-slate-300">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => addTiming(sIdx)} variant="outline" className="w-full h-10 rounded-lg border-dashed border-2 border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                    <Plus className="mr-1" size={12} /> Add Row
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400">Cancel</Button>
            <Button onClick={handleSave} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20">
              <Check className="mr-2" size={20} />
              Save Batch Configuration
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchTimingFormModal;