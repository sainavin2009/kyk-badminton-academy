"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  UserCheck, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Search,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import MarkAttendanceModal from './MarkAttendanceModal';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AttendanceManager = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stuRes, attRes] = await Promise.all([
        supabase.from('students').select('*').order('full_name'),
        supabase.from('attendance').select('*, students(full_name, student_id)').eq('date', selectedDate)
      ]);

      setStudents(stuRes.data || []);
      setAttendance(attRes.data || []);
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleSaveAttendance = async (records: any[]) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('attendance')
        .upsert(records, { onConflict: 'student_id,date,batch' });

      if (error) throw error;
      toast.success('Attendance records synchronized');
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error('Failed to save: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const lateCount = attendance.filter(a => a.status === 'Late').length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Attendance Registry</h2>
          <p className="text-slate-500 font-medium">Daily roll call and athlete regularity tracking.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 rounded-2xl shadow-sm border border-slate-50">
            <CalendarIcon size={16} className="text-[#FFC107]" />
            <Input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none font-bold text-xs bg-transparent w-32 h-12" 
            />
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-8 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20"
          >
            <UserCheck className="mr-2" size={20} />
            Take Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Present Today</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{presentCount}</h3>
          </div>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Absent</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{absentCount}</h3>
          </div>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Late Arrival</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{lateCount}</h3>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-slate-50">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Attendance Log - {format(new Date(selectedDate), 'PPP')}</h3>
          <Button variant="ghost" onClick={fetchData} className="h-10 w-10 rounded-xl text-slate-400"><RefreshCw className={loading ? "animate-spin" : ""} size={16} /></Button>
        </div>
        
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <div key={record.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-10 rounded-full",
                    record.status === 'Present' ? "bg-green-500" :
                    record.status === 'Absent' ? "bg-red-500" : "bg-amber-500"
                  )} />
                  <div>
                    <p className="font-bold text-[#0F4C81] text-sm">{record.students?.full_name}</p>
                    <p className="text-[9px] font-black uppercase text-slate-400">ID: {record.students?.student_id}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-slate-200 font-bold">{record.batch}</Badge>
                  <span className={cn(
                    "text-[10px] font-black uppercase",
                    record.status === 'Present' ? "text-green-600" :
                    record.status === 'Absent' ? "text-red-600" : "text-amber-600"
                  )}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <Users className="mx-auto text-slate-200" size={48} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">No attendance data for this date.</p>
              <Button variant="outline" onClick={() => setIsModalOpen(true)} className="rounded-xl font-bold h-10 px-6 border-slate-200">Start Roll Call</Button>
            </div>
          )}
        </div>
      </div>

      <MarkAttendanceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAttendance}
        students={students}
      />
    </div>
  );
};

export default AttendanceManager;