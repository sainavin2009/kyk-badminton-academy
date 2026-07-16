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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Edit3, Trash2, Eye, Search, Filter, Phone, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface StudentTableProps {
  students: any[];
  onEdit: (student: any) => void;
  onDelete: (id: string) => void;
  onView: (student: any) => void;
}

const StudentTable = ({ students, onEdit, onDelete, onView }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.phone?.includes(searchTerm) ||
                          student.student_id?.toString().includes(searchTerm);
    const matchesFilter = filterStatus === 'All' || student.fee_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold transition-all text-sm" 
            placeholder="Search name, ID or phone..." 
          />
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-14 px-6 rounded-2xl border-none bg-slate-50 font-bold flex items-center gap-2 hover:bg-slate-100 transition-all text-slate-500">
                <Filter size={18} />
                Status: {filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
              <DropdownMenuItem onClick={() => setFilterStatus('All')} className="font-bold">All Students</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Paid')} className="font-bold text-green-600">Paid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Pending')} className="font-bold text-amber-600">Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Overdue')} className="font-bold text-red-600">Overdue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-none">
              <TableHead className="w-[150px] font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Student ID</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Athlete Name</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Parent Info</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Program & Batch</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-black text-[#0F4C81] pl-8 py-6">#{student.student_id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-2xl shadow-sm">
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">{student.full_name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{student.full_name}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Phone size={10} /> {student.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600">{student.father_name} (F)</span>
                      {student.mother_name && <span className="text-[10px] font-medium text-slate-400">{student.mother_name} (M)</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#0F4C81]">{student.program}</span>
                      <span className="text-[10px] font-medium text-slate-400">{student.batch}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-lg px-3 py-1 font-black uppercase text-[9px] tracking-widest shadow-none border-none",
                      student.fee_status === 'Paid' ? "bg-green-100 text-green-600" :
                      student.fee_status === 'Pending' ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                    )}>
                      {student.fee_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100"><MoreVertical size={18} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl w-48 p-2">
                        <DropdownMenuItem onClick={() => onView(student)} className="rounded-lg h-10 font-bold flex items-center gap-2">
                          <Eye size={16} className="text-blue-500" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)} className="rounded-lg h-10 font-bold flex items-center gap-2">
                          <Edit3 size={16} className="text-amber-500" /> Edit Details
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50">
                              <Trash2 size={16} /> Delete Student
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[2.5rem]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-black uppercase">Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-500 font-medium">Delete record for <span className="font-bold text-[#0F4C81]">{student.full_name}</span>?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3">
                              <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete(student.id)} className="rounded-2xl h-14 font-black bg-red-500 hover:bg-red-600 text-white border-none">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4 text-slate-300">
                    <User size={48} />
                    <p className="font-bold uppercase text-[10px] tracking-widest">No athletes found</p>
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

export default StudentTable;