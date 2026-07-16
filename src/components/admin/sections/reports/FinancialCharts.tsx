"use client";

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { Card } from '@/components/ui/card';

interface FinancialChartsProps {
  trendData: any[];
  categoryData: any[];
}

const FinancialCharts = ({ trendData, categoryData }: FinancialChartsProps) => {
  const COLORS = ['#0F4C81', '#FFC107', '#22C55E', '#EF4444', '#A855F7'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Revenue vs Expenses Trend */}
      <Card className="p-8 rounded-[3rem] border-none shadow-sm bg-white h-[450px] space-y-6">
        <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Financial Performance Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} 
            />
            <Area type="monotone" dataKey="income" stroke="#0F4C81" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
            <Area type="monotone" dataKey="expenses" stroke="#FFC107" strokeWidth={3} fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Revenue by Source */}
      <Card className="p-8 rounded-[3rem] border-none shadow-sm bg-white h-[450px] space-y-6">
        <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Revenue Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={8}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default FinancialCharts;