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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Mail, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { AdminInvite } from '@/types/administration';
import { cn } from '@/lib/utils';

interface InviteHistoryTableProps {
  invites: AdminInvite[];
}

const InviteHistoryTable = ({ invites }: InviteHistoryTableProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Target Email</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Assigned Role</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Expiration</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Invited By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <TableRow key={invite.id} className="group hover:bg-slate-50 transition-colors">
              <TableCell className="pl-8 py-5">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-300" />
                  <span className="font-bold text-[#0F4C81]">{invite.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200">
                  {invite.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn(
                  "rounded-full px-3 py-1 font-black uppercase text-[8px] tracking-widest border-none shadow-none",
                  invite.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                  invite.status === 'Accepted' ? 'bg-green-50 text-green-600' :
                  'bg-red-50 text-red-600'
                )}>
                  {invite.status === 'Pending' && <Clock size={10} className="mr-1" />}
                  {invite.status === 'Accepted' && <ShieldCheck size={10} className="mr-1" />}
                  {invite.status === 'Expired' && <AlertCircle size={10} className="mr-1" />}
                  {invite.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-xs font-bold text-slate-400">
                  {format(new Date(invite.expires_at), 'MMM dd, HH:mm')}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs font-black text-[#0F4C81] uppercase">{invite.inviter?.full_name}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InviteHistoryTable;