"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  Plus, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar,
  ChevronUp,
  ChevronDown,
  Loader2
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

  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('batch_timings')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBatches(data || []);
    } catch (err: any) {
      console.error("[Read Error]", err.message);
      toast.error('Failed to load batches: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const handleSave = async (formData: any) => {
    const isUpdate = !!formData.id;
    try {
      const payload = {
        batch_name: formData.batch_name,
        age_group: formData.age_group,
        days: formData.days,
        timings: formData.timings,
        description: formData.description,
        display_order: formData.display_order,
        updated_at: new Date().toISOString()
      };

      if (isUpdate) {
        const { error } = await supabase
          .from('batch_timings')
          .update(payload)
          .eq('id', formData.id);
        if (error) throw error;
        toast.success("Batch updated successfully.");
      } else {
        const { error } = await supabase
          .from('batch_timings')
          .insert([{ ...payload, is_visible: true }]);
        if (error) throw error;
        toast.success("New batch created successfully.");
      }
      
      setIsModalOpen(false);
      await fetchBatches(); // Verified: Direct Supabase fetch after save
    } catch (err: any) {
      console.error("[Save Error]", err.message);
      toast.error('Operation failed: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('batch_timings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success("Batch deleted from database.");
      await fetchBatches(); // Verified: Direct Supabase fetch after delete
    } catch (err: any) {
      console.error("[Delete Error]", err.message);
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
      await fetchBatches();
    } catch (err: any) {
      toast.error('Update failed: ' + err.message);
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= batches.length) return;

    try {
      const currentBatch = batches[index];
      const targetBatch = batches[swapIndex];

      const { error: err1 } = await supabase
        .from('batch_timings')
        .update({ display_order: targetBatch.display_order })
        .eq('id', currentBatch.id);
      
      const { error: err2 } = await supabase
        .from('batch_timings')
        .update({ display_order: currentBatch.display_order })
        .eq('id', targetBatch.id);

      if (err1 || err2) throw new Error("Order update failed");
      
      await fetchBatches();
      toast.success("Order synchronized.");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">Training Schedules</h2>
          <p className="text-slate-500 font-medium">Manage batch timings displayed on the public site.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchBatches} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setEditingBatch(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all group"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Add Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading && batches.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-black uppercase text-[10px] tracking-widest">Accessing Schedule Registry...</p>
          </div>
        ) : batches.length > 0 ? batches.map((batch, index) => (
          <Card key={batch.id} className={cn(
            "p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group overflow-hidden relative",
            !batch.is_visible && "opacity-60 grayscale-[0.4]"
          )}>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveOrder(index, 'up')} className="h-10 w-10 rounded-xl hover:bg-[#FFC107] text-[#0F4C81]"><ChevronUp size={24} /></Button>
                <div className="w-16 h-16 rounded-[1.8rem] bg-blue-50 flex items-center justify-center group-hover:bg-[#FFC107] text-[#0F4C81] transition-colors shadow-sm"><Clock size={28} strokeWidth={2.5} /></div>
                <Button variant="ghost" size="icon" disabled={index === batches.length - 1} onClick={() => moveOrder(index, 'down')} className="h-10 w-10 rounded-xl hover:bg-[#FFC107] text-[#0F4C81]"><ChevronDown size={24} /></Button>
              </div>

              <div className="flex-grow space-y-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tighter leading-none">{batch.batch_name}</h3>
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 px-3 py-1">{batch.age_group}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-[#FFC107] mt-0.5" />
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400">Weekly Cycle</p>
                         <p className="text-sm font-bold text-[#0F4C81]">{batch.days}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-[#FFC107] mt-0.5" />
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400">Timings</p>
                         <p className="text-sm font-bold text-slate-600 whitespace-pre-line leading-relaxed italic">{batch.timings}</p>
                      </div>
                    </div>
                  </div>
                  {batch.description && (
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 h-fit">
                       <p className="text-xs font-medium text-slate-500 leading-relaxed italic">"{batch.description}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 self-center lg:self-start lg:pl-10 lg:border-l lg:border-slate-50">
                <Button variant="ghost" onClick={() => toggleVisibility(batch)} className={cn("h-12 w-12 rounded-2xl transition-all", batch.is_visible ? "bg-green-50 text-green-500" : "bg-slate-50 text-slate-300")}>{batch.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}</Button>
                <Button variant="ghost" onClick={() => { setEditingBatch(batch); setIsModalOpen(true); }} className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600"><Edit3 size={20} /></Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-12 w-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white">
                      <Trash2 size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[3rem]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black uppercase text-[#0F4C81]">Delete batch timing?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-500 font-medium">
                        Are you sure you want to remove <span className="font-bold text-[#0F4C81]">"{batch.batch_name}"</span>? This action is irreversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(batch.id)} 
                        className="rounded-2xl h-14 font-black uppercase bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Purge Record
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        )) : (
          <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
             <Clock className="mx-auto mb-6 text-slate-200" size={48} />
             <p className="text-slate-400 font-medium">The training registry is empty.</p>
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