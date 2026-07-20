"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Search, RefreshCw, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import CollectFeeModal from './CollectFeeModal';
import ReceiptModal from './ReceiptModal';
import { formatCurrency } from '@/lib/utils';

const FeeManager = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: payData, error: payError } = await supabase
        .from('fee_payments')
        .select(`*, students (id, full_name, student_id, phone)`)
        .order('created_at', { ascending: false });

      if (payError) throw payError;
      setPayments(payData || []);

      const { data: stuData } = await supabase.from('students').select('id, full_name, student_id').order('full_name');
      setStudents(stuData || []);
    } catch (error: any) {
      toast.error('Sync failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSavePayment = async (formData: any) => {
    try {
      const { data, error } = await supabase
        .from('fee_payments')
        .insert([formData])
        .select(`*, students (id, full_name, student_id, phone)`);

      if (error) throw error;
      setPayments(prev => [data[0], ...prev]);
      toast.success('Fee collected successfully');
      setIsCollectModalOpen(false);
      setSelectedPayment(data[0]);
      setIsReceiptModalOpen(true);
    } catch (error: any) {
      toast.error('Payment failed: ' + error.message);
    }
  };

  const filteredPayments = payments.filter(p => 
    p.students?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receipt_no?.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Fee Management</h2>
          <p className="text-slate-500 font-medium">Record transactions and manage academy receipts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchData} className="h-16 w-16 rounded-2xl text-slate-400"><RefreshCw className={loading ? "animate-spin" : ""} size={20} /></Button>
          <Button onClick={() => setIsCollectModalOpen(true)} className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl group">
            <span className="mr-3 text-xl font-black group-hover:scale-110 transition-transform">₹</span> Collect Fee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]">Total Collection</p>
          <h3 className="text-4xl font-black tracking-tighter">{formatCurrency(payments.reduce((acc, p) => acc + Number(p.amount), 0))}</h3>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-14 h-16 rounded-2xl border-none bg-slate-50 font-bold" placeholder="Search receipt or athlete..." />
        </div>
        <div className="rounded-[3rem] overflow-hidden border border-slate-50">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="w-[120px] font-black uppercase text-[10px] tracking-widest text-slate-400 pl-8 h-14">Receipt</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Athlete</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Amount</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="h-64 text-center"><RefreshCw className="animate-spin mx-auto text-slate-200" size={40} /></TableCell></TableRow>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-8 py-6 font-black text-[#0F4C81]">#{p.receipt_no}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{p.students?.full_name}</span>
                        <span className="text-[10px] font-medium text-slate-400">ID: {p.students?.student_id}</span>
                      </div>
                    </TableCell>
                    <TableCell><span className="text-xs font-bold text-slate-600 uppercase">{p.payment_type}</span></TableCell>
                    <TableCell><span className="text-lg font-black text-[#0F4C81]">{formatCurrency(p.amount)}</span></TableCell>
                    <TableCell className="text-right pr-8">
                      <Button onClick={() => { setSelectedPayment(p); setIsReceiptModalOpen(true); }} variant="ghost" className="h-12 w-12 rounded-xl hover:bg-[#FFC107]/10"><FileText size={18} /></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="h-64 text-center text-slate-300 uppercase text-[10px] font-black">No records found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CollectFeeModal isOpen={isCollectModalOpen} onClose={() => setIsCollectModalOpen(false)} onSave={handleSavePayment} students={students} />
      <ReceiptModal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} payment={selectedPayment} />
    </div>
  );
};

export default FeeManager;