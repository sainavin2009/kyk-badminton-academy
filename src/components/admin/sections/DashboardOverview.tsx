"use client";

import React from 'react';
import { 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const stats = [
  { label: 'Total Athletes', value: '542', icon: Users, change: '+12%', trend: 'up' },
  { label: 'Gallery Items', value: '1,280', icon: ImageIcon, change: '+5%', trend: 'up' },
  { label: 'Training Hours', value: '3,420', icon: Calendar, change: '-2%', trend: 'down' },
  { label: 'Revenue Growth', value: '24%', icon: TrendingUp, change: '+18%', trend: 'up' },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Academy Insights</h2>
        <p className="text-slate-500 font-medium">Real-time overview of your academy's performance and data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-8 rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-[#0F4C81]/5 text-[#0F4C81] rounded-2xl group-hover:bg-[#FFC107] transition-colors">
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full",
                stat.trend === 'up' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-[#0F4C81] tracking-tight">{stat.value}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 rounded-[3rem] border-none shadow-sm h-[400px] flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-6 bg-slate-50 rounded-full">
            <TrendingUp size={48} className="text-[#0F4C81] opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-[#0F4C81]">Visitor Activity Chart</h3>
          <p className="text-slate-400 text-sm max-w-xs">Detailed analytics visualization will be integrated here with your live data.</p>
        </Card>
        <Card className="p-8 rounded-[3rem] border-none shadow-sm h-[400px] flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-6 bg-slate-50 rounded-full">
            <Calendar size={48} className="text-[#0F4C81] opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-[#0F4C81]">Recent Registrations</h3>
          <p className="text-slate-400 text-sm max-w-xs">List of new academy members and their status will appear in this section.</p>
        </Card>
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils';
export default DashboardOverview;