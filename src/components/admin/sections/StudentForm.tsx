"use client";

import React, { useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Check, X, User, Phone, Mail, Calendar, MapPin, ClipboardList } from 'lucide-react';

const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  parent_name: z.string().min(2, "Parent name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.string().length(0)),
  dob: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  joining_date: z.string().optional(),
  program: z.string().optional(),
  batch: z.string().optional(),
  coach: z.string().optional(),
  emergency_contact: z.string().optional(),
  medical_notes: z.string().optional(),
  fee_status: z.string().default('Pending'),
  remarks: z.string().optional(),
  photo_url: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormValues) => void;
  student?: any;
}

const StudentForm = ({ isOpen, onClose, onSave, student }: StudentFormProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fee_status: 'Pending'
    }
  });

  useEffect(() => {
    if (student) {
      reset(student);
    } else {
      reset({
        name: '',
        parent_name: '',
        phone: '',
        whatsapp: '',
        email: '',
        dob: '',
        gender: 'Male',
        address: '',
        joining_date: new Date().toISOString().split('T')[0],
        program: 'Badminton',
        batch: 'Morning',
        coach: '',
        emergency_contact: '',
        medical_notes: '',
        fee_status: 'Pending',
        remarks: '',
      });
    }
  }, [student, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {student ? 'Edit Student Profile' : 'Register New Student'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-10 bg-white">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18} /></div>
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Personal Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name *</Label>
                <Input {...register('name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parent/Guardian Name *</Label>
                <Input {...register('parent_name')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                {errors.parent_name && <p className="text-red-500 text-[10px] font-bold">{errors.parent_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gender</Label>
                <select 
                  {...register('gender')}
                  className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date of Birth</Label>
                <Input type="date" {...register('dob')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo URL</Label>
                <Input {...register('photo_url')} placeholder="https://..." className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Phone size={18} /></div>
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number *</Label>
                <Input {...register('phone')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</Label>
                <Input {...register('whatsapp')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                <Input type="email" {...register('email')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Residential Address</Label>
                <Input {...register('address')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergency Contact</Label>
                <Input {...register('emergency_contact')} placeholder="Name - Phone" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
            </div>
          </div>

          {/* Academy Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ClipboardList size={18} /></div>
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Academy Enrollment</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Joining Date</Label>
                <Input type="date" {...register('joining_date')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Program</Label>
                <select 
                  {...register('program')}
                  className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm"
                >
                  <option value="Badminton Foundation">Badminton Foundation</option>
                  <option value="Elite Competitive">Elite Competitive</option>
                  <option value="Adult Performance">Adult Performance</option>
                  <option value="CrossFit Junior">CrossFit Junior</option>
                  <option value="CrossFit Adult">CrossFit Adult</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch</Label>
                <Input {...register('batch')} placeholder="e.g. 6:00 AM - 8:00 AM" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Coach</Label>
                <Input {...register('coach')} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fee Status</Label>
                <select 
                  {...register('fee_status')}
                  className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Medical Notes</Label>
              <Textarea {...register('medical_notes')} className="min-h-[100px] rounded-2xl bg-slate-50 border-none font-bold p-4" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Internal Remarks</Label>
              <Textarea {...register('remarks')} className="min-h-[100px] rounded-2xl bg-slate-50 border-none font-bold p-4" />
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-red-500"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20 transition-all"
            >
              <Check className="mr-2" size={20} />
              {student ? 'Update Student' : 'Enroll Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;