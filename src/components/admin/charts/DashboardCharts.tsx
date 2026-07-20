"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface IncomeExpenseChartProps {
  data: any[];
}

export const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => (
  <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white h-[400px]">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Revenue vs Expenses</h3>
    </div>
    <ResponsiveContainer width="100%" height="85%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
          tickFormatter={(val) => `₹${val}`}
        />
        <Tooltip 
          formatter={(value: number) => formatCurrency(value)}
          contentStyle={{ 
            borderRadius: '1rem', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }} 
        />
        <Area type="monotone" dataKey="income" stroke="#0F4C81" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
        <Area type="monotone" dataKey="expenses" stroke="#FFC107" strokeWidth={3} fill="none" />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);

interface SalesBarChartProps {
  data: any[];
}

export const SalesBarChart = ({ data }: SalesBarChartProps) => (
  <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white h-[400px]">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Enrollment Distribution</h3>
    </div>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
          dy={10}
        />
        <YAxis hide />
        <Tooltip 
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ 
            borderRadius: '1rem', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }} 
        />
        <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0F4C81' : '#FFC107'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Card>
);