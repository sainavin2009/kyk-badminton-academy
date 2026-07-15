"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

const DashboardCard = ({ label, value, icon: Icon, trend, trendType = 'neutral', color }: DashboardCardProps) => {
  return (
    <Card className="p-6 rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          color ? color : "bg-[#0F4C81]/5 text-[#0F4C81] group-hover:bg-[#FFC107] group-hover:text-[#0F4C81]"
        )}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-black uppercase px-2 py-1 rounded-full",
            trendType === 'up' ? "bg-green-100 text-green-600" : 
            trendType === 'down' ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-black text-[#0F4C81] tracking-tight">{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;