"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { 
  FileBarChart, 
  Download, 
  Calendar, 
  RefreshCw, 
  Filter,
  FileText,
  Table as TableIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ReportSummaryCards from './reports/ReportSummaryCards';
import FinancialCharts from './reports/FinancialCharts';
import { exportToCSV, exportToPDF } from '../../../utils/reportExport';

const ReportsManager = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-max-dd')
  });

  // Report Data
  const [reportData, setReportData] = useState({
    income: [] as any[],
    expenses: [] as any[],
    students: [] as any[],
    sales: [] as any[],
    inventory: [] as any[],
    summary: {
      totalIncome: 0,
      totalExpenses: 0,
      totalStudents: 0,
      lowStock: 0,
      pendingFees: 0,
      netProfit: 0
    }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const startDate = dateRange.start;
      const endDate = dateRange.end;

      const [feeRes, saleRes, studentRes, invRes] = await Promise.all([
        supabase.from('fee_payments').select('*, students(name)').gte('created_at', startDate).lte('created_at', endDate),
        supabase.from('sales').select('*, students(name)').gte('created_at', startDate).lte('created_at', endDate),
        supabase.from('students').select('*'),
        supabase.from('inventory').select('*')
      ]);

      const incomeData = [...(feeRes.data || []), ...(saleRes.data || [])];
      const totalIncome = incomeData.reduce((acc, curr) => acc + Number(curr.amount || curr.total_amount || 0), 0);
      const pendingFees = studentRes.data?.filter(s => s.fee_status !== 'Paid').length || 0;
      const lowStock = invRes.data?.filter(i => i.quantity <= i.min_stock).length || 0;

      const totalExpenses = 4500; 

      setReportData({
        income: feeRes.data || [],
        expenses: [],
        students: studentRes.data || [],
        sales: saleRes.data || [],
        inventory: invRes.data || [],
        summary: {
          totalIncome,
          totalExpenses,
          totalStudents: studentRes.data?.length || 0,
          lowStock,
          pendingFees,
          netProfit: totalIncome - totalExpenses
        }
      });

    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleExportPDF = () => {
    const headers = ['Date', 'Student', 'Type', 'Amount'];
    const rows = reportData.income.map(p => [
      format(new Date(p.created_at), 'dd MMM yyyy'),
      p.students?.name || 'N/A',
      p.payment_type || 'Sale',
      `$${p.amount || p.total_amount}`
    ]);
    exportToPDF('Income Report', headers, rows, 'Academy_Income_Report');
    toast.success('PDF Export Initialized');
  };

  const handleExportExcel = () => {
    exportToCSV(reportData.income, 'Academy_Income_Report');
    toast.success('CSV Export Initialized');
  };

  const trendData = [
    { date: 'Jan', income: 4000, expenses: 2400 },
    { date: 'Feb', income: 3000, expenses: 1398 },
    { date: 'Mar', income: 2000, expenses: 2800 },
    { date: 'Apr', income: reportData.summary.totalIncome, expenses: reportData.summary.totalExpenses },
  ];

  const categoryData = [
    { name: 'Monthly Fees', value: reportData.income.filter(i => i.payment_type === 'Monthly').length },
    { name: 'Sales', value: reportData.sales.length },
    { name: 'Admissions', value: reportData.income.filter(i => i.payment_type === 'Admission').length },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Insights</h2>
          <p className="text-slate-500 font-medium">Data-driven analysis of your training center performance.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-[2.5rem] shadow-sm border border-slate-50">
          <div className="flex items-center gap-2 px-4 border-r border-slate-100">
            <Calendar size={18} className="text-[#FFC107]" />
            <Input 
              type="date" 
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="border-none font-bold text-xs bg-transparent w-36 h-10" 
            />
            <span className="text-slate-300 font-black">TO</span>
            <Input 
              type="date" 
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="border-none font-bold text-xs bg-transparent w-36 h-10" 
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPDF} variant="ghost" className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-[10px] text-[#0F4C81] hover:bg-blue-50">
              <FileText className="mr-2" size={16} /> PDF
            </Button>
            <Button onClick={handleExportExcel} variant="ghost" className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-[10px] text-[#0F4C81] hover:bg-blue-50">
              <TableIcon className="mr-2" size={16} /> Excel
            </Button>
            <Button onClick={fetchData} variant="ghost" className="h-12 w-12 rounded-2xl text-[#FFC107] hover:bg-amber-50">
              <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
            </Button>
          </div>
        </div>
      </div>

      <ReportSummaryCards data={reportData.summary} />

      <FinancialCharts trendData={trendData} categoryData={categoryData} />

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Recent Financial Activity</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Stream</span>
          </div>
          <div className="space-y-4">
            {reportData.income.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-3xl border border-slate-50 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F4C81]/5 text-[#0F4C81] flex items-center justify-center group-hover:bg-[#FFC107] transition-colors">
                    <FileBarChart size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F4C81]">{item.students?.name || 'Academy Store'}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.payment_type || 'Sale'} • {format(new Date(item.created_at), 'PPP')}</p>
                  </div>
                </div>
                <span className="text-lg font-black text-[#0F4C81]">+${item.amount || item.total_amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManager;