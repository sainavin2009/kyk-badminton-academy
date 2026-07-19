"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  Plus, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Calendar,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BatchTiming } from '@/types/batch';
import BatchForm from './BatchForm';
import { cn } from '@/lib/utils';

const BatchTimingsManager = () => {
  const [batches, setBatches] = useState<BatchTiming[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

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
      console.error("[BatchTimings] Fetch Error:", err);
      toast.error('Unable to sync batches. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleCreate = async (formData: any) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('batch_timings')
        .insert([formData]);

      if (error) throw error;
      
      toast.success('New training batch added');
      setIsAdding(false);
      await fetchBatches();
    } catch (err: any) {
      console.error("[BatchTimings] Create Error:", err);
      toast.error('Unable to save batch. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: any) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('batch_timings')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Batch details updated');
      setEditingId(null);
      await fetchBatches();
    } catch (err: any) {
      console.error("[BatchTimings] Update Error:", err);
      toast.error('Unable to update batch. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('batch_timings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Batch removed from schedule');
      setDeletingId(null);
      await fetchBatches();
    } catch (err: any) {
      console.error("[BatchTimings] Delete Error:", err);
      toast.error('Unable to delete batch. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">Batch Schedules</h2>
          <p className="text-slate-500 font-medium">Manage training hours and age groups entirely inline.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={fetchBatches} 
            className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          {!isAdding && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all"
            >
              <Plus className="mr-2" />
              Add Batch
            </Button>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107] mb-4 ml-4">New Batch Entry</h3>
          <BatchForm 
            onSave={handleCreate} 
            onCancel={() => setIsAdding(false)} 
            isLoading={actionLoading}
          />
        </div>
      )}

      <div className="space-y-6">
        {loading && batches.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-black uppercase text-[10px] tracking-widest">Accessing Schedule Registry...</p>
          </div>
        ) : batches.length > 0 ? batches.map((batch) => (
          <div key={batch.id} className="relative">
            {editingId === batch.id ? (
              <div className="mb-4">
                <BatchForm 
                  initialData={batch}
                  onSave={(data) => handleUpdate(batch.id, data)}
                  onCancel={() => setEditingId(null)}
                  isLoading={actionLoading}
                />
              </div>
            ) : (
              <Card className="p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="w-20 h-20 rounded-[1.8rem] bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#FFC107] text-[#0F4C81] transition-colors">
                    <Clock size={32} strokeWidth={1.5} />
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter leading-none">{batch.title}</h3>
                      <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 px-3 py-1">{batch.age_group}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start gap-3">
                        <Calendar size={18} className="text-[#FFC107] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Weekly Cycle</p>
                          <p className="text-sm font-bold text-[#0F4C81]">{batch.days}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-[#FFC107] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Assigned Hours</p>
                          <p className="text-sm font-bold text-slate-600 whitespace-pre-line leading-relaxed italic">"{batch.timing}"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 self-center lg:self-start pt-4 lg:pt-0 lg:pl-10 lg:border-l lg:border-slate-50">
                    <Button 
                      variant="ghost" 
                      onClick={() => setEditingId(batch.id)}
                      className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Edit3 size={20} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setDeletingId(batch.id)}
                      className="h-12 w-12 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>

                {deletingId === batch.id && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center p-8 animate-in fade-in duration-200">
                    <div className="text-center space-y-6 max-w-sm">
                      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
                        <AlertCircle size={32} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-[#0F4C81] uppercase">Delete this batch?</h4>
                        <p className="text-sm font-medium text-slate-500">This will permanently remove the "{batch.title}" schedule from the website.</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="ghost" onClick={() => setDeletingId(null)} className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                        <Button 
                          onClick={() => handleDelete(batch.id)} 
                          disabled={actionLoading}
                          className="flex-1 h-12 rounded-xl bg-red-500 text-white hover:bg-red-600 font-black uppercase tracking-widest"
                        >
                          {actionLoading ? <Loader2 className="animate-spin" /> : 'Confirm Purge'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        )) : (
          <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
             <Clock className="mx-auto mb-6 text-slate-200" size={64} />
             <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No training schedules found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchTimingsManager;