"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  Users, 
  ShieldAlert,
  Lock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import AdminTable from './AdminTable';
import AdminForm from './AdminForm';
import ResetPasswordModal from './ResetPasswordModal';

const AdminManager = () => {
  const { profile, user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('role', 'is', null)
        .order('role', { ascending: true });

      if (error) throw error;
      setAdmins(data || []);
    } catch (err: any) {
      toast.error('Failed to sync personnel records: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const invokeManageAdmins = async (payload: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`https://hsxelnigsofldxlwufri.supabase.co/functions/v1/manage-admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Request failed');
    return result;
  };

  const handleSave = async (formData: any) => {
    try {
      if (selectedAdmin) {
        await invokeManageAdmins({
          action: 'update',
          userId: selectedAdmin.id,
          userData: formData
        });
        toast.success(`Access updated for ${formData.full_name}`);
      } else {
        await invokeManageAdmins({
          action: 'create',
          userData: formData
        });
        toast.success(`Account provisioned for ${formData.full_name}`);
      }
      fetchAdmins();
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (id === currentUser?.id) {
      return toast.error("System Override: You cannot delete your own account.");
    }

    const superAdmins = admins.filter(a => a.role === 'Super Admin' && a.status === 'Active');
    const target = admins.find(a => a.id === id);
    if (target?.role === 'Super Admin' && superAdmins.length === 1) {
      return toast.error("Operational Guard: Cannot delete the last active Super Admin.");
    }

    try {
      await invokeManageAdmins({ action: 'delete', userId: id });
      setAdmins(prev => prev.filter(a => a.id !== id));
      toast.success('Personnel record purged successfully.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (id === currentUser?.id) {
      return toast.error("You cannot disable your own administrative clearance.");
    }
    try {
      const { error } = await supabase.from('profiles').update({ status }).eq('id', id);
      if (error) throw error;
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      toast.success(`Clearance ${status === 'Active' ? 'restored' : 'revoked'}`);
    } catch (err: any) {
      toast.error('Status sync failed: ' + err.message);
    }
  };

  const handleResetPassword = async (password: string) => {
    try {
      await invokeManageAdmins({
        action: 'reset_password',
        userId: selectedAdmin.id,
        newPassword: password
      });
      toast.success(`Security tokens rotated for ${selectedAdmin.full_name}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (profile?.role !== 'Super Admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 rounded-[2.5rem] bg-red-50 text-red-500 flex items-center justify-center shadow-xl rotate-12">
          <ShieldAlert size={48} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#0F4C81] uppercase tracking-tighter">Access Forbidden</h2>
          <p className="text-slate-400 font-medium max-w-sm">
            Administrator management is restricted to Super Administrators only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase">Infrastructure Personnel</h2>
          <p className="text-slate-500 font-medium">Provision and supervise digital personnel and their clearances.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchAdmins} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => { setSelectedAdmin(null); setIsFormOpen(true); }}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group transition-all"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Provision Admin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[3rem] bg-[#0F4C81] text-white border-none shadow-xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FFC107] flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">Active Clearances</p>
            <h3 className="text-3xl font-black">{admins.filter(a => a.status === 'Active').length}</h3>
          </div>
        </Card>
        <Card className="p-8 rounded-[3rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Personnel</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{admins.length}</h3>
          </div>
        </Card>
        <Card className="p-8 rounded-[3rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Lock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Revoked</p>
            <h3 className="text-3xl font-black text-red-600">{admins.filter(a => a.status === 'Inactive').length}</h3>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Scanning Personnel Registry...</p>
        </div>
      ) : (
        <AdminTable 
          admins={admins} 
          onEdit={(admin) => { setSelectedAdmin(admin); setIsFormOpen(true); }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onResetPassword={(admin) => { setSelectedAdmin(admin); setIsResetOpen(true); }}
        />
      )}

      <AdminForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        admin={selectedAdmin}
      />

      <ResetPasswordModal 
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onReset={handleResetPassword}
        adminName={selectedAdmin?.full_name || ''}
      />
    </div>
  );
};

export default AdminManager;