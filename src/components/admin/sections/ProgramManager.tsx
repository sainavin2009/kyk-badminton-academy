"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Program } from '@/types/settings';

const ProgramManager = () => {
  const { programs, refresh } = useSettings();
  const [editingPrograms, setEditingPrograms] = useState<Program[]>(programs);

  React.useEffect(() => {
    setEditingPrograms(programs);
  }, [programs]);

  const handleUpdate = (id: string, field: keyof Program, value: any) => {
    setEditingPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSave = async (program: Program) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update(program)
        .eq('id', program.id);

      if (error) throw error;
      toast.success(`Program "${program.title}" updated`);
      await refresh();
    } catch (err: any) {
      toast.error('Failed to save: ' + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">Training Programs</h3>
        <Button variant="outline" className="rounded-2xl h-12 border-none bg-white shadow-sm font-bold text-[#0F4C81]">
          <Plus className="mr-2" size={18} /> Add New Program
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {editingPrograms.map((program) => (
          <Card key={program.id} className="p-8 rounded-[3rem] border-none shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Program Title</label>
                  <Input 
                    value={program.title}
                    onChange={(e) => handleUpdate(program.id, 'title', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Range</label>
                  <Input 
                    value={program.age_range}
                    onChange={(e) => handleUpdate(program.id, 'age_range', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                <Textarea 
                  value={program.description}
                  onChange={(e) => handleUpdate(program.id, 'description', e.target.value)}
                  className="min-h-[104px] rounded-xl bg-slate-50 border-none font-medium p-4 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
              <Button 
                onClick={() => handleSave(program)}
                className="rounded-xl h-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-bold"
              >
                <Save className="mr-2" size={16} /> Save Changes
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgramManager;