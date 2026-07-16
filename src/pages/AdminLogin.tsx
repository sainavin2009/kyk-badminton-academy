"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, ShieldCheck, Loader2, Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminLogin = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session && !loading) {
      navigate('/admin');
    }
  }, [session, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    } else {
      toast.success("Welcome back, administrator.");
      navigate('/admin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F4C81]">
        <Loader2 className="h-12 w-12 text-[#FFC107] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F4C81] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFC107] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-white/20 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-[#FFC107] rounded-3xl flex items-center justify-center text-[#0F4C81] mb-6 shadow-xl rotate-3">
              <Trophy size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase text-center leading-none">
              Admin <span className="text-[#FFC107]">Access</span>
            </h2>
            <div className="flex items-center gap-2 mt-3 text-slate-400">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Portal Login</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none bg-slate-50 h-14 pl-12 pr-5 font-bold shadow-inner rounded-2xl"
                  placeholder="admin@kykacademy.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-none bg-slate-50 h-14 pl-12 pr-5 font-bold shadow-inner rounded-2xl"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white font-black uppercase tracking-widest hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all shadow-xl"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In to Dashboard"}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] font-black text-[#0F4C81] uppercase tracking-[0.2em] hover:text-[#FFC107] transition-colors"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
          Restricted to KYK Academy Personnel Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;