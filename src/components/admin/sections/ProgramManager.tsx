"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  RefreshCw,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { toast } from 'sonner';
import { Program } from '@/types/settings';
import ProgramFormModal from './ProgramFormModal';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProgramManager = () => {
  const { programs, refresh, loading } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleOpenCreate = () => {
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      if (data.id) {
        const { error } = await supabase
          .from('programs')
          .update({
            title: data.title,
            age_range: data.age_range,
            description: data.description,
            features: data.features,
            schedule: data.schedule,
            icon_name: data.icon_name,
            color_class: data.color_class,
            is_visible: data.is_visible,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id);
        if (error) throw error;
        toast.success("Program updated successfully");
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([{
            ...data,
            order_index: programs.length
          }]);
        if (error) throw error;
        toast.success("New program created");
      }
      setIsModalOpen(false);
      await refresh();
    } catch (err: any) {
      toast.error('Operation failed: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) throw error;
      toast.success("Program deleted");
      await refresh();
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  const toggleVisibility = async (program: Program) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update({ is_visible: !program.is_visible })
        .eq('id', program.id);
      if (error) throw error;
      await refresh();
    } catch (err: any) {
      toast.error('Toggle failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Offerings</h2>
          <p className="text-slate-500 font-medium">Manage dynamic training programs and their batch timings.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={refresh} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={handleOpenCreate}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl group transition-all"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Create Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {programs.length > 0 ? programs.map((program) => (
          <Card key={program.id} className={cn(
            "p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group overflow-hidden relative",
            !program.is_visible && "opacity-60 bg-slate-50/50"
          )}>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className={cn(
                "w-20 h-20 rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-sm transition-colors",
                program.color_class || 'bg-blue-50',
                "group-hover:bg-[#FFC107] text-[#0F4C81]"
              )}>
                <LayoutGrid size={32} strokeWidth={1.5} />
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tighter">{program.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[#0F4C81] text-[9px] font-black uppercase tracking-widest">
                    {program.age_range}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-2xl">
                  "{program.description}"
                </p>
                <div className="flex flex-wrap gap-4">
                  {program.schedule?.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                      <Clock size={12} className="text-[#FFC107]" />
                      {s.label}: {s.time}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 self-center lg:self-start">
                <Button 
                  variant="ghost" 
                  onClick={() => toggleVisibility(program)}
                  className={cn(
                    "h-12 w-12 rounded-2xl",
                    program.is_visible ? "text-green-500 hover:bg-green-50" : "text-slate-300 hover:bg-slate-100"
                  )}
                >
                  {program.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => handleOpenEdit(program)}
                  className="h-12 w-12 rounded-2xl text-blue-500 hover:bg-blue-50"
                >
                  <Edit3 size={20} />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-12 w-12 rounded-2xl text-red-400 hover:bg-red-50">
                      <Trash2 size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[2.5rem]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black uppercase text-[#0F4C81]">Remove Program?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-500 font-medium">
                        This will permanently delete the program "{program.title}" and its settings.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(program.id)}
                        className="rounded-2xl h-14 font-black uppercase bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Purge Program
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        )) : (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <LayoutGrid className="mx-auto text-slate-200 mb-4" size={48} />
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase">No Programs Defined</h3>
            <p className="text-slate-400 font-medium mt-2">Initialize your academy offerings by creating your first program.</p>
          </div>
        )}
      </div>

      <ProgramFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        program={selectedProgram}
      />
    </div>
  );
};

export default ProgramManager;