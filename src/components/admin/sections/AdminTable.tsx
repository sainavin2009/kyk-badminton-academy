"use client";

import React, { useState } from 'react';
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
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Edit3, Trash2, Key, Ban, UserCheck, Search, Shield, Filter, Mail, Phone, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AdminTableProps {
  admins: any[];
  onEdit: (admin: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onResetPassword: (admin: any) => void;
}

const AdminTable = ({ admins, onEdit, onDelete, onStatusChange, onResetPassword }: AdminTableProps) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredAdmins = admins.filter(a => {
    const matchesSearch = a.full_name?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || a.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold transition-all text-sm" 
            placeholder="Search admins by name or email..." 
          />
        </div>
        <div className="flex gap-3">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-14 px-6 rounded-2xl border-none bg-slate-50 font-bold text-slate-500 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-none">
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Identity</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Permissions</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Contact</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Registered</TableHead>
              <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.id} className="group hover:bg-slate-50 transition-colors">
                <TableCell className="pl-8 py-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 rounded-2xl shadow-sm ring-2 ring-white">
                      <AvatarImage src={admin.avatar_url} />
                      <AvatarFallback className="bg-[#0F4C81] text-[#FFC107] font-black uppercase">
                        {admin.full_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-black text-[#0F4C81] text-lg leading-none mb-1">{admin.full_name}</span>
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Mail size={10} className="text-[#FFC107]" /> {admin.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "rounded-full px-3 py-1 font-black uppercase text-[9px] tracking-widest shadow-none border-none",
                    admin.role === 'Super Admin' ? "bg-red-50 text-red-600" :
                    admin.role === 'Admin' ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                  )}>
                    <Shield size={10} className="mr-1.5" />
                    {admin.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Phone size={14} className="text-slate-300" />
                    {admin.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", admin.status === 'Active' ? "bg-green-500 animate-pulse" : "bg-slate-300")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", admin.status === 'Active' ? "text-green-600" : "text-slate-400")}>
                      {admin.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600">{format(new Date(admin.created_at || new Date()), 'MMM dd, yyyy')}</span>
                      <span className="text-[9px] font-medium text-slate-400">Last login: {admin.last_login ? format(new Date(admin.last_login), 'p') : 'Never'}</span>
                   </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-[#FFC107]/10 text-slate-400">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2 border-none shadow-2xl">
                      <DropdownMenuItem onClick={() => onEdit(admin)} className="rounded-xl h-11 font-bold flex items-center gap-2">
                        <Edit3 size={16} className="text-blue-500" /> Modify Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onResetPassword(admin)} className="rounded-xl h-11 font-bold flex items-center gap-2">
                        <Key size={16} className="text-amber-500" /> Force Password Reset
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onStatusChange(admin.id, admin.status === 'Active' ? 'Inactive' : 'Active')} 
                        className={cn("rounded-xl h-11 font-bold flex items-center gap-2", admin.status === 'Active' ? 'text-orange-500' : 'text-green-600')}
                      >
                        {admin.status === 'Active' ? <Ban size={16} /> : <UserCheck size={16} />}
                        {admin.status === 'Active' ? 'Disable Access' : 'Restore Access'}
                      </DropdownMenuItem>
                      <div className="h-[1px] bg-slate-100 my-2" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                            <Trash2 size={16} /> Terminate Account
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[3rem]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter">Terminate Access?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 font-medium">
                              This will permanently remove <span className="font-black text-[#0F4C81]">{admin.full_name}</span> from the academy infrastructure. This action cannot be reversed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="rounded-2xl h-14 px-8 font-bold border-none bg-slate-100">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete(admin.id)}
                              className="rounded-2xl h-14 px-12 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 border-none"
                            >
                              Confirm Termination
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTable;