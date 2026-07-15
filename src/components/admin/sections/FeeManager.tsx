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
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  FileText 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import CollectFeeModal from './CollectFeeModal';
import ReceiptModal from './ReceiptModal';
import { cn } from '@/lib/utils';

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
        .select(`
          *,
          students (
            id,
            name,
            student_id_serial,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (payError) throw payError;
      setPayments(payData || []);

      const { data: stuData, error: stuError } = await supabase
        .from('students')
        .select('id, name, student_id_serial')
        .order('name');

      if (stuError) throw stuError;
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
        .select(`
          *,
          students (
            id,
            name,
            student_id_serial,
            phone
          )
        `);

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
    p.students?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receipt_no.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Fee Management</h2>
          <p className="text-slate-500 font-medium">Record transactions and manage academy receipts.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={fetchData}
            className="h-16 w-16 rounded-2xl text-slate-400 hover:text-[#0F4C81] hover:bg-white shadow-sm"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => setIsCollectModalOpen(true)}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group"
          >
            <DollarSign className="mr-3 group-hover:scale-110 transition-transform" />
            Collect Fee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]">Monthly Collection</p>
          <h3 className="text-4xl font-black tracking-tighter">$24,840</h3>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Outstanding</p>
          <h3 className="text-4xl font-black tracking-tighter text-[#0F4C81]">$4,120</h3>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Pending Dues</p>
          <h3 className="text-4xl font-black tracking-tighter text-[#0F4C81]">18</h3>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2.5rem] shadow-sm">
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={18} />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 h-16 rounded-2xl border-none bg-slate-50 font-bold focus-visible:ring-2 focus-visible:ring-[#FFC107] transition-all text-sm" 
              placeholder="Search receipt no or student..." 
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-16 px-6 rounded-2xl border-none bg-slate-50 font-black uppercase tracking-widest text-[10px] text-slate-500">
              <Filter className="mr-2" size={16} /> Filter
            </Button>
            <Button variant="outline" className="h-16 px-6 rounded-2xl border-none bg-slate-50 font-black uppercase tracking-widest text-[10px] text-slate-500">
              <Download className="mr-2" size={16} /> Export
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-slate-50">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[120px] font-black uppercase text-[10px] tracking-widest text-slate-400 pl-8 h-14">Receipt</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Athlete</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Payment Type</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Method</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Amount</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 text-right pr-8">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <RefreshCw className="animate-spin mx-auto text-slate-200 mb-4" size={40} />
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <TableRow key={p.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors">
                    <TableCell className="pl-8 py-6">
                      <span className="font-black text-[#0F4C81]">#{p.receipt_no}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{p.students?.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">ID: #{p.students?.student_id_serial}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{p.payment_type}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md text-slate-500">
                        {p.payment_method}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg font-black text-[#0F4C81]">${p.amount}</span>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button 
                        onClick={() => { setSelectedPayment(p); setIsReceiptModalOpen(true); }}
                        variant="ghost" 
                        className="rounded-xl h-12 w-12 hover:bg-[#FFC107]/10 hover:text-[#0F4C81] transition-all group"
                      >
                        <FileText size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <p className="font-black uppercase text-[10px] tracking-widest text-slate-300">No payment records found.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CollectFeeModal 
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        onSave={handleSavePayment}
        students={students}
      />

      <ReceiptModal 
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};

export default FeeManager;