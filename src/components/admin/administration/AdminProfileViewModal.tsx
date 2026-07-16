"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  Clock, 
  User, 
  Activity,
  UserPlus
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AdminProfile } from '@/types/administration';

interface AdminProfileViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: AdminProfile | null;
}

const AdminProfileViewModal = ({ isOpen, onClose, admin }: AdminProfileViewModalProps) => {
  if (!admin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-10 text-white relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFC107]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <Avatar className="h-28 w-28 rounded-[2rem] border-4 border-white/20 shadow-2xl">
              <AvatarImage src={admin.avatar_url} />
              <AvatarFallback className="bg-white text-[#0F4C81] text-3xl font-black">
                {admin.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter">{admin.full_name}</h2>
              <p className="text-[#FFC107] font-black uppercase tracking-[0.2em] text-[10px]">Access Level: {admin.role}</p>
            </div>
            <Badge className={cn(
              "rounded-full px-6 py-1.5 font-black uppercase text-[10px] tracking-widest border-none",
              admin.status === 'Active' ? "bg-green-500 text-white" : "bg-red-500 text-white"
            )}>
              {admin.status} Account
            </Badge>
          </div>
        </div>

        <div className="p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FFC107]" /> Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl"><Mail size={16} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">Email Address</p>
                  <p className="text-sm font-bold text-[#0F4C81]">{admin.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl"><Phone size={16} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">Phone Number</p>
                  <p className="text-sm font-bold text-[#0F4C81]">{admin.phone || 'Not Provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FFC107]" /> System History
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl"><Clock size={16} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">Last Activity</p>
                  <p className="text-sm font-bold text-[#0F4C81]">
                    {admin.last_login ? format(new Date(admin.last_login), 'MMM dd, yyyy HH:mm') : 'Never Logged In'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl"><UserPlus size={16} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">Provisioned On</p>
                  <p className="text-sm font-bold text-[#0F4C81]">{format(new Date(admin.created_at), 'PPP')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 flex justify-end">
          <Button 
            onClick={onClose}
            className="rounded-2xl h-14 px-10 bg-[#0F4C81] text-white font-black uppercase tracking-widest text-xs hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all"
          >
            Close Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProfileViewModal;