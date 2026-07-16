"use client";

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, Mail, Calendar, MapPin, User, Clock, ShieldAlert, 
  ClipboardList, Trophy, Activity, CheckCircle2, XCircle, Timer,
  Plus, Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface StudentProfileProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

const StudentProfile = ({ isOpen, onClose, student }: StudentProfileProps) => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!student) return;
    setLoading(true);
    try {
      const [attRes, mileRes] = await Promise.all([
        supabase.from('attendance').select('*').eq('student_id', student.id).order('date', { ascending: false }).limit(10),
        supabase.from('student_milestones').select('*').eq('student_id', student.id).order('achievement_date', { ascending: false })
      ]);
      setAttendance(attRes.data || []);
      setMilestones(mileRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && student) fetchData();
  }, [isOpen, student]);

  if (!student) return null;

  const infoBlocks = [
    { label: "Phone", value: student.phone, icon: Phone },
    { label: "WhatsApp", value: student.whatsapp || 'N/A', icon: Activity },
    { label: "Email", value: student.email || 'N/A', icon: Mail },
    { label: "DOB", value: student.date_of_birth || 'N/A', icon: Calendar },
    { label: "Gender", value: student.gender, icon: User },
    { label: "Joining Date", value: student.joining_date, icon: Clock },
    { label: "Father's Name", value: student.father_name, icon: User },
    { label: "Mother's Name", value: student.mother_name || 'N/A', icon: User },
    { label: "Emergency", value: student.emergency_contact || 'N/A', icon: ShieldAlert },
    { label: "Address", value: student.address || 'N/A', icon: MapPin, fullWidth: true },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] p-0 border-none shadow-2xl">
        <div className="academy-gradient p-12 text-white flex flex-col items-center text-center relative">
          <Avatar className="h-32 w-32 rounded-[2.5rem] shadow-2xl border-4 border-white/20 mb-6">
            <AvatarFallback className="bg-white text-[#0F4C81] text-4xl font-black">{student.full_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter">{student.full_name}</h2>
            <p className="text-[#FFC107] font-black uppercase tracking-[0.3em] text-xs">ID: {student.student_id}</p>
          </div>
          <Badge className={cn(
            "mt-6 rounded-full px-6 py-2 font-black uppercase text-[10px] tracking-widest shadow-xl",
            student.fee_status === 'Paid' ? "bg-green-500 text-white" : "bg-amber-500 text-[#0F4C81]"
          )}>
            {student.fee_status} Account
          </Badge>
        </div>

        <div className="bg-white p-8 md:p-12">
          <Tabs defaultValue="details" className="w-full space-y-10">
            <TabsList className="bg-slate-50 p-1 rounded-2xl h-14 border border-slate-100 w-fit mx-auto shadow-sm">
              <TabsTrigger value="details" className="rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">Profile</TabsTrigger>
              <TabsTrigger value="performance" className="rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">Performance</TabsTrigger>
              <TabsTrigger value="attendance" className="rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in zoom-in-95">
              <div className="space-y-6">
                <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#FFC107] rounded-full" /> Details
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {infoBlocks.map((block, i) => (
                    <div key={i} className={cn("flex items-start gap-4", block.fullWidth && "col-span-full")}>
                      <div className="p-2.5 bg-slate-50 text-[#0F4C81] rounded-xl border border-slate-100"><block.icon size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">{block.label}</p>
                        <p className="text-sm font-bold text-[#0F4C81]">{block.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-1 bg-[#FFC107] rounded-full" /> Academy
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-slate-400">Program</span><span className="text-sm font-black text-[#0F4C81]">{student.program}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-slate-400">Batch</span><span className="text-sm font-bold text-slate-600">{student.batch}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-slate-400">Coach</span><span className="text-sm font-black text-[#0F4C81]">{student.coach || 'Unassigned'}</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-[#0F4C81] mb-2"><ClipboardList size={16} /><span className="text-[10px] font-black uppercase">Internal Remarks</span></div>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed italic">"{student.remarks || 'No specific coaching remarks recorded.'}"</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-8 animate-in fade-in zoom-in-95">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-1 bg-[#FFC107] rounded-full" /> Achievement Log
                  </h3>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                  {milestones.length > 0 ? milestones.map((mile) => (
                    <div key={mile.id} className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl">
                      <div className="p-4 bg-white rounded-2xl text-[#FFC107] shadow-sm group-hover:bg-[#0F4C81] group-hover:text-white transition-colors">
                        <Trophy size={24} />
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">{mile.type}</span>
                          <span className="text-[10px] font-bold text-slate-400">{format(new Date(mile.achievement_date), 'PPP')}</span>
                        </div>
                        <h4 className="text-lg font-black text-[#0F4C81] uppercase tracking-tight">{mile.title}</h4>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed italic">"{mile.description}"</p>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[3rem]">
                      <Trophy size={48} className="mx-auto text-slate-200" />
                      <p className="text-[10px] font-black uppercase text-slate-300">No milestones recorded yet.</p>
                    </div>
                  )}
               </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-8 animate-in fade-in zoom-in-95">
               <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#FFC107] rounded-full" /> Recent Regularity
               </h3>
               
               <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {attendance.length > 0 ? attendance.map((att) => (
                    <div key={att.id} className="p-5 rounded-3xl bg-slate-50 flex flex-col items-center gap-3 text-center">
                      <p className="text-[9px] font-black uppercase text-slate-400">{format(new Date(att.date), 'MMM dd')}</p>
                      {att.status === 'Present' ? <CheckCircle2 className="text-green-500" /> : att.status === 'Absent' ? <XCircle className="text-red-500" /> : <Timer className="text-amber-500" />}
                      <span className={cn(
                        "text-[10px] font-black uppercase",
                        att.status === 'Present' ? "text-green-600" : att.status === 'Absent' ? "text-red-600" : "text-amber-600"
                      )}>{att.status}</span>
                    </div>
                  )) : (
                    <div className="col-span-full py-20 text-center text-slate-300">
                       <p className="text-[10px] font-black uppercase">No attendance history available.</p>
                    </div>
                  )}
               </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-slate-50 p-8 flex justify-end">
          <Button onClick={onClose} className="rounded-2xl h-14 px-10 bg-[#0F4C81] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0F4C81]/20">Close Athlete Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfile;