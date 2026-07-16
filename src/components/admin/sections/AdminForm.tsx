"use client";

import React, { useEffect, useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { Check, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import ImageUpload from '../shared/ImageUpload';
import { validatePassword } from '@/utils/auth-validation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const adminSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  role: z.enum(['Super Admin', 'Admin', 'Staff']),
  status: z.enum(['Active', 'Inactive']),
  avatar_url: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface AdminFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  admin?: any;
}

const AdminForm = ({ isOpen, onClose, onSave, admin }: AdminFormProps) => {
  const { user: currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditingSelf = admin?.id === currentUser?.id;

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      role: 'Staff',
      status: 'Active',
      avatar_url: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password') || '';
  const { requirements, score, strength, color } = validatePassword(password);

  useEffect(() => {
    if (admin) {
      reset({
        ...admin,
        password: '',
        confirmPassword: ''
      });
    } else {
      reset({
        full_name: '',
        email: '',
        phone: '',
        role: 'Staff',
        status: 'Active',
        avatar_url: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [admin, isOpen, reset]);

  const onSubmit = async (data: AdminFormValues) => {
    if (!admin && (!data.password || data.password !== data.confirmPassword)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {admin ? 'Modify Administrator' : 'Provision Personnel'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <User size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Personal & Identity</h3>
                </div>
                
                <ImageUpload 
                  label="Profile Photo"
                  value={watch('avatar_url')}
                  onChange={(url) => setValue('avatar_url', url)}
                />

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name *</Label>
                  <Input {...register('full_name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="e.g. Michael Scott" />
                  {errors.full_name && <p className="text-red-500 text-[10px] font-bold">{errors.full_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email Address *</Label>
                  <Input {...register('email')} type="email" className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="admin@kykacademy.com" disabled={!!admin} />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Phone Number *</Label>
                  <Input {...register('phone')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" placeholder="+1 (234) 567-890" />
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <ShieldCheck size={18} className="text-[#0F4C81]" />
                  <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Access & Security</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Role</Label>
                    <select 
                      {...register('role')} 
                      disabled={isEditingSelf}
                      className={cn(
                        "w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm outline-none appearance-none",
                        isEditingSelf && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                    {isEditingSelf && <p className="text-[8px] font-bold text-amber-600 uppercase">You cannot change your own role.</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Status</Label>
                    <div className="flex items-center gap-3 h-12 bg-slate-50 px-4 rounded-xl">
                      <Switch 
                        disabled={isEditingSelf}
                        checked={watch('status') === 'Active'} 
                        onCheckedChange={(val) => setValue('status', val ? 'Active' : 'Inactive')} 
                      />
                      <span className={cn("text-xs font-black uppercase tracking-widest", watch('status') === 'Active' ? 'text-green-600' : 'text-red-500')}>
                        {watch('status')}
                      </span>
                    </div>
                  </div>
                </div>

                {!admin && (
                  <div className="space-y-6 animate-in slide-in-from-top-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Password</Label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          {...register('password')} 
                          className="h-12 rounded-xl bg-slate-50 border-none font-bold pr-12" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F4C81]">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={cn("flex-1 h-full rounded-full transition-all duration-500", i <= score ? color : "bg-slate-200")} />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {requirements.map((req, i) => (
                            <div key={i} className={cn("flex items-center gap-1.5 text-[8px] font-bold uppercase transition-colors", req.met ? "text-green-500" : "text-slate-300")}>
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
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2" size={20} />}
              {admin ? 'Update Permissions' : 'Forge Access Keys'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminForm;