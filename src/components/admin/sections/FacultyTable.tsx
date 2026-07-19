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
  Eye, 
  EyeOff,
  User,
  Star
} from 'lucide-react';
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
import { FacultyMember } from '@/types/faculty';
import { cn } from '@/lib/utils';

interface FacultyTableProps {
  members: FacultyMember[];
  onEdit: (member: FacultyMember) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (member: FacultyMember) => void;
}

const FacultyTable = ({ members, onEdit, onDelete, onToggleStatus }: FacultyTableProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Faculty Profile</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Designation</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Specialization</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Order</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
            <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? members.map((member) => (
            <TableRow key={member.id} className="group hover:bg-slate-50 transition-colors">
              <TableCell className="pl-8 py-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 rounded-2xl shadow-sm border border-slate-100">
                    <AvatarImage src={member.image_url} />
                    <AvatarFallback className="bg-[#0F4C81] text-white font-bold">{member.full_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-black text-[#0F4C81] text-base leading-none">{member.full_name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{member.qualification}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-slate-200 text-[#0F4C81]">
                  {member.designation}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Star size={12} className="text-[#FFC107]" />
                  {member.specialization || 'General Coaching'}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-black text-slate-400">{member.display_order}</span>
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => onToggleStatus(member)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                    member.is_active ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {member.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span className="text-[9px] font-black uppercase tracking-widest">{member.is_active ? 'Active' : 'Hidden'}</span>
                </button>
              </TableCell>
              <TableCell className="text-right pr-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-[#FFC107]/10 text-slate-400">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2 border-none shadow-2xl">
                    <DropdownMenuItem onClick={() => onEdit(member)} className="rounded-xl h-10 font-bold flex items-center gap-2">
                      <Edit3 size={16} className="text-amber-500" /> Edit Details
                    </DropdownMenuItem>
                    <div className="h-[1px] bg-slate-100 my-1" />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={16} /> Delete Faculty
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-[2.5rem]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-black uppercase text-[#0F4C81]">Purge Faculty Record?</AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-500 font-medium">
                            Delete profile for <span className="font-bold text-[#0F4C81]">{member.full_name}</span>? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3">
                          <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(member.id)} className="rounded-2xl h-14 font-black bg-red-500 hover:bg-red-600 text-white border-none">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center gap-4 text-slate-300">
                  <User size={48} strokeWidth={1} />
                  <p className="text-[10px] font-black uppercase tracking-widest">No faculty members registered.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FacultyTable;