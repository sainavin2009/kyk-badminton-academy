"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  RefreshCw, 
  UserPlus, 
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import FacultyTable from './FacultyTable';
import FacultyFormModal from './FacultyFormModal';
import { FacultyMember } from '@/types/faculty';

const FacultyManager = () => {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (err: any) {
      toast.error('Failed to sync faculty: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      if (formData.id) {
        const { data, error } = await supabase
          .from('faculty')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', formData.id)
          .select();
        
        if (error) throw error;
        setMembers(prev => prev.map(m => m.id === formData.id ? data[0] : m));
        toast.success('Faculty profile updated');
      } else {
        // Explicitly remove id to let Postgres handle gen_random_uuid()
        const { id, ...insertData } = formData;
        const { data, error } = await supabase
          .from('faculty')
          .insert([insertData])
          .select();
        
        if (error) throw error;
        setMembers(prev => [...prev, data[0]]);
        toast.success('New faculty member published');
      }
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('faculty').delete().eq('id', id);
      if (error) throw error;
      setMembers(prev => prev.filter(m => m.id !== id));
      toast.success('Faculty member removed');
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  const handleToggleStatus = async (member: FacultyMember) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .update({ is_active: !member.is_active })
        .eq('id', member.id);
      
      if (error) throw error;
      setMembers(prev => prev.map(m => m.id === member.id ? { ...m, is_active: !m.is_active } : m));
      toast.success(`Profile visibility updated`);
    } catch (err: any) {
      toast.error('Status update failed');
    }
  };

  const filteredMembers = members.filter(m => 
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    m.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">Faculty Management</h2>
          <p className="text-slate-500 font-medium">Provision and manage the academy's professional coaching faculty.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchFaculty} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedMember(null); setIsModalOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group transition-all"
          >
            <UserPlus className="mr-3 group-hover:rotate-12 transition-transform" />
            Add Faculty Member
          </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder="Search by name or title..." 
        />
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-200">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Loading Faculty Registry...</p>
        </div>
      ) : (
        <FacultyTable 
          members={filteredMembers}
          onEdit={(m) => { setSelectedMember(m); setIsModalOpen(true); }}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <FacultyFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        member={selectedMember}
      />
    </div>
  );
};

export default FacultyManager;