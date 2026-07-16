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
  FileClock
} from 'lucide-react';
import DashboardCard from '../DashboardCard';
import { IncomeExpenseChart, SalesBarChart } from '../charts/DashboardCharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const DashboardOverview = () => {
  const { profile } = useAuth();
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.role === 'Super Admin') {
      const fetchLogs = async () => {
        const { data } = await supabase
          .from('admin_logs')
          .select('action, created_at')
          .order('created_at', { ascending: false })
          .limit(3);
        setRecentLogs(data || []);
      };
      fetchLogs();
    }
  }, [profile]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with quick actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Overview</h2>
          <p className="text-slate-500 font-medium">Snapshot of your business performance today.</p>
        </div>
        <div className="flex gap-3">
          <Button className="h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-bold transition-all px-6">
            <Plus className="mr-2" size={18} /> Add Payment
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl border-2 border-slate-100 font-bold px-6 hover:bg-slate-50 transition-all">
            <UserPlus className="mr-2" size={18} /> New Student
          </Button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          label="Total Students" 
          value="542" 
          icon={Users} 
          trend="+12%" 
          trendType="up" 
        />
        <DashboardCard 
          label="Active Students" 
          value="486" 
          icon={UserPlus} 
          trend="+5%" 
          trendType="up" 
        />
        <DashboardCard 
          label="Pending Fees" 
          value="$12,450" 
          icon={AlertTriangle} 
          trend="-2%" 
          trendType="down"
          color="bg-amber-50 text-amber-600"
        />
        <DashboardCard 
          label="Today's Collection" 
          value="$2,840" 
          icon={DollarSign} 
          trend="+24%" 
          trendType="up"
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          label="Monthly Income" 
          value="$45,200" 
          icon={TrendingUp} 
          trend="+18%" 
          trendType="up" 
        />
        <DashboardCard 
          label="Monthly Expenses" 
          value="$18,400" 
          icon={Briefcase} 
          trend="+4%" 
          trendType="down"
        />
        <DashboardCard 
          label="Inventory Value" 
          value="$8,920" 
          icon={Package} 
          trend="Stable" 
        />
        {profile?.role === 'Super Admin' ? (
           <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-[#0F4C81] text-white flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl"><ShieldCheck size={20} className="text-[#FFC107]" /></div>
              <div>
                 <p className="text-[8px] font-black uppercase text-[#FFC107] tracking-widest">Security Status</p>
                 <p className="text-sm font-black uppercase">Infrastructure Secure</p>
              </div>
           </Card>
        ) : (
          <DashboardCard 
            label="Sold Today" 
            value="14 Units" 
            icon={ShoppingCart} 
            trend="+8%" 
            trendType="up" 
          />
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IncomeExpenseChart />
        <SalesBarChart />
      </div>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Payments */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Recent Payments</h3>
            <Button variant="link" className="text-[10px] font-black uppercase text-[#FFC107]">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Alex Johnson', amount: '$150', date: '2 mins ago', method: 'UPI' },
              { name: 'Sarah Miller', amount: '$200', date: '15 mins ago', method: 'Cash' },
              { name: 'David Chen', amount: '$150', date: '1 hour ago', method: 'Card' }
            ].map((payment, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
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
          </div>
        </Card>

        {profile?.role === 'Super Admin' ? (
           <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Security Audit</h3>
                 <FileClock size={16} className="text-slate-300" />
              </div>
              <div className="space-y-4">
                 {recentLogs.map((log, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 flex justify-between items-center">
                       <div>
                          <p className="text-xs font-black text-[#0F4C81] uppercase">{log.action.replace('_', ' ')}</p>
                          <p className="text-[9px] font-bold text-slate-400">{format(new Date(log.created_at), 'PPP p')}</p>
                       </div>
                       <ShieldCheck size={14} className="text-green-500" />
                    </div>
                 ))}
                 {recentLogs.length === 0 && <p className="text-center py-8 text-[10px] font-bold text-slate-300 uppercase">No recent security events.</p>}
              </div>
           </Card>
        ) : (
          <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Latest Registrations</h3>
              <Button variant="link" className="text-[10px] font-black uppercase text-[#FFC107]">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Rohan Sharma', program: 'Badminton Elite', status: 'Pending' },
                { name: 'Emma Wilson', program: 'CrossFit Adult', status: 'Active' },
                { name: 'Lucas Scott', program: 'Junior Academy', status: 'Active' }
              ].map((reg, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {reg.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F4C81]">{reg.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{reg.program}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                    reg.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;