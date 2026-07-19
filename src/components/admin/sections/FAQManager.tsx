"use client";

import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { 
  HelpCircle, 
  Plus, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  Loader2,
  GripVertical,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { toast } from 'sonner';
import { FAQ } from '@/types/faq';
import FAQFormModal from './FAQFormModal';
import { cn } from '@/lib/utils';

const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err: any) {
      toast.error('Failed to sync FAQs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (formData.id) {
        const { data, error } = await supabase
          .from('faqs')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', formData.id)
          .select();
        
        if (error) throw error;
        setFaqs(prev => prev.map(f => f.id === formData.id ? data[0] : f));
        toast.success('FAQ updated');
      } else {
        const { data, error } = await supabase
          .from('faqs')
          .insert([{ ...formData, display_order: faqs.length }])
          .select();
        
        if (error) throw error;
        setFaqs(prev => [...prev, data[0]]);
        toast.success('New FAQ added to registry');
      }
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw error;
      setFaqs(prev => prev.filter(f => f.id !== id));
      toast.success('FAQ removed');
    } catch (err: any) {
      toast.error('Purge failed: ' + err.message);
    }
  };

  const handleToggleStatus = async (faq: FAQ) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !faq.is_active })
        .eq('id', faq.id);
      
      if (error) throw error;
      setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, is_active: !f.is_active } : f));
      toast.success(`FAQ visibility updated`);
    } catch (err: any) {
      toast.error('Status update failed');
    }
  };

  const handleReorder = async (newOrder: FAQ[]) => {
    setFaqs(newOrder);
    setIsSyncing(true);
    
    try {
      const updates = newOrder.map((faq, index) => ({
        id: faq.id,
        display_order: index,
        question: faq.question,
        answer: faq.answer,
        is_active: faq.is_active
      }));

      const { error } = await supabase.from('faqs').upsert(updates);
      if (error) throw error;
      
      setTimeout(() => setIsSyncing(false), 1000);
    } catch (err) {
      console.error("Reorder failed:", err);
      setIsSyncing(false);
    }
  };

  const filtered = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">FAQ Registry</h2>
            {isSyncing && (
              <Badge className="bg-green-50 text-green-600 border-none animate-pulse">
                <CheckCircle2 size={10} className="mr-1" /> Syncing Order
              </Badge>
            )}
          </div>
          <p className="text-slate-500 font-medium">Manage the knowledge base and common athlete inquiries.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchFAQs} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedFAQ(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl group transition-all"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Add New FAQ
          </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder="Search by keywords or questions..." 
        />
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-200">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Loading Help Center...</p>
        </div>
      ) : faqs.length > 0 ? (
        <Reorder.Group axis="y" values={faqs} onReorder={handleReorder} className="space-y-4">
          {filtered.map((faq) => (
            <Reorder.Item key={faq.id} value={faq}>
              <Card className={cn(
                "p-6 rounded-[2rem] border-none bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-6",
                !faq.is_active && "opacity-60"
              )}>
                <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#0F4C81] transition-colors">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-grow space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-[#0F4C81] text-lg leading-tight">{faq.question}</h4>
                    {!faq.is_active && <Badge variant="outline" className="text-[8px] font-black uppercase border-slate-200">Draft</Badge>}
                  </div>
                  <p className="text-sm text-slate-400 font-medium line-clamp-1 italic">"{faq.answer}"</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleToggleStatus(faq)}
                    className={cn(
                      "h-10 w-10 rounded-xl",
                      faq.is_active ? "text-green-500 hover:bg-green-50" : "text-slate-300"
                    )}
                  >
                    {faq.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => { setSelectedFAQ(faq); setIsModalOpen(true); }}
                    className="h-10 w-10 rounded-xl text-blue-500 hover:bg-blue-50"
                  >
                    <Edit3 size={18} />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 rounded-xl text-red-500 hover:bg-red-50">
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2.5rem]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black uppercase text-[#0F4C81]">Purge FAQ?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">Delete this question? This action will immediately remove it from the public site.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(faq.id)} className="rounded-2xl h-14 font-black bg-red-500 hover:bg-red-600 text-white border-none">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <HelpCircle className="mx-auto text-slate-200 mb-4" size={48} />
          <h3 className="text-2xl font-black text-[#0F4C81] uppercase">No FAQs Registered</h3>
          <p className="text-slate-400 font-medium mt-2">Start building your knowledge base to help your athletes.</p>
        </div>
      )}

      <FAQFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        faq={selectedFAQ}
      />
    </div>
  );
};

export default FAQManager;