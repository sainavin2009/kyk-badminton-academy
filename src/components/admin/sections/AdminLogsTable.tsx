"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  UserPlus, 
  UserMinus, 
  Key, 
  Search,
  RefreshCw,
  FileClock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AdminLogsTable = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_logs')
      .select(`
        *,
        creator:profiles!creator_id(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error) setLogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE_ADMIN': return <UserPlus size={14} className="text-green-500" />;
      case 'DELETE_ADMIN': return <UserMinus size={14} className="text-red-500" />;
      case 'RESET_PASSWORD': return <Key size={14} className="text-amber-500" />;
      default: return <ShieldAlert size={14} className="text-slate-400" />;
    }
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.creator?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={18} />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-none rounded-2xl font-bold shadow-sm" 
            placeholder="Search logs by action or admin..." 
          />
        </div>
        <button 
          onClick={fetchLogs}
          className="p-3 rounded-2xl bg-white text-slate-400 hover:text-[#0F4C81] shadow-sm transition-all"
        >
          <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-none">
              <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400 h-12 pl-8">Timestamp</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400">Initiated By</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400">Action Event</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400">Operational Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="h-40 text-center text-slate-300">Syncing logs...</TableCell></TableRow>
            ) : filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                  <TableCell className="pl-8 py-4">
                    <span className="text-xs font-bold text-slate-400">
                      {format(new Date(log.created_at), 'MMM dd, HH:mm:ss')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#0F4C81] uppercase">{log.creator?.full_name}</span>
                      <span className="text-[9px] font-medium text-slate-400">{log.creator?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <Badge className="bg-slate-100 text-[#0F4C81] border-none shadow-none text-[9px] font-black uppercase tracking-widest">
                        {log.action.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-[9px] font-mono bg-slate-50 p-2 rounded-lg text-slate-500 block max-w-xs truncate">
                      {JSON.stringify(log.details)}
                    </code>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4 text-slate-200">
                    <FileClock size={48} />
                    <p className="font-black uppercase text-[10px] tracking-widest">No audit logs recorded</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminLogsTable;