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
  FileText, 
  ArrowUpRight,
  ChevronRight,
  Calendar
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
      // Fetch Payments with Student Info
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

      // Fetch Students for the selection dropdown
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
      
      // Auto-open receipt for the new payment
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
          <p className="text-slate-500 font-medium">Record transactions, manage dues and generate official academy receipts.</p>
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

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <DollarSign size={80} />
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]">Monthly Collection</p>
            <h3 className="text-4xl font-black tracking-tighter">$24,840</h3>
            <div className="flex items-center gap-2 pt-4">
              <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-full">+12% from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Outstanding</p>
          <h3 className="text-4xl font-black tracking-tighter text-[#0F4C81]">$4,120</h3>
          <div className="flex items-center gap-2 pt-4">
            <span className="text-[10px] font-bold text-red-500 uppercase">18 Students Overdue</span>
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Pending Admission Fees</p>
          <h3 className="text-4xl font-black tracking-tighter text-[#0F4C81]">$1,200</h3>
          <div className="flex items-center gap-2 pt-4">
            <span className="text-[10px] font-bold text-amber-500 uppercase">8 New Enquiries</span>
          </div>
        </Card>
      </div>

      {/* Search & Table */}
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
                    <p className="font-black uppercase text-[10px] tracking-widest text-slate-300">Synchronizing Ledgers...</p>
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <TableRow key={p.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors">
                    <TableCell className="pl-8 py-6">
                      <span className="font-black text-[#0F4C81]">#{p.receipt_no}</span>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{format(new Date(p.created_at), 'dd MMM')}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{p.students?.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">ID: #{p.students?.student_id_serial}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          p.payment_type === 'Monthly' ? "bg-blue-400" :
                          p.payment_type === 'Admission' ? "bg-green-400" : "bg-amber-400"
                        )} />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{p.payment_type}</span>
                      </div>
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
                        <FileText size={18} className="group-hover:scale-110 transition-transform" />
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

      {/* Modals */}
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