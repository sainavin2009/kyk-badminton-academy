"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, ShieldCheck, Eye, EyeOff, GripVertical, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Program, ProgramSchedule } from '@/types/settings';
import { Switch } from '@/components/ui/switch';

const ProgramManager = () => {
  const { programs, refresh } = useSettings();
  const [editingPrograms, setEditingPrograms] = useState<Program[]>(programs);

  React.useEffect(() => {
    setEditingPrograms(programs);
  }, [programs]);

  const handleUpdate = (id: string, field: keyof Program, value: any) => {
    setEditingPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleUpdateSchedule = (progId: string, idx: number, field: keyof ProgramSchedule, value: string) => {
    setEditingPrograms(prev => prev.map(p => {
      if (p.id === progId) {
        const newSchedule = [...(p.schedule || [])];
        newSchedule[idx] = { ...newSchedule[idx], [field]: value };
        return { ...p, schedule: newSchedule };
      }
      return p;
    }));
  };

  const addScheduleItem = (progId: string) => {
    setEditingPrograms(prev => prev.map(p => {
      if (p.id === progId) {
        return { ...p, schedule: [...(p.schedule || []), { label: '', time: '' }] };
      }
      return p;
    }));
  };

  const removeScheduleItem = (progId: string, idx: number) => {
    setEditingPrograms(prev => prev.map(p => {
      if (p.id === progId) {
        return { ...p, schedule: p.schedule.filter((_, i) => i !== idx) };
      }
      return p;
    }));
  };

  const handleSave = async (program: Program) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update({
          title: program.title,
          age_range: program.age_range,
          description: program.description,
          features: program.features,
          schedule: program.schedule,
          is_visible: program.is_visible,
          order_index: program.order_index
        })
        .eq('id', program.id);

      if (error) throw error;
      toast.success(`Program "${program.title}" synchronized`);
      await refresh();
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Training Programs</h3>
        <Button variant="outline" className="rounded-2xl h-12 border-none bg-white shadow-sm font-bold text-[#0F4C81]">
          <Plus className="mr-2" size={18} /> New Program
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {editingPrograms.map((program) => (
          <Card key={program.id} className="p-8 md:p-10 rounded-[3rem] border-none shadow-sm bg-white space-y-8 relative overflow-hidden">
            {!program.is_visible && <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px] z-10 pointer-events-none" />}
            
            <div className="flex justify-between items-center relative z-20">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-[#0F4C81] rounded-2xl"><GripVertical size={20} /></div>
                <h4 className="font-black text-[#0F4C81] uppercase tracking-tight">Live Program Editor</h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">Visibility</span>
                  <Switch 
                    checked={program.is_visible} 
                    onCheckedChange={(val) => handleUpdate(program.id, 'is_visible', val)} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Program Title</label>
                  <Input 
                    value={program.title}
                    onChange={(e) => handleUpdate(program.id, 'title', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-black text-[#0F4C81]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Audience / Age</label>
                  <Input 
                    value={program.age_range}
                    onChange={(e) => handleUpdate(program.id, 'age_range', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                  <Textarea 
                    value={program.description}
                    onChange={(e) => handleUpdate(program.id, 'description', e.target.value)}
                    className="min-h-[120px] rounded-xl bg-slate-50 border-none font-medium p-4 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Timings</label>
                    <button onClick={() => addScheduleItem(program.id)} className="text-[10px] font-black uppercase text-[#0F4C81] hover:text-[#FFC107]">Add Slot +</button>
                  </div>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    {program.schedule?.map((item, sidx) => (
                      <div key={sidx} className="flex gap-2 items-center">
                        <Input 
                          placeholder="Batch Name" 
                          value={item.label} 
                          onChange={(e) => handleUpdateSchedule(program.id, sidx, 'label', e.target.value)}
                          className="h-10 text-[10px] font-bold rounded-lg bg-slate-50 border-none"
                        />
                        <Input 
                          placeholder="Timing" 
                          value={item.time} 
                          onChange={(e) => handleUpdateSchedule(program.id, sidx, 'time', e.target.value)}
                          className="h-10 text-[10px] font-bold rounded-lg bg-slate-50 border-none"
                        />
                        <button onClick={() => removeScheduleItem(program.id, sidx)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-end gap-3 relative z-20">
              <Button 
                onClick={() => handleSave(program)}
                className="h-14 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl"
              >
                <Save className="mr-2" size={18} /> Sync Program Data
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgramManager;