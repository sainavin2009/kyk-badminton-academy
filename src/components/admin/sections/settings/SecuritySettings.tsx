"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { ShieldCheck, Lock, Eye, EyeOff, Key } from 'lucide-react';
import { toast } from 'sonner';

const SecuritySettings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("Passwords do not match or are empty");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      toast.success("Admin password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-sm space-y-10 bg-white max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
            <Lock size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Access Security</h3>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Manage administrative credentials</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Admin Password</Label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <Input 
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-14 pl-12 pr-12 rounded-2xl bg-slate-50 border-none font-bold" 
                placeholder="••••••••"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F4C81]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</Label>
            <Input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
           <p className="text-[9px] font-medium text-slate-400 max-w-[200px]">
              Strong passwords include mixed cases, numbers, and special symbols.
           </p>
           <Button 
            onClick={handleUpdatePassword}
            disabled={loading || !newPassword}
            className="h-14 px-8 rounded-2xl bg-red-500 text-white hover:bg-red-600 font-black uppercase tracking-widest shadow-xl shadow-red-500/20"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySettings;