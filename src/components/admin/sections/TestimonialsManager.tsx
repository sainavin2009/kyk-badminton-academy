"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Quote, 
  Plus, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Testimonial } from '@/types/testimonial';
import TestimonialForm from './TestimonialForm';
import { cn } from '@/lib/utils';

const TestimonialsManager = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      toast.error('Failed to sync: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (formData.id) {
        const { data, error } = await supabase
          .from('testimonials')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', formData.id)
          .select();
        
        if (error) throw error;
        setItems(prev => prev.map(i => i.id === formData.id ? data[0] : i));
        toast.success('Testimonial updated');
      } else {
        const { data, error } = await supabase
          .from('testimonials')
          .insert([formData])
          .select();
        
        if (error) throw error;
        setItems(prev => [...prev, data[0]]);
        toast.success('Voice of excellence published');
      }
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Testimonial removed');
    } catch (err: any) {
      toast.error('Purge failed: ' + err.message);
    }
  };

  const filtered = items.filter(i => 
    i.athlete_name.toLowerCase().includes(search.toLowerCase()) ||
    i.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">Testimonials</h2>
          <p className="text-slate-500 font-medium">Manage the success stories that build academy trust.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchTestimonials} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group transition-all"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Add Testimonial
          </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder="Search by name or title..." 
        />
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-200">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Accessing Hall of Fame...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Athlete</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Designation</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Message</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-xl shadow-sm border border-slate-100">
                        <AvatarImage src={item.image_url} />
                        <AvatarFallback className="bg-[#0F4C81] text-white font-bold">{item.athlete_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-[#0F4C81]">{item.athlete_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.designation}</span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-xs font-medium text-slate-500 line-clamp-1 italic">"{item.testimonial}"</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       {item.is_active ? (
                         <Badge className="bg-green-50 text-green-600 rounded-full px-3 py-1 shadow-none border-none text-[8px] font-black uppercase tracking-widest"><Eye size={10} className="mr-1" /> Public</Badge>
                       ) : (
                         <Badge className="bg-slate-100 text-slate-400 rounded-full px-3 py-1 shadow-none border-none text-[8px] font-black uppercase tracking-widest"><EyeOff size={10} className="mr-1" /> Draft</Badge>
                       )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => { setSelectedItem(item); setIsModalOpen(true); }}
                        className="h-10 w-10 rounded-xl hover:bg-blue-50 text-blue-500"
                      >
                        <Edit3 size={16} />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500">
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2.5rem]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black uppercase text-[#0F4C81]">Purge Testimonial?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 font-medium">Delete record for <span className="font-bold text-[#0F4C81]">{item.athlete_name}</span>? This action is irreversible.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)} className="rounded-2xl h-14 font-black bg-red-500 hover:bg-red-600 text-white border-none">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                   <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-300">
                         <Quote size={48} strokeWidth={1} />
                         <p className="text-[10px] font-black uppercase tracking-widest">No testimonials found.</p>
                      </div>
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <TestimonialForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        testimonial={selectedItem}
      />
    </div>
  );
};

export default TestimonialsManager;