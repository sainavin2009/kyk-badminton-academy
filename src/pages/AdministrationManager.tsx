"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  History, 
  Mail, 
  Plus, 
  RefreshCw,
  Search,
  Filter,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AdminsTable from '@/components/admin/administration/AdminsTable';
import CreateAdminModal from '@/components/admin/administration/CreateAdminModal';
import AuditLogsTable from '@/components/admin/administration/AuditLogsTable';
import InviteHistoryTable from '@/components/admin/administration/InviteHistoryTable';
import RolesPermissions from '@/components/admin/administration/RolesPermissions';
import { AdminProfile, ActivityLog, AdminInvite } from '@/types/administration';
import { logAdminAction } from '@/utils/auditLogger';

const AdministrationManager = () => {
  const { profile, user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profilesRes, logsRes, invitesRes] = await Promise.all([
        supabase.from('profiles').select('*').not('role', 'is', null).order('created_at', { ascending: false }),
        supabase.from('admin_activity_logs').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(50),
        supabase.from('admin_invites').select('*, inviter:profiles!inviter_id(full_name)').order('created_at', { ascending: false })
      ]);

      setAdmins(profilesRes.data || []);
      setLogs(logsRes.data || []);
      setInvites(invitesRes.data || []);
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInvite = async (formData: any) => {
    try {
      // 1. Create Supabase Auth User
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`https://hsxelnigsofldxlwufri.supabase.co/functions/v1/manage-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          action: 'create',
          userData: formData
        })
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      // 2. Log Invitation
      await logAdminAction('INVITE_CREATED', { email: formData.email, role: formData.role });
      
      toast.success(`Invitation sent to ${formData.email}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (admin: AdminProfile) => {
    const newStatus = admin.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', admin.id);
      if (error) throw error;
      
      await logAdminAction('STATUS_CHANGED', { target: admin.email, newStatus });
      toast.success(`Access ${newStatus === 'Active' ? 'restored' : 'revoked'} for ${admin.full_name}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredAdmins = admins.filter(a => 
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  );

  if (profile?.role !== 'Super Admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-24 h-24 rounded-[2.5rem] bg-red-50 text-red-500 flex items-center justify-center shadow-xl rotate-12">
          <ShieldAlert size={48} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#0F4C81] uppercase tracking-tighter">Access Denied</h2>
          <p className="text-slate-400 font-medium max-w-sm">Administration management is strictly reserved for Super Administrators.</p>
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
          <Button variant="ghost" onClick={fetchData} className="h-16 w-16 rounded-2xl text-slate-400 hover:bg-white shadow-sm">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => setIsInviteOpen(true)}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 group transition-all"
          >
            <Plus className="mr-3 group-hover:rotate-90 transition-transform" />
            Provision Admin
          </Button>
        </div>
      </div>

      <Tabs defaultValue="admins" className="w-full space-y-8">
        <TabsList className="bg-white p-1 rounded-3xl h-16 border border-slate-100 w-fit shadow-sm">
          <TabsTrigger value="admins" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
            <Users className="mr-2" size={16} /> Administrators
          </TabsTrigger>
          <TabsTrigger value="roles" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
            <ShieldCheck className="mr-2" size={16} /> Roles & Perms
          </TabsTrigger>
          <TabsTrigger value="logs" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
            <History className="mr-2" size={16} /> Security Audit
          </TabsTrigger>
          <TabsTrigger value="invites" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
            <Mail className="mr-2" size={16} /> Invite History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admins" className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
                placeholder="Search by name, email or role..." 
              />
            </div>
          </div>

          {loading ? (
            <div className="py-40 flex justify-center"><Loader2 className="animate-spin text-slate-200" size={48} /></div>
          ) : (
            <AdminsTable 
              admins={filteredAdmins}
              currentUser={currentUser}
              onView={() => {}}
              onEdit={() => {}}
              onResetPassword={() => {}}
              onToggleStatus={handleToggleStatus}
              onDelete={() => {}}
            />
          )}
        </TabsContent>

        <TabsContent value="roles">
          <RolesPermissions />
        </TabsContent>

        <TabsContent value="logs">
          <AuditLogsTable logs={logs} />
        </TabsContent>

        <TabsContent value="invites">
          <InviteHistoryTable invites={invites} />
        </TabsContent>
      </Tabs>

      <CreateAdminModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
        currentUserRole={profile?.role}
      />
    </div>
  );
};

export default AdministrationManager;