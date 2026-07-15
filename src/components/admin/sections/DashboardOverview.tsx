"use client";

import React from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  Clock,
  Plus,
  UserPlus,
  DollarSign,
  Briefcase
} from 'lucide-react';
import DashboardCard from '../DashboardCard';
import { IncomeExpenseChart, SalesBarChart } from '../charts/DashboardCharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardOverview = () => {
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
        <DashboardCard 
          label="Sold Today" 
          value="14 Units" 
          icon={ShoppingCart} 
          trend="+8%" 
          trendType="up" 
        />
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

        {/* Latest Registrations */}
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

        {/* Low Stock Products */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Low Stock Products</h3>
            <Button variant="link" className="text-[10px] font-black uppercase text-[#FFC107]">Inventory</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Yonex Shuttlecocks (Pro)', stock: '2 tubes left', level: 10 },
              { name: 'Academy T-Shirt (Large)', stock: '5 units left', level: 25 },
              { name: 'Grip Tape (Neon Green)', stock: 'Out of stock', level: 0 }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-[#0F4C81]">{item.name}</p>
                  <p className="text-[10px] font-black text-red-500 uppercase">{item.stock}</p>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.level === 0 ? 'bg-red-500' : 'bg-[#FFC107]'}`} 
                    style={{ width: `${item.level}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Fee Due Dates */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Upcoming Fee Due</h3>
            <Button variant="link" className="text-[10px] font-black uppercase text-[#FFC107]">Follow Up</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Marcus Aurelius', due: 'Tomorrow', amount: '$150' },
              { name: 'Seneca Young', due: 'In 3 days', amount: '$150' },
              { name: 'Zeno Smith', due: 'In 5 days', amount: '$300' }
            ].map((fee, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0F4C81] flex items-center justify-center font-bold text-xs border border-slate-100">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F4C81]">{fee.name}</p>
                    <p className="text-[10px] font-bold text-red-400 uppercase">Due {fee.due}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-[#0F4C81]">{fee.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;