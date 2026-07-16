"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, Loader2, Key } from 'lucide-react';
import { validatePassword } from '@/utils/auth-validation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: (password: string) => Promise<void>;
  adminName: string;
}

const ResetPasswordModal = ({ isOpen, onClose, onReset, adminName }: ResetPasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { requirements, score, strength, color, isValid } = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return toast.error("Password does not meet security requirements.");
    if (password !== confirm) return toast.error("Passwords do not match.");

    setLoading(true);
    try {
      await onReset(password);
      setPassword('');
      setConfirm('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Key className="text-[#FFC107]" />
              Reset Security Access
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
          <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
            You are changing the security credentials for <span className="text-[#0F4C81] font-black">{adminName}</span>. This change will be effective immediately.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Master Password</Label>
              <div className="relative">
                <Input 
                  type={show ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold pr-12" 
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-1 w-full bg-slate-100 rounded-full flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={cn("flex-1 h-full rounded-full", i <= score ? color : "bg-slate-200")} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-1">
                {requirements.map((req, i) => (
                  <div key={i} className={cn("flex items-center gap-1.5 text-[8px] font-bold uppercase", req.met ? "text-green-500" : "text-slate-300")}>
                    <div className={cn("w-1 h-1 rounded-full", req.met ? "bg-green-500" : "bg-slate-300")} /> {req.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Credentials</Label>
              <Input 
                type="password" 
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
              />
            </div>
          </div>

          <DialogFooter className="pt-6 flex flex-col gap-3">
            <Button type="submit" disabled={loading || !isValid} className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl">
              {loading ? <Loader2 className="animate-spin" /> : 'Update Password Key'}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} className="h-10 text-[10px] font-black uppercase text-slate-400">Cancel Operation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;