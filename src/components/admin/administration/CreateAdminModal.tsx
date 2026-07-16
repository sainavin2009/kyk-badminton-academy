"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { 
  Check, 
  UserPlus, 
  Mail, 
  Phone, 
  Shield, 
  Key, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Loader2
} from 'lucide-react';
import { validatePassword } from '@/utils/auth-validation';
import { cn } from '@/lib/utils';
import { AdminRole } from '@/types/administration';
import ImageUpload from '../shared/ImageUpload';

const adminSchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  role: z.enum(['Super Admin', 'Admin', 'Reception', 'Coach', 'Accountant', 'Staff']),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  avatar_url: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: AdminFormValues) => Promise<void>;
  currentUserRole: string;
}

const CreateAdminModal = ({ isOpen, onClose, onInvite, currentUserRole }: CreateAdminModalProps) => {
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      role: 'Staff'
    }
  });

  const password = watch('password') || '';
  const { score, color, requirements } = validatePassword(password);

  const roles: AdminRole[] = ['Super Admin', 'Admin', 'Reception', 'Coach', 'Accountant', 'Staff'];
  
  const allowedRoles = roles.filter(role => {
    if (currentUserRole === 'Super Admin') return true;
    if (currentUserRole === 'Admin') {
      return !['Super Admin', 'Admin'].includes(role);
    }
    return false;
  });

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < 16; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setValue('password', retVal);
    setValue('confirmPassword', retVal);
  };

  const onSubmit = async (data: AdminFormValues) => {
    setIsSubmitting(true);
    try {
      await onInvite(data);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-20">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <UserPlus className="text-[#FFC107]" size={32} />
              Provision Administrator
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Shield size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Identify & Access</h3>
                </div>

                <ImageUpload 
                  label="Profile Identity Photo"
                  value={watch('avatar_url')}
                  onChange={(url) => setValue('avatar_url', url)}
                />

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name</Label>
                  <Input {...register('full_name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Richard Hendricks" />
                  {errors.full_name && <p className="text-red-500 text-[10px] font-bold">{errors.full_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email Address</Label>
                  <Input {...register('email')} type="email" className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="admin@kykacademy.com" />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Role</Label>
                  <select 
                    {...register('role')} 
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm outline-none appearance-none"
                  >
                    {allowedRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Key size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Security Credentials</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Initial Password</Label>
                    <button type="button" onClick={generatePassword} className="text-[10px] font-black uppercase text-[#0F4C81] hover:text-[#FFC107] flex items-center gap-1">
                      <RefreshCw size={10} /> Generate
                    </button>
                  </div>
                  <div className="relative">
                    <Input 
                      type={showPass ? "text" : "password"} 
                      {...register('password')} 
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold pr-12" 
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F4C81]">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={cn("flex-1 h-full rounded-full transition-all duration-500", i <= score ? color : "bg-slate-200")} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-1">
                      {requirements.map((req, i) => (
                        <div key={i} className={cn("flex items-center gap-1.5 text-[8px] font-bold uppercase", req.met ? "text-green-500" : "text-slate-300")}>
                          <Check size={8} strokeWidth={4} /> {req.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</Label>
                  <Input type="password" {...register('confirmPassword')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                  {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold">{errors.confirmPassword.message}</p>}
                </div>

                <div className="space-y-2 pt-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone for 2FA/Recovery</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <Input {...register('phone')} className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold" placeholder="+1..." />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Mail className="mr-2" size={20} />}
              Send Invitation Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminModal;