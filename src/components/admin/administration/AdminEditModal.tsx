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
import { 
  Check, 
  Shield, 
  ShieldAlert,
  Loader2,
  TrendingUp,
  User
} from 'lucide-react';
import { AdminRole, AdminProfile } from '@/types/administration';
import { toast } from 'sonner';

const editSchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  role: z.enum(['Super Admin', 'Admin', 'Reception', 'Coach', 'Accountant', 'Staff']),
});

type EditFormValues = z.infer<typeof editSchema>;

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: EditFormValues) => Promise<void>;
  admin: AdminProfile | null;
  currentUserRole: string;
}

const AdminEditModal = ({ isOpen, onClose, onUpdate, admin, currentUserRole }: AdminEditModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema)
  });

  useEffect(() => {
    if (admin) {
      reset({
        full_name: admin.full_name,
        phone: admin.phone,
        role: admin.role
      });
    }
  }, [admin, reset]);

  const roles: AdminRole[] = ['Super Admin', 'Admin', 'Reception', 'Coach', 'Accountant', 'Staff'];
  
  // Promotion logic
  const getAvailableRoles = () => {
    if (currentUserRole !== 'Super Admin') {
      return [admin?.role || 'Staff']; // Non-super-admins can't change roles
    }
    return roles; // Super Admin can assign anything
  };

  const onSubmit = async (data: EditFormValues) => {
    setIsSubmitting(true);
    try {
      await onUpdate(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Shield className="text-[#FFC107]" />
              Modify Clearance
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</Label>
              <Input {...register('full_name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Role / Clearance</Label>
              <div className="relative">
                <select 
                  {...register('role')} 
                  disabled={currentUserRole !== 'Super Admin'}
                  className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-black uppercase text-[10px] tracking-widest text-[#0F4C81] outline-none appearance-none disabled:opacity-50"
                >
                  {getAvailableRoles().map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {currentUserRole === 'Super Admin' && (
                  <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFC107]" size={16} />
                )}
              </div>
              {currentUserRole !== 'Super Admin' && (
                <p className="text-[8px] font-bold text-amber-600 uppercase">Promotion restricted to Super Administrators.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergency Phone</Label>
              <Input {...register('phone')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-50 flex flex-col gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Update Clearance Tokens'}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} className="h-10 text-[10px] font-black uppercase text-slate-300">Abort Modification</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditModal;