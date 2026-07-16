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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Key, 
  Ban, 
  UserCheck, 
  Eye,
  Shield,
  ShieldAlert
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AdminProfile } from '@/types/administration';
import { useAuth } from '@/contexts/AuthContext';

interface AdminsTableProps {
  admins: AdminProfile[];
  onView: (admin: AdminProfile) => void;
  onEdit: (admin: AdminProfile) => void;
  onResetPassword: (admin: AdminProfile) => void;
  onToggleStatus: (admin: AdminProfile) => void;
  onDelete: (admin: AdminProfile) => void;
  currentUser: any;
}

const AdminsTable = ({ 
  admins, 
  onView, 
  onEdit, 
  onResetPassword, 
  onToggleStatus, 
  onDelete,
  currentUser
}: AdminsTableProps) => {
  const { profile } = useAuth();
  const superAdminCount = admins.filter(a => a.role === 'Super Admin' && a.status === 'Active').length;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Admin Identity</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Permissions</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Activity</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">System Entry</TableHead>
            <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => {
            const isSelf = admin.id === currentUser?.id;
            const isTargetSuperAdmin = admin.role === 'Super Admin';
            const isLastSuperAdmin = isTargetSuperAdmin && superAdminCount === 1;
            
            // Standard Admins cannot manage Super Admins or other Admins
            const canManage = profile?.role === 'Super Admin' || (profile?.role === 'Admin' && admin.role === 'Staff');

            return (
              <TableRow key={admin.id} className="group hover:bg-slate-50 transition-colors">
                <TableCell className="pl-8 py-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-2xl shadow-sm">
                      <AvatarImage src={admin.avatar_url} />
                      <AvatarFallback className="bg-[#0F4C81] text-[#FFC107] font-black uppercase">
                        {admin.full_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#0F4C81] text-base leading-none">{admin.full_name}</span>
                        {isSelf && <span className="text-[8px] font-black uppercase bg-[#FFC107] text-[#0F4C81] px-1.5 py-0.5 rounded">You</span>}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{admin.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "rounded-full px-3 py-1 font-black uppercase text-[9px] tracking-widest border-none shadow-none",
                    admin.role === 'Super Admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  )}>
                    <Shield size={10} className="mr-1.5" />
                    {admin.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", admin.status === 'Active' ? "bg-green-500" : "bg-slate-300")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", admin.status === 'Active' ? "text-green-600" : "text-slate-400")}>
                      {admin.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-600">
                      {admin.last_login ? format(new Date(admin.last_login), 'MMM dd, p') : 'Never'}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">Last Login</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-600">{format(new Date(admin.created_at), 'MMM dd, yyyy')}</span>
                    <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">Registered</span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-[#FFC107]/10 text-slate-400">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2 border-none shadow-2xl">
                      <DropdownMenuItem onClick={() => onView(admin)} className="rounded-xl h-10 font-bold flex items-center gap-2">
                        <Eye size={16} className="text-blue-500" /> View Profile
                      </DropdownMenuItem>

                      {canManage && !isSelf && (
                        <>
                          <DropdownMenuItem onClick={() => onEdit(admin)} className="rounded-xl h-10 font-bold flex items-center gap-2">
                            <Edit3 size={16} className="text-amber-500" /> Edit Permissions
                          </DropdownMenuItem>
                          
                          {profile?.role === 'Super Admin' && (
                            <DropdownMenuItem onClick={() => onResetPassword(admin)} className="rounded-xl h-10 font-bold flex items-center gap-2">
                              <Key size={16} className="text-indigo-500" /> Force Password Reset
                            </DropdownMenuItem>
                          )}
                          
                          <div className="h-[1px] bg-slate-100 my-1" />
                          
                          <DropdownMenuItem 
                            onClick={() => onToggleStatus(admin)}
                            disabled={isLastSuperAdmin}
                            className={cn(
                              "rounded-xl h-10 font-bold flex items-center gap-2",
                              admin.status === 'Active' ? 'text-orange-500' : 'text-green-600'
                            )}
                          >
                            {admin.status === 'Active' ? <Ban size={16} /> : <UserCheck size={16} />}
                            {admin.status === 'Active' ? 'Deactivate Access' : 'Activate Access'}
                          </DropdownMenuItem>

                          <DropdownMenuItem 
                            onClick={() => onDelete(admin)}
                            disabled={isLastSuperAdmin}
                            className="rounded-xl h-10 font-bold flex items-center gap-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete Account
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminsTable;