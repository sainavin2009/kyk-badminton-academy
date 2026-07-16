"use client";

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, UserCheck, X, Search, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (records: any[]) => void;
  students: any[];
}

const MarkAttendanceModal = ({ isOpen, onClose, onSave, students }: MarkAttendanceModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [batch, setBatch] = useState('Morning');
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, 'Present' | 'Absent' | 'Late'> = {};
      students.forEach(s => initial[s.id] = 'Present');
      setAttendance(initial);
    }
  }, [isOpen, students]);

  const toggleStatus = (studentId: string) => {
    setAttendance(prev => {
      const current = prev[studentId];
      let next: 'Present' | 'Absent' | 'Late' = 'Present';
      if (current === 'Present') next = 'Absent';
      else if (current === 'Absent') next = 'Late';
      return { ...prev, [studentId]: next };
    });
  };

  const handleSave = () => {
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      student_id: studentId,
      date,
      batch,
      status
    }));
    onSave(records);
  };

  const filteredStudents = students.filter(s => 
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id?.toString().includes(searchTerm)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <UserCheck className="text-[#FFC107]" size={32} />
              Roll Call
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between border-b border-slate-100 pb-6">
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch</Label>
                <select value={batch} onChange={(e) => setBatch(e.target.value)} className="h-12 w-full rounded-xl bg-slate-50 border-none px-4 font-bold text-sm">
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekend">Weekend</option>
                </select>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find athlete..." 
                className="pl-10 h-12 rounded-xl bg-slate-50 border-none font-medium"
              />
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredStudents.map((student) => (
              <div 
                key={student.id} 
                onClick={() => toggleStatus(student.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                  attendance[student.id] === 'Present' ? "bg-green-50 border-green-100" :
                  attendance[student.id] === 'Absent' ? "bg-red-50 border-red-100" :
                  "bg-amber-50 border-amber-100"
                )}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 rounded-xl shadow-sm">
                    <AvatarFallback className="bg-white font-black text-[#0F4C81]">
                      {student.full_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-[#0F4C81]">{student.full_name}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400">ID: {student.student_id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    attendance[student.id] === 'Present' ? "bg-green-500 text-white" :
                    attendance[student.id] === 'Absent' ? "bg-red-500 text-white" :
                    "bg-amber-500 text-[#0F4C81]"
                  )}>
                    {attendance[student.id]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose} className="h-14 rounded-2xl font-bold text-slate-400">Cancel</Button>
          <Button onClick={handleSave} className="h-14 px-12 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20">
            <Check className="mr-2" size={20} />
            Submit Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceModal;