"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Check, Lock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const RolesPermissions = () => {
  const roles = [
    {
      title: 'Super Admin',
      description: 'Complete system control. Personnel provisioning, infrastructure settings, and financial overrides.',
      color: 'bg-red-50 text-red-600',
      permissions: ['Manage Admins', 'System Config', 'Full Financials', 'DB Maintenance', 'Security Audits']
    },
    {
      title: 'Admin',
      description: 'Standard management access. Can oversee staff, programs, and standard operational data.',
      color: 'bg-blue-50 text-blue-600',
      permissions: ['Manage Staff', 'Program Config', 'Standard Reports', 'Student Management']
    },
    {
      title: 'Accountant',
      description: 'Financial specialized access. Focus on revenue, expenses, and fiscal reporting.',
      color: 'bg-emerald-50 text-green-600',
      permissions: ['Fee Collection', 'Expense Logging', 'Financial Reports', 'Inventory Audits']
    },
    {
      title: 'Reception',
      description: 'Front-desk operations. Enrollment, attendance, and general inquiries.',
      color: 'bg-amber-50 text-amber-600',
      permissions: ['Enroll Students', 'Take Attendance', 'Manage Inquiries', 'Sale Entry']
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 bg-[#0F4C81]/5 p-6 rounded-[2.5rem] border border-[#0F4C81]/10">
        <div className="p-3 bg-white rounded-2xl shadow-sm"><Info className="text-[#0F4C81]" /></div>
        <div>
          <h4 className="font-black text-[#0F4C81] uppercase tracking-tight">Access Control Architecture</h4>
          <p className="text-xs font-medium text-slate-500">KYK Academy uses Role-Based Access Control (RBAC) to ensure enterprise-grade security and data privacy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role) => (
          <Card key={role.title} className="p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-4 rounded-[1.8rem]", role.color)}>
                <Shield size={28} />
              </div>
              <Badge className={cn("rounded-full px-4 py-1.5 font-black uppercase text-[10px] tracking-widest border-none shadow-none", role.color)}>
                {role.title}
              </Badge>
            </div>
            
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tighter mb-3">{role.title} Clearance</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">{role.description}</p>
            
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Enabled Capabilities</p>
              <div className="grid grid-cols-2 gap-3">
                {role.permissions.map((perm) => (
                  <div key={perm} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-green-500">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {perm}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-[#0F4C81] flex items-center gap-2">
                <Lock size={12} /> Permission Matrix
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;