"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  History, 
  Mail, 
  Plus, 
  RefreshCw,
  Search,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AdminsTable from '@/components/admin/administration/AdminsTable';
import CreateAdminModal from '@/components/admin/administration/CreateAdminModal';
import AdminProfileViewModal from '@/components/admin/administration/AdminProfileViewModal';
import AdminEditModal from '@/components/admin/administration/AdminEditModal';
import AuditLogsTable from '@/components/admin/administration/AuditLogsTable';
import InviteHistoryTable from '@/components/admin/administration/InviteHistoryTable';
import RolesPermissions from '@/components/admin/administration/RolesPermissions';
import ResetPasswordModal from '@/components/admin/sections/ResetPasswordModal';
import { AdminProfile, ActivityLog, AdminInvite } from '@/types/administration';
import { logAdminAction } from '@/utils/auditLogger';

const AdministrationManager = () => {
  const { profile, user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);

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
    if (!response.ok) throw new Error(result.error);
    return result;
  };

  const handleInvite = async (formData: any) => {
    try {
      await invokeManageAdmins({ action: 'create', userData: formData });
      await logAdminAction('ADMIN_PROVISIONED', { email: formData.email, role: formData.role });
      toast.success(`Access tokens generated for ${formData.email}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!selectedAdmin) return;
    try {
      const { error } = await supabase.from('profiles').update(formData).eq('id', selectedAdmin.id);
      if (error) throw error;
      
      await logAdminAction('ADMIN_UPDATED', { target: selectedAdmin.email, changes: formData });
      toast.success('Clearance profile synchronized');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleResetPassword = async (password: string) => {
    if (!selectedAdmin) return;
    try {
      await invokeManageAdmins({ action: 'reset_password', userId: selectedAdmin.id, newPassword: password });
      await logAdminAction('PASSWORD_FORCED_RESET', { target: selectedAdmin.email });
      toast.success('Security tokens rotated successfully');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (admin: AdminProfile) => {
    const newStatus = admin.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', admin.id);
      if (error) throw error;
      
      await logAdminAction(newStatus === 'Active' ? 'ADMIN_ENABLED' : 'ADMIN_DISABLED', { target: admin.email });
      toast.success(`System access ${newStatus === 'Active' ? 'restored' : 'revoked'} for ${admin.full_name}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (admin: AdminProfile) => {
    try {
      await invokeManageAdmins({ action: 'delete', userId: admin.id });
      await logAdminAction('ADMIN_TERMINATED', { target: admin.email });
      toast.success('Personnel record purged from infrastructure');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredAdmins = admins.filter(a => {
    const matchesSearch = a.full_name.toLowerCase().includes(search.toLowerCase()) || 
                          a.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || a.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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
          {profile?.role === 'Super Admin' && (
            <>
              <TabsTrigger value="logs" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
                <History className="mr-2" size={16} /> Security Audit
              </TabsTrigger>
              <TabsTrigger value="invites" className="rounded-2xl px-8 h-14 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-[#0F4C81] data-[state=active]:text-white">
                <Mail className="mr-2" size={16} /> Invite History
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="admins" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
                placeholder="Search by identity or contact..." 
              />
            </div>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-16 rounded-2xl bg-white border-none shadow-sm px-6 font-black uppercase text-[10px] tracking-widest text-slate-500 outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-16 rounded-2xl bg-white border-none shadow-sm px-6 font-black uppercase text-[10px] tracking-widest text-slate-500 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Deactivated</option>
            </select>
          </div>

          {loading ? (
            <div className="py-40 flex justify-center"><Loader2 className="animate-spin text-slate-200" size={48} /></div>
          ) : (
            <AdminsTable 
              admins={filteredAdmins}
              currentUser={currentUser}
              onView={(admin) => { setSelectedAdmin(admin); setIsViewOpen(true); }}
              onEdit={(admin) => { setSelectedAdmin(admin); setIsEditOpen(true); }}
              onResetPassword={(admin) => { setSelectedAdmin(admin); setIsResetOpen(true); }}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          )}
        </TabsContent>

        <TabsContent value="roles">
          <RolesPermissions />
        </TabsContent>

        {profile?.role === 'Super Admin' && (
          <>
            <TabsContent value="logs">
              <AuditLogsTable logs={logs} />
            </TabsContent>
            <TabsContent value="invites">
              <InviteHistoryTable invites={invites} />
            </TabsContent>
          </>
        )}
      </Tabs>

      <CreateAdminModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
        currentUserRole={profile?.role}
      />

      <AdminProfileViewModal 
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        admin={selectedAdmin}
      />

      <AdminEditModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        admin={selectedAdmin}
        onUpdate={handleUpdate}
        currentUserRole={profile?.role}
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

export default AdministrationManager;