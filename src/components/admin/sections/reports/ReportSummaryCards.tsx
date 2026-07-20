"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Package, AlertTriangle, DollarSign } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface SummaryProps {
  data: {
    totalIncome: number;
    totalExpenses: number;
    totalStudents: number;
    lowStock: number;
    pendingFees: number;
    netProfit: number;
  }
}

const ReportSummaryCards = ({ data }: SummaryProps) => {
  const cards = [
    { label: "Total Revenue", value: formatCurrency(data.totalIncome), icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Expenses", value: formatCurrency(data.totalExpenses), icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
    { label: "Net Profit", value: formatCurrency(data.netProfit), icon: DollarSign, color: "text-[#0F4C81]", bg: "bg-blue-50" },
    { label: "Total Athletes", value: data.totalStudents.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Dues", value: formatCurrency(data.pendingFees), icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Low Stock Items", value: data.lowStock.toString(), icon: Package, color: "text-slate-600", bg: "bg-slate-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <Card key={i} className="p-5 rounded-3xl border-none shadow-sm space-y-3 bg-white hover:shadow-md transition-shadow">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.bg, card.color)}>
            <card.icon size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
            <h3 className="text-xl font-black text-[#0F4C81]">{card.value}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReportSummaryCards;