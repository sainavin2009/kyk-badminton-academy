"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  DollarSign, 
  Plus, 
  RefreshCw, 
  Search, 
  Trash2, 
  Edit3, 
  TrendingDown, 
  CreditCard, 
  Wrench, 
  Award,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { AcademyExpense } from '@/types/expense';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import ExpenseForm from './ExpenseForm';
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

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState<AcademyExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExpense, setSelectedEvent] = useState<AcademyExpense | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      toast.error('Failed to load expenses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (selectedExpense) {
        const { data, error } = await supabase
          .from('expenses')
          .update(formData)
          .eq('id', selectedExpense.id)
          .select();
        
        if (error) throw error;
        setExpenses(prev => prev.map(e => e.id === selectedExpense.id ? data[0] : e));
        toast.success('Expense record updated');
      } else {
        const { data, error } = await supabase
          .from('expenses')
          .insert([formData])
          .select();
        
        if (error) throw error;
        setExpenses(prev => [data[0], ...prev]);
        toast.success('Expense recorded successfully');
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error('Operation failed: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;
      setExpenses(prev => prev.filter(e => e.id !== id));
      toast.success('Expense record deleted');
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterCategory === 'All' || e.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const totalExpenseVal = filteredExpenses.reduce((acc, e) => acc + Number(e.amount), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Expense Management</h2>
          <p className="text-slate-500 font-medium">Record and track operational costs of the academy.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchExpenses} className="h-16 w-16 rounded-2xl text-slate-400">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedEvent(null); setIsFormOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20"
          >
            <Plus className="mr-3" /> Record Expense
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FFC107] flex items-center justify-center">
            <TrendingDown size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]">Total Expenses</p>
            <h3 className="text-3xl font-black">${totalExpenseVal.toLocaleString()}</h3>
          </div>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-14 h-16 rounded-2xl border-none bg-slate-50 font-bold focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
              placeholder="Search expenses..." 
            />
          </div>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold text-slate-500"
          >
            <option value="All">All Categories</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Salaries">Salaries</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Equipment">Equipment</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="rounded-[2.5rem] overflow-hidden border border-slate-50">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="pl-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Expense Title</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Category</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Transaction Date</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Amount</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="h-64 text-center text-slate-300">Loading...</TableCell></TableRow>
              ) : filteredExpenses.length > 0 ? (
                filteredExpenses.map((e) => (
                  <TableRow key={e.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{e.title}</span>
                        {e.notes && <span className="text-[10px] font-medium text-slate-400 line-clamp-1">{e.notes}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-50 text-red-600 rounded-lg px-2 py-1 shadow-none border-none uppercase text-[9px] font-black tracking-widest">
                        {e.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-slate-500">{format(new Date(e.date), 'MMM dd, yyyy')}</span>
                    </TableCell>
                    <TableCell className="text-lg font-black text-red-500">${e.amount}</TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => { setSelectedEvent(e); setIsFormOpen(true); }}
                          variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-[#0F4C81]/10 text-[#0F4C81]"
                        >
                          <Edit3 size={16} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl text-red-500 hover:bg-red-50"><Trash2 size={16} /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[2.5rem]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-black text-[#0F4C81] uppercase">Delete record?</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-500 font-medium">Are you sure you want to delete this expense record?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(e.id)} className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="h-64 text-center text-slate-300 uppercase text-[10px] font-black tracking-widest">No expense records.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ExpenseForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        expense={selectedExpense}
      />
    </div>
  );
};

export default ExpenseManager;