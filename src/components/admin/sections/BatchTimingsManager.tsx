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
  Calendar,
  ChevronUp,
  ChevronDown,
  Info
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

      if (error) {
        console.error("Database error in batch_timings query:", error);
        throw new Error('Failed to synchronize with the academy infrastructure. Please verify database table existence.');
      }
      setBatches(data || []);
    } catch (err: any) {
      toast.error(err.message);
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
            description: formData.description,
            display_order: formData.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);
        if (error) throw error;
        toast.success("Schedule profile updated successfully.");
      } else {
        const { error } = await supabase
          .from('batch_timings')
          .insert([{
            ...formData,
            is_visible: true
          }]);
        if (error) throw error;
        toast.success("New training batch integrated.");
      }
      setIsModalOpen(false);
      fetchBatches();
    } catch (err: any) {
      toast.error('Data persistence failed: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('batch_timings').delete().eq('id', id);
      if (error) throw error;
      toast.success("Batch purged from academy registry.");
      fetchBatches();
    } catch (err: any) {
      toast.error('Termination failed: ' + err.message);
    }
  };

  const toggleVisibility = async (batch: BatchTiming) => {
    try {
      const { error } = await supabase
        .from('batch_timings')
        .update({ is_visible: !batch.is_visible })
        .eq('id', batch.id);
      if (error) throw error;
      toast.success(`Batch is now ${!batch.is_visible ? 'live' : 'hidden'}`);
      fetchBatches();
    } catch (err: any) {
      toast.error('Visibility update failed');
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const newBatches = [...batches];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (swapIndex < 0 || swapIndex >= batches.length) return;

    // Swap locally
    const temp = newBatches[index];
    newBatches[index] = newBatches[swapIndex];
    newBatches[swapIndex] = temp;

    // Update orders
    const updates = newBatches.map((b, i) => ({
      id: b.id,
      display_order: i
    }));

    setBatches(newBatches);

    try {
      for (const update of updates) {
        await supabase
          .from('batch_timings')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      toast.success("Presentation sequence updated.");
    } catch (err: any) {
      toast.error("Ordering sync failed.");
      fetchBatches();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">Training Schedules</h2>
          <p className="text-slate-500 font-medium">Control the real-time batch timings displayed on the academy website.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchBatches} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setEditingBatch(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all group"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Provision Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
            <RefreshCw className="animate-spin" size={48} />
            <p className="font-black uppercase text-[10px] tracking-widest">Scanning Schedule Database...</p>
          </div>
        ) : batches.length > 0 ? batches.map((batch, index) => (
          <Card key={batch.id} className={cn(
            "p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group overflow-hidden relative",
            !batch.is_visible && "opacity-60 grayscale-[0.4]"
          )}>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={index === 0}
                  onClick={() => moveOrder(index, 'up')}
                  className="h-10 w-10 rounded-xl hover:bg-[#FFC107] text-[#0F4C81]"
                >
                  <ChevronUp size={24} />
                </Button>
                <div className="w-16 h-16 rounded-[1.8rem] bg-blue-50 flex items-center justify-center group-hover:bg-[#FFC107] text-[#0F4C81] transition-colors shadow-sm">
                  <Clock size={28} strokeWidth={2.5} />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={index === batches.length - 1}
                  onClick={() => moveOrder(index, 'down')}
                  className="h-10 w-10 rounded-xl hover:bg-[#FFC107] text-[#0F4C81]"
                >
                  <ChevronDown size={24} />
                </Button>
              </div>

              <div className="flex-grow space-y-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tighter leading-none">{batch.batch_name}</h3>
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 px-3 py-1">
                    <Users size={10} className="mr-1.5" /> {batch.age_group}
                  </Badge>
                  <Badge className="bg-slate-50 text-slate-400 border-none shadow-none rounded-lg text-[9px] font-black">Sequence: {batch.display_order}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-[#FFC107] mt-0.5" />
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weekly Cycle</p>
                         <p className="text-sm font-bold text-[#0F4C81]">{batch.days}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-[#FFC107] mt-0.5" />
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Timings</p>
                         <p className="text-sm font-bold text-slate-600 whitespace-pre-line leading-relaxed italic">
                            {batch.timings}
                         </p>
                      </div>
                    </div>
                  </div>

                  {batch.description && (
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 h-fit">
                       <div className="flex items-center gap-2 mb-2 text-[#0F4C81]">
                          <Info size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Admin Note</span>
                       </div>
                       <p className="text-xs font-medium text-slate-500 leading-relaxed italic">"{batch.description}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 self-center lg:self-start lg:pl-10 lg:border-l lg:border-slate-50">
                <Button 
                  variant="ghost" 
                  onClick={() => toggleVisibility(batch)}
                  className={cn(
                    "h-12 w-12 rounded-2xl transition-all",
                    batch.is_visible ? "bg-green-50 text-green-500 hover:bg-green-100" : "bg-slate-50 text-slate-300 hover:bg-slate-100"
                  )}
                >
                  {batch.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => { setEditingBatch(batch); setIsModalOpen(true); }}
                  className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 hover:bg-blue-100"
                >
                  <Edit3 size={20} />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-12 w-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white">
                      <Trash2 size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[3rem]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-3xl font-black uppercase text-[#0F4C81] tracking-tighter">Decommission Batch?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-500 font-medium text-base">
                        This action will permanently remove <span className="text-[#0F4C81] font-black">"{batch.batch_name}"</span> from the training registry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50 px-8">Abort</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(batch.id)} 
                        className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none px-10"
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        )) : (
          <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-slate-200" size={48} />
             </div>
             <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">No Active Schedules</h3>
             <p className="text-slate-400 font-medium mt-2 max-w-sm mx-auto">The training registry is empty. Deploy your first training batch using the button above.</p>
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