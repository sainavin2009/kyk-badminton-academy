"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Save, RefreshCw, BarChart3, Loader2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { HomepageStats } from '@/types/homepage';

const HomepageStatsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<HomepageStats | null>(null);
  const [originalStats, setStatsOriginal] = useState<HomepageStats | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('homepage_statistics')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;
      setStats(data);
      setStatsOriginal(data);
    } catch (err: any) {
      toast.error('Failed to load statistics: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async () => {
    if (!stats) return;
    try {
      setSaving(true);
      const { error } = await supabase
        .from('homepage_statistics')
        .update({
          coaches_number: stats.coaches_number,
          coaches_label: stats.coaches_label,
          courts_number: stats.courts_number,
          courts_label: stats.courts_label,
          members_number: stats.members_number,
          members_label: stats.members_label,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;
      toast.success('Homepage statistics updated successfully');
      setStatsOriginal({ ...stats });
    } catch (err: any) {
      toast.error('Update failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalStats) {
      setStats({ ...originalStats });
      toast.info('Changes discarded');
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-300">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-black uppercase text-[10px] tracking-widest">Loading stats configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Homepage Management</h2>
          <p className="text-slate-500 font-medium">Customize the key performance indicators shown to visitors.</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={fetchStats}
          className="h-14 w-14 rounded-2xl bg-white shadow-sm text-slate-400 hover:text-[#0F4C81]"
        >
          <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
        </Button>
      </div>

      <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-sm space-y-10 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <BarChart3 size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Homepage Statistics</h3>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Public Performance Metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coaches */}
          <div className="space-y-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coaches Count</Label>
                <Input 
                  value={stats?.coaches_number || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, coaches_number: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-black text-[#0F4C81]" 
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coaches Label</Label>
                <Input 
                  value={stats?.coaches_label || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, coaches_label: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-bold" 
                />
             </div>
          </div>

          {/* Courts */}
          <div className="space-y-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Courts Count</Label>
                <Input 
                  value={stats?.courts_number || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, courts_number: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-black text-[#0F4C81]" 
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Courts Label</Label>
                <Input 
                  value={stats?.courts_label || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, courts_label: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-bold" 
                />
             </div>
          </div>

          {/* Members */}
          <div className="space-y-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Members Count</Label>
                <Input 
                  value={stats?.members_number || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, members_number: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-black text-[#0F4C81]" 
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Members Label</Label>
                <Input 
                  value={stats?.members_label || ''} 
                  onChange={(e) => setStats(prev => prev ? { ...prev, members_label: e.target.value } : null)}
                  className="h-12 rounded-xl bg-white border-none font-bold" 
                />
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex items-center justify-end gap-4">
           <Button 
            variant="ghost"
            onClick={handleReset}
            disabled={saving}
            className="h-14 px-8 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2"
          >
            <Undo2 size={16} />
            Reset
          </Button>
           <Button 
            onClick={handleSave}
            disabled={saving}
            className="h-14 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all"
          >
            {saving ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomepageStatsManager;