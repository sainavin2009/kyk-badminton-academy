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
  MapPin, 
  User, 
  Clock, 
  ShieldAlert, 
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentProfileProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

const StudentProfile = ({ isOpen, onClose, student }: StudentProfileProps) => {
  if (!student) return null;

  const infoBlocks = [
    { label: "Phone", value: student.phone, icon: Phone },
    { label: "WhatsApp", value: student.whatsapp || 'N/A', icon: MessageSquare },
    { label: "Email", value: student.email || 'N/A', icon: Mail },
    { label: "Date of Birth", value: student.dob || 'N/A', icon: Calendar },
    { label: "Gender", value: student.gender, icon: User },
    { label: "Joining Date", value: student.joining_date, icon: Clock },
    { label: "Emergency", value: student.emergency_contact || 'N/A', icon: ShieldAlert },
    { label: "Address", value: student.address || 'N/A', icon: MapPin, fullWidth: true },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-[3.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="academy-gradient p-12 text-white flex flex-col items-center text-center relative">
          <Avatar className="h-32 w-32 rounded-[2.5rem] shadow-2xl border-4 border-white/20 mb-6">
            <AvatarImage src={student.photo_url} />
            <AvatarFallback className="bg-white text-[#0F4C81] text-4xl font-black">
              {student.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter">{student.name}</h2>
            <p className="text-[#FFC107] font-black uppercase tracking-[0.3em] text-xs">Student ID: #{student.student_id_serial}</p>
          </div>

          <Badge className={cn(
            "mt-6 rounded-full px-6 py-2 font-black uppercase text-[10px] tracking-widest shadow-xl",
            student.fee_status === 'Paid' ? "bg-green-500 text-white" :
            student.fee_status === 'Pending' ? "bg-amber-500 text-[#0F4C81]" :
            "bg-red-500 text-white"
          )}>
            {student.fee_status} Account
          </Badge>

          <div className="absolute top-8 left-8">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-white/60">Rank</span>
              <span className="text-xl font-black">A+</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Details Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-1 bg-[#FFC107] rounded-full" />
                Contact & Personal
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {infoBlocks.map((block, i) => (
                  <div key={i} className={cn("flex items-start gap-4", block.fullWidth && "col-span-full")}>
                    <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl border border-slate-100">
                      <block.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{block.label}</p>
                      <p className="text-sm font-bold text-[#0F4C81]">{block.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academy Info Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-1 bg-[#FFC107] rounded-full" />
                Academy Info
              </h3>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Program</span>
                  <span className="text-sm font-black text-[#0F4C81]">{student.program}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Batch</span>
                  <span className="text-sm font-bold text-slate-600">{student.batch}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Coach</span>
                  <span className="text-sm font-black text-[#0F4C81]">{student.coach || 'Unassigned'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Medical & Notes</h3>
              <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100/50">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <ShieldAlert size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Medical Alert</span>
                </div>
                <p className="text-xs font-medium text-red-900 leading-relaxed">
                  {student.medical_notes || 'No significant medical notes provided.'}
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-[#0F4C81] mb-2">
                  <ClipboardList size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Internal Remarks</span>
                </div>
                <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                  "{student.remarks || 'No internal remarks.'}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 flex justify-end">
          <Button onClick={onClose} className="rounded-2xl h-14 px-10 bg-[#0F4C81] text-white font-black uppercase tracking-widest">
            Close Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfile;