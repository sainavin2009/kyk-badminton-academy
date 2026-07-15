"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/admin');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F4C81] px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
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

          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance<dyad-write path="src/pages/AdminLogin.tsx" description="Fixing TypeScript radii property names in AdminLogin theme configuration and completing the file">
"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/admin');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F4C81] px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
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

          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0F4C81',
                    brandAccent: '#FFC107',
                    inputBackground: '#F8FAFC',
                    inputText: '#0F4C81',
                    inputPlaceholder: '#94A3B8',
                  },
                  radii: {
                    buttonBorderRadius: '1rem',
                    inputBorderRadius: '1rem',
                    containerBorderRadius: '1.5rem',
                  },
                },
              },
              className: {
                button: 'font-black uppercase tracking-widest py-4 transition-all hover:scale-[1.02] active:scale-[0.98]',
                label: 'text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2',
                input: 'border-none bg-slate-50 h-14 px-5 font-bold shadow-inner',
              }
            }}
            theme="light"
          />
          
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