"use client";

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { 
  ShieldAlert, 
  Monitor, 
  Smartphone,
  Info,
  Globe
} from 'lucide-react';
import { ActivityLog } from '@/types/administration';

interface AuditLogsTableProps {
  logs: ActivityLog[];
}

const AuditLogsTable = ({ logs }: AuditLogsTableProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Time</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">User</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Target / Details</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">IP / Device</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="group hover:bg-slate-50 transition-colors">
              <TableCell className="pl-8 py-5">
                <span className="text-xs font-bold text-slate-400">
                  {format(new Date(log.created_at), 'HH:mm:ss')}
                  <br />
                  <span className="text-[9px] font-black uppercase">{format(new Date(log.created_at), 'MMM dd')}</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                    {log.profiles?.full_name?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#0F4C81] uppercase">{log.profiles?.full_name}</span>
                    <span className="text-[9px] font-medium text-slate-400">{log.profiles?.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-[#FFC107]" />
                  <span className="text-xs font-black text-[#0F4C81] uppercase tracking-tight">{log.action.replace(/_/g, ' ')}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-slate-500">
                  <Info size={12} className="text-slate-300" />
                  <span className="text-[10px] font-bold truncate max-w-[200px]">
                    {log.details?.email || log.details?.target || 'System Procedure'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[#0F4C81]">
                    <Globe size={10} className="text-slate-300" />
                    <span className="text-[9px] font-black">{log.ip_address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                      <Monitor size={10} />
                      <span className="text-[9px] font-bold">{log.browser}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Smartphone size={10} />
                      <span className="text-[9px] font-bold">{log.device}</span>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditLogsTable;