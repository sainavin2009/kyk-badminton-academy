"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { ShoppingCart, Plus, Trash2, Check, DollarSign } from 'lucide-react';

const saleSchema = z.object({
  customer_id: z.string().min(1, "Customer selection is required"),
  payment_mode: z.string().min(1, "Payment mode is required"),
  discount_amount: z.string().or(z.number()).transform(v => Number(v)),
  tax_rate: z.string().or(z.number()).transform(v => Number(v)),
  items: z.array(z.object({
    product_id: z.string().min(1, "Product is required"),
    quantity: z.string().or(z.number()).transform(v => Number(v)),
    unit_price: z.number(),
  })).min(1, "At least one item is required")
});

type SaleFormValues = z.infer<typeof saleSchema>;

interface SaleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  students: any[];
  products: any[];
}

const SaleForm = ({ isOpen, onClose, onSave, students, products }: SaleFormProps) => {
  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<SaleFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      items: [{ product_id: '', quantity: 1, unit_price: 0 }],
      discount_amount: 0,
      tax_rate: 5,
      payment_mode: 'UPI'
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchedItems = watch('items');
  const watchedDiscount = watch('discount_amount') || 0;
  const watchedTaxRate = watch('tax_rate') || 0;

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sub = watchedItems.reduce((acc, item) => acc + (Number(item.quantity) * (item.unit_price || 0)), 0);
    const tax = (sub - watchedDiscount) * (watchedTaxRate / 100);
    setSubtotal(sub);
    setTotal(Math.max(0, sub - watchedDiscount + tax));
  }, [watchedItems, watchedDiscount, watchedTaxRate]);

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setValue(`items.${index}.unit_price`, product.selling_price);
    }
  };

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <ShoppingCart className="text-[#FFC107]" size={32} />
              Create Invoice
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-8 space-y-8 bg-white max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Customer (Student) *</Label>
              <select 
                {...register('customer_id')}
                className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81] focus:ring-2 focus:ring-[#FFC107]"
              >
                <option value="">Choose Customer...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (#{s.student_id_serial})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Mode</Label>
              <select 
                {...register('payment_mode')}
                className="w-full h-14 rounded-2xl bg-slate-50 border-none px-5 font-bold text-[#0F4C81]"
              >
                <option value="UPI">UPI / GPay</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Line Items</h3>
              <Button type="button" onClick={() => append({ product_id: '', quantity: 1, unit_price: 0 })} variant="ghost" className="text-[#FFC107] font-black text-xs uppercase">
                <Plus size={16} className="mr-1" /> Add Item
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-end animate-in slide-in-from-left-4 duration-300">
                <div className="col-span-5 space-y-2">
                  <Label className="text-[8px] font-black uppercase text-slate-400">Product</Label>
                  <select 
                    {...register(`items.${index}.product_id` as const)}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-xs"
                  >
                    <option value="">Select Product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id} disabled={p.quantity <= 0}>
                        {p.name} ({p.quantity} in stock)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-[8px] font-black uppercase text-slate-400">Qty</Label>
                  <Input 
                    type="number" 
                    {...register(`items.${index}.quantity` as const)} 
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-[8px] font-black uppercase text-slate-400">Price</Label>
                  <Input 
                    type="number" 
                    readOnly 
                    value={watchedItems[index]?.unit_price || 0}
                    className="h-12 rounded-xl bg-slate-100 border-none font-bold text-slate-400" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-[8px] font-black uppercase text-slate-400">Subtotal</Label>
                  <div className="h-12 flex items-center px-2 font-black text-[#0F4C81]">
                    ${(Number(watchedItems[index]?.quantity || 0) * (watchedItems[index]?.unit_price || 0)).toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1 pb-1">
                  <Button type="button" onClick={() => remove(index)} variant="ghost" className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-50">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Discount Amount ($)</Label>
                <Input type="number" {...register('discount_amount')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tax Rate (%)</Label>
                <Input type="number" {...register('tax_rate')} className="h-14 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </div>

            <div className="bg-[#0F4C81]/5 rounded-[2rem] p-8 space-y-4">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-red-500">
                <span>Discount</span>
                <span>-${Number(watchedDiscount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0F4C81]">
                <span>Tax ({watchedTaxRate}%)</span>
                <span>${((subtotal - watchedDiscount) * (watchedTaxRate / 100)).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-[#0F4C81]/10 flex justify-between items-center">
                <span className="text-xl font-black text-[#0F4C81] uppercase tracking-tighter">Grand Total</span>
                <span className="text-3xl font-black text-[#0F4C81]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-6 flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-bold text-slate-400">
              Cancel
            </Button>
            <Button type="submit" className="rounded-2xl h-14 px-12 bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl shadow-[#0F4C81]/20">
              <Check className="mr-2" size={20} />
              Generate Invoice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaleForm;