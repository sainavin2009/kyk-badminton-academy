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
import { Label } from '@/components/ui/label';
import { Check, Package, DollarSign, Tag, Truck } from 'lucide-react';

const CATEGORIES = [
  "Badminton Racket",
  "Shuttle",
  "Grip",
  "Gloves",
  "Headband",
  "Wrist Band",
  "Socks",
  "Non-marking Shoes",
  "T-Shirts",
  "Accessories"
];

const inventorySchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  purchase_price: z.string().or(z.number()).transform(v => Number(v)),
  selling_price: z.string().or(z.number()).transform(v => Number(v)),
  quantity: z.string().or(z.number()).transform(v => Number(v)),
  min_stock: z.string().or(z.number()).transform(v => Number(v)),
  supplier: z.string().optional(),
  purchase_date: z.string().optional(),
  barcode: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  product?: any;
}

const InventoryForm = ({ isOpen, onClose, onSave, product }: InventoryFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
  });

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        name: '',
        category: 'Badminton Racket',
        purchase_price: 0,
        selling_price: 0,
        quantity: 0,
        min_stock: 5,
        supplier: '',
        purchase_date: new Date().toISOString().split('T')[0],
        barcode: '',
      });
    }
  }, [product, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Package className="text-[#FFC107]" size={32} />
              {product ? 'Update Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4 md:col-span-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name *</Label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input {...register('name')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" placeholder="e.g. Yonex Astrox 88D" />
                </div>
                {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
              <select 
                {...register('category')}
                className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107] outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Supplier</Label>
              <div className="relative">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <Input {...register('supplier')} className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purchase Price (₹)</Label>
              <Input type="number" step="0.01" {...register('purchase_price')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Selling Price (₹)</Label>
              <Input type="number" step="0.01" {...register('selling_price')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Initial Quantity</Label>
              <Input type="number" {...register('quantity')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Min. Stock Alert Level</Label>
              <Input type="number" {...register('min_stock')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purchase Date</Label>
              <Input type="date" {...register('purchase_date')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Barcode / SKU</Label>
              <Input {...register('barcode')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" placeholder="Future use..." />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
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
              {product ? 'Update Stock' : 'Add to Inventory'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;