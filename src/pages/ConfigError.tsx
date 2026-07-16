"use client";

import React from 'react';
import { AlertTriangle, Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfigError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F4C81] px-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={40} />
        </div>

        <h1 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter mb-4">Configuration Required</h1>
        
        <p className="text-slate-500 font-medium leading-relaxed mb-8">
          The Supabase environment variables are missing. Please configure your <code className="bg-slate-100 px-2 py-0.5 rounded text-red-600 font-bold">.env</code> file with:
        </p>

        <div className="text-left space-y-4 mb-10">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Variable 1</p>
            <p className="font-mono text-xs font-bold text-[#0F4C81]">VITE_SUPABASE_URL</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Variable 2</p>
            <p className="font-mono text-xs font-bold text-[#0F4C81]">VITE_SUPABASE_ANON_KEY</p>
          </div>
        </div>

        <Button 
          onClick={() => window.location.reload()}
          className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white font-black uppercase tracking-widest shadow-xl"
        >
          <Settings className="mr-2" size={18} />
          Retry Connection
        </Button>
      </div>
    </div>
  );
};

export default ConfigError;