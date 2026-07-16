"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  Clock,
  Plus,
  UserPlus,
  DollarSign,
  Briefcase,
  ShieldCheck,
  FileClock,
  Loader2
} from 'lucide-react';
import DashboardCard from '../DashboardCard';
import { IncomeExpenseChart, SalesBarChart } from '../charts/DashboardCharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfDay, endOfDay } from 'date-fns';

const DashboardOverview = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    pendingFees: 0,
    todayCollection: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    inventoryValue: 0,
    salesToday: 0
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const today = startOfDay(new Date()).toISOString();
      const now = endOfDay(new Date()).toISOString();

      const [
        studentsRes, 
        feesRes, 
        salesRes, 
        expensesRes, 
        inventoryRes,
        logsRes
      ] = await Promise.all([
        supabase.from('students').select('id, fee_status'),
        supabase.from('fee_payments').select('amount, created_at, students(full_name, student_id)'),
        supabase.from('sales').select('total_amount, created_at, students(full_name)'),
        supabase.from('expenses').select('amount, date'),
        supabase.from('inventory').select('purchase_price, quantity'),
        supabase.from('admin_activity_logs').select('action, created_at').order('created_at', { ascending: false }).limit(4)
      ]);

      const students = studentsRes.data || [];
      const fees = feesRes.data || [];
      const sales = salesRes.data || [];
      const expenses = expensesRes.data || [];
      const inventory = inventoryRes.data || [];

      // Aggregations
      const totalStudents = students.length;
      const activeStudents = students.filter(s => s.fee_status === 'Paid').length;
      
      const todayFees = fees
        .filter(f => f.created_at >= today && f.created_at <= now)
        .reduce((sum, f) => sum + Number(f.amount), 0);
      
      const todaySales = sales
        .filter(s => s.created_at >= today && s.created_at <= now)
        .reduce((sum, s) => sum + Number(s.total_amount), 0);

      // Fix for Error 1 & 2: Use any casting for the union type reduction
      const monthlyIncome = [...fees, ...sales].reduce((sum, item: any) => sum + Number(item.amount || item.total_amount || 0), 0);
      const monthlyExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
      const inventoryValue = inventory.reduce((sum, i) => sum + (Number(i.purchase_price) * Number(i.quantity)), 0);

      setStats({
        totalStudents,
        activeStudents,
        pendingFees: students.filter(s => s.fee_status !== 'Paid').length,
        todayCollection: todayFees + todaySales,
        monthlyIncome,
        monthlyExpenses,
        inventoryValue,
        salesToday: sales.filter(s => s.created_at >= today && s.created_at <= now).length
      });

      // Fix for Error 3: Cast students to any to access name property safely
      setRecentPayments(fees.slice(0, 3).map(f => ({
        name: (f.students as any)?.full_name || 'System',
        amount: `$${f.amount}`,
        date: format(new Date(f.created_at), 'p'),
        method: 'Payment'
      })));

      setRecentLogs(logsRes.data || []);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-black uppercase text-[10px] tracking-widest">Aggregating Global Metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Overview</h2>
          <p className="text-slate-500 font-medium">Snapshot of your business performance today.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={fetchDashboardData} variant="ghost" className="h-14 w-14 rounded-2xl bg-white shadow-sm text-[#0F4C81]">
            <Clock size={20} />
          </Button>
          <Button className="h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-bold transition-all px-8">
            <Plus className="mr-2" size={18} /> Add Payment
          </Button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          label="Total Students" 
          value={stats.totalStudents} 
          icon={Users} 
          trend="Live" 
        />
        <DashboardCard 
          label="Active Accounts" 
          value={stats.activeStudents} 
          icon={UserPlus} 
          trendType="up" 
        />
        <DashboardCard 
          label="Unpaid Dues" 
          value={stats.pendingFees} 
          icon={AlertTriangle} 
          color="bg-amber-50 text-amber-600"
        />
        <DashboardCard 
          label="Today's Collection" 
          value={`$${stats.todayCollection.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          label="Monthly Income" 
          value={`$${stats.monthlyIncome.toLocaleString()}`} 
          icon={TrendingUp} 
        />
        <DashboardCard 
          label="Total Expenses" 
          value={`$${stats.monthlyExpenses.toLocaleString()}`} 
          icon={Briefcase} 
          color="bg-red-50 text-red-600"
        />
        <DashboardCard 
          label="Inventory Value" 
          value={`$${stats.inventoryValue.toLocaleString()}`} 
          icon={Package} 
        />
        {profile?.role === 'Super Admin' ? (
           <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-[#0F4C81] text-white flex items-center gap-4 group">
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-all">
                <ShieldCheck size={20} className="text-[#FFC107] group-hover:text-inherit" />
              </div>
              <div>
                 <p className="text-[8px] font-black uppercase text-[#FFC107] tracking-widest">Security Status</p>
                 <p className="text-sm font-black uppercase">Infrastructure Secure</p>
              </div>
           </Card>
        ) : (
          <DashboardCard 
            label="Sales Transactions" 
            value={stats.salesToday} 
            icon={ShoppingCart} 
          />
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IncomeExpenseChart />
        <SalesBarChart />
      </div>

      {/* Audit & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Recent Activity</h3>
            <Button variant="link" className="text-[10px] font-black uppercase text-[#FFC107]">View Ledger</Button>
          </div>
          <div className="space-y-4">
            {recentPayments.map((payment, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F4C81]">{payment.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#0F4C81]">{payment.amount}</p>
                  <p className="text-[10px] font-bold text-slate-400">{payment.date}</p>
                </div>
              </div>
            ))}
            {recentPayments.length === 0 && <p className="text-center py-8 text-[10px] font-bold text-slate-300 uppercase italic">No transactions found today.</p>}
          </div>
        </Card>

        {profile?.role === 'Super Admin' && (
           <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Security Audit</h3>
                 <FileClock size={16} className="text-slate-300" />
              </div>
              <div className="space-y-4">
                 {recentLogs.map((log, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 flex justify-between items-center border border-slate-100/50">
                       <div>
                          <p className="text-xs font-black text-[#0F4C81] uppercase">{log.action.replace(/_/g, ' ')}</p>
                          <p className="text-[9px] font-bold text-slate-400">{format(new Date(log.created_at), 'PPP p')}</p>
                       </div>
                       <ShieldCheck size={14} className="text-green-500" />
                    </div>
                 ))}
                 {recentLogs.length === 0 && <p className="text-center py-8 text-[10px] font-bold text-slate-300 uppercase">System silent.</p>}
              </div>
           </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;