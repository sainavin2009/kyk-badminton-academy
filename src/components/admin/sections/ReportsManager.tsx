"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { 
  FileBarChart, 
  Download, 
  Calendar, 
  RefreshCw, 
  FileText,
  Table as TableIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ReportSummaryCards from './reports/ReportSummaryCards';
import FinancialCharts from './reports/FinancialCharts';
import { exportToCSV, exportToPDF } from '@/utils/reportExport';

const ReportsManager = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  const [reportData, setReportData] = useState({
    income: [] as any[],
    sales: [] as any[],
    summary: {
      totalIncome: 0,
      totalExpenses: 4500, // Static mock for now
      totalStudents: 0,
      lowStock: 0,
      pendingFees: 0,
      netProfit: 0
    }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feeRes, saleRes, studentRes, invRes] = await Promise.all([
        supabase.from('fee_payments').select('*, students(name)').gte('created_at', dateRange.start).lte('created_at', dateRange.end),
        supabase.from('sales').select('*, students(name)').gte('created_at', dateRange.start).lte('created_at', dateRange.end),
        supabase.from('students').select('*'),
        supabase.from('inventory').select('*')
      ]);

      const feeIncome = (feeRes.data || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
      const saleIncome = (saleRes.data || []).reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
      const totalIncome = feeIncome + saleIncome;
      
      setReportData({
        income: feeRes.data || [],
        sales: saleRes.data || [],
        summary: {
          totalIncome,
          totalExpenses: 4500,
          totalStudents: studentRes.data?.length || 0,
          lowStock: invRes.data?.filter(i => i.quantity <= i.min_stock).length || 0,
          pendingFees: studentRes.data?.filter(s => s.fee_status !== 'Paid').length || 0,
          netProfit: totalIncome - 4500
        }
      });
    } catch (err: any) {
      toast.error('Report sync failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleExportPDF = () => {
    const headers = ['Date', 'Entity', 'Type', 'Amount'];
    const rows = reportData.income.map(p => [
      format(new Date(p.created_at), 'dd MMM yyyy'),
      p.students?.name || 'N/A',
      p.payment_type,
      `$${p.amount}`
    ]);
    exportToPDF('Financial Report', headers, rows, 'Academy_Report');
  };

  const trendData = [
    { date: 'Jan', income: 4000, expenses: 2400 },
    { date: 'Feb', income: 3000, expenses: 1398 },
    { date: 'Mar', income: 2000, expenses: 2800 },
    { date: 'Apr', income: reportData.summary.totalIncome, expenses: 4500 },
  ];

  const categoryData = [
    { name: 'Fees', value: reportData.summary.totalIncome * 0.7 },
    { name: 'Sales', value: reportData.summary.totalIncome * 0.3 }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Insights</h2>
          <p className="text-slate-500 font-medium">Performance analytics and financial overview.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-2 px-4">
            <Calendar size={18} className="text-[#FFC107]" />
            <Input 
              type="date" 
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="border-none font-bold text-xs bg-transparent w-36" 
            />
            <Input 
              type="date" 
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="border-none font-bold text-xs bg-transparent w-36" 
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPDF} variant="ghost" className="rounded-2xl h-12 px-6 font-black uppercase text-[10px] text-[#0F4C81]">
              <FileText className="mr-2" size={16} /> PDF
            </Button>
            <Button onClick={() => exportToCSV(reportData.income, 'Academy_Report')} variant="ghost" className="rounded-2xl h-12 px-6 font-black uppercase text-[10px] text-[#0F4C81]">
              <TableIcon className="mr-2" size={16} /> Excel
            </Button>
            <Button onClick={fetchData} variant="ghost" className="h-12 w-12 rounded-2xl">
              <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
            </Button>
          </div>
        </div>
      </div>

      <ReportSummaryCards data={reportData.summary} />
      <FinancialCharts trendData={trendData} categoryData={categoryData} />
    </div>
  );
};

export default ReportsManager;