"use client";

import React, { useState, useEffect } from 'react';
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
  ChevronUp,
  ChevronDown,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
          .insert([formData])
          .select();
        
        if (error) throw error;
        setFaqs(prev => [...prev, data[0]].sort((a, b) => a.display_order - b.display_order));
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

  const filtered = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">FAQ Registry</h2>
          <p className="text-slate-500 font-medium">Manage the knowledge base and common athlete inquiries.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchFAQs} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedFAQ(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group transition-all"
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
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="w-[80px] font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Order</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Inquiry & Knowledge</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((faq) => (
                <TableRow key={faq.id} className="group hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 py-6">
                    <div className="flex items-center gap-2">
                       <GripVertical size={14} className="text-slate-300" />
                       <span className="font-black text-[#0F4C81]">{faq.display_order}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 max-w-2xl">
                      <p className="font-bold text-[#0F4C81] text-base leading-tight">{faq.question}</p>
                      <p className="text-xs text-slate-400 font-medium line-clamp-1 italic">"{faq.answer}"</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => handleToggleStatus(faq)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                        faq.is_active ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {faq.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest">{faq.is_active ? 'Live' : 'Draft'}</span>
                    </button>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => { setSelectedFAQ(faq); setIsModalOpen(true); }}
                        className="h-10 w-10 rounded-xl hover:bg-[#0F4C81]/10 text-[#0F4C81]"
                      >
                        <Edit3 size={16} />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-red-50 text-red-500">
                            <Trash2 size={16} />
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
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                   <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-300">
                         <HelpCircle size={48} strokeWidth={1} />
                         <p className="text-[10px] font-black uppercase tracking-widest">Knowledge base is empty.</p>
                      </div>
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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