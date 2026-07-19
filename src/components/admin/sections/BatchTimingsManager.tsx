"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  Plus, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BatchTiming } from '@/types/batch';
import BatchTimingFormModal from './BatchTimingFormModal';
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

const BatchTimingsManager = () => {
  const [batches, setBatches] = useState<BatchTiming[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<BatchTiming | null>(null);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('batch_timings')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBatches(data || []);
    } catch (err: any) {
      toast.error('Failed to load batches: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (formData.id) {
        const { error } = await supabase
          .from('batch_timings')
          .update({
            batch_name: formData.batch_name,
            age_group: formData.age_group,
            days: formData.days,
            timings: formData.timings,
            display_order: formData.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);
        if (error) throw error;
        toast.success("Batch updated successfully");
      } else {
        const { error } = await supabase
          .from('batch_timings')
          .insert([formData]);
        if (error) throw error;
        toast.success("New batch timing added");
      }
      setIsModalOpen(false);
      fetchBatches();
    } catch (err: any) {
      toast.error('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('batch_timings').delete().eq('id', id);
      if (error) throw error;
      toast.success("Batch removed");
      fetchBatches();
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  const toggleVisibility = async (batch: BatchTiming) => {
    try {
      const { error } = await supabase
        .from('batch_timings')
        .update({ is_visible: !batch.is_visible })
        .eq('id', batch.id);
      if (error) throw error;
      fetchBatches();
    } catch (err: any) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Batch Schedule Management</h2>
          <p className="text-slate-500 font-medium">Control the training schedules displayed on the public website.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchBatches} className="h-16 w-16 rounded-2xl text-slate-400">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setEditingBatch(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl"
          >
            <Plus className="mr-3" />
            Add Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {batches.length > 0 ? batches.map((batch) => (
          <Card key={batch.id} className={cn(
            "p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group overflow-hidden relative",
            !batch.is_visible && "opacity-60 grayscale-[0.5]"
          )}>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#FFC107] text-[#0F4C81] transition-colors">
                <Clock size={28} strokeWidth={2.5} />
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tighter">{batch.batch_name}</h3>
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 px-3">
                    <Users size={10} className="mr-1.5" /> {batch.age_group}
                  </Badge>
                  <Badge className="bg-slate-100 text-slate-400 border-none shadow-none rounded-lg text-[9px] font-black">Order: {batch.display_order}</Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-[#FFC107] mt-0.5" />
                    <p className="text-sm font-bold text-[#0F4C81]">{batch.days}</p>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic whitespace-pre-line">
                      {batch.timings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-center lg:self-start">
                <Button 
                  variant="ghost" 
                  onClick={() => toggleVisibility(batch)}
                  className={cn("h-12 w-12 rounded-2xl", batch.is_visible ? "text-green-500" : "text-slate-300")}
                >
                  {batch.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => { setEditingBatch(batch); setIsModalOpen(true); }}
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
                      <AlertDialogTitle className="text-2xl font-black uppercase">Delete Schedule?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-500 font-medium">Remove "{batch.batch_name}" permanently?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                      <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(batch.id)} className="rounded-2xl h-14 font-black uppercase bg-red-500 hover:bg-red-600 text-white border-none">Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        )) : (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <Clock className="mx-auto text-slate-200 mb-4" size={48} />
             <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">No batch timings found.</p>
          </div>
        )}
      </div>

      <BatchTimingFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        batch={editingBatch}
      />
    </div>
  );
};

export default BatchTimingsManager;