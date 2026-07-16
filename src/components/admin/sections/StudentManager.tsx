"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import StudentTable from './StudentTable';
import StudentForm from './StudentForm';
import StudentProfile from './StudentProfile';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const StudentManager = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error: any) {
      toast.error('Failed to load students: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleView = (student: any) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Student record deleted successfully');
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (selectedStudent) {
        const { data, error } = await supabase
          .from('students')
          .update(formData)
          .eq('id', selectedStudent.id)
          .select();

        if (error) throw error;
        toast.success('Student profile updated');
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? data[0] : s));
      } else {
        const { data, error } = await supabase
          .from('students')
          .insert([formData])
          .select();

        if (error) throw error;
        toast.success('New student enrolled successfully');
        setStudents(prev => [data[0], ...prev]);
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error('Operation failed: ' + error.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Student Directory</h2>
          <p className="text-slate-500 font-medium">Manage enrollment, fee status, and professional athlete profiles.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={fetchStudents}
            className="h-16 w-16 rounded-2xl text-slate-400 hover:text-[#0F4C81] hover:bg-white shadow-sm"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={handleAdd}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group"
          >
            <UserPlus className="mr-3 group-hover:scale-110 transition-transform" />
            New Admission
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
          <RefreshCw className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Synchronizing Academy Records...</p>
        </div>
      ) : (
        <StudentTable 
          students={students} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onView={handleView}
        />
      )}

      <StudentForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        student={selectedStudent}
      />

      <StudentProfile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentManager;