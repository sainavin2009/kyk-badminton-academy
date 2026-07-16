"use client";

import React, { useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Printer, X, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

interface SaleInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const SaleInvoiceModal = ({ isOpen, onClose, sale }: SaleInvoiceModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!sale) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-6 text-white flex justify-between items-center no-print">
          <DialogTitle className="text-xl font-black uppercase tracking-tight">Sales Invoice</DialogTitle>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-12 bg-white" id="receipt-content" ref={receiptRef}>
          <div className="border-4 border-[#0F4C81] p-10 space-y-8 relative">
            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl">
                  <Trophy size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-[#0F4C81] uppercase leading-none">KYK Academy</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">Pro Equipment Store</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter">INVOICE</h2>
                <p className="text-[10px] font-bold text-slate-400">INV: #SAL-{sale.receipt_no}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Bill To</p>
                <p className="font-black text-[#0F4C81] text-lg uppercase">{sale.students?.name}</p>
                <p className="font-bold text-slate-500">Student ID: #{sale.students?.student_id_serial}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Date</p>
                <p className="font-black text-[#0F4C81]">{format(new Date(sale.created_at), 'PPP')}</p>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4">Payment</p>
                <p className="font-black text-[#0F4C81] uppercase">{sale.payment_mode}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 border-b-2 border-slate-50 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="col-span-6">Item Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              {sale.sale_items?.map((item: any, i: number) => (
                <div key={i} className="grid grid-cols-12 gap-4 text-sm font-bold text-[#0F4C81]">
                  <div className="col-span-6">{item.inventory?.name}</div>
                  <div className="col-span-2 text-center">{item.quantity}</div>
                  <div className="col-span-2 text-right">${item.unit_price}</div>
                  <div className="col-span-2 text-right">${item.subtotal}</div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-slate-100 pt-8 flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Tax</span>
                  <span>${sale.tax_amount}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-red-400 uppercase">
                  <span>Discount</span>
                  <span>-${sale.discount_amount}</span>
                </div>
                <div className="flex justify-between items-center bg-[#0F4C81] text-white p-4 rounded-2xl">
                  <span className="text-[10px] font-black uppercase">Grand Total</span>
                  <span className="text-2xl font-black">${sale.total_amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 gap-4 no-print">
          <Button onClick={handlePrint} className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest">
            <Printer className="mr-2" size={16} /> Print Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaleInvoiceModal;