"use client";

import React, { useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, X, Download, Image as ImageIcon, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useSettings } from '@/contexts/SettingsContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from '@/lib/utils';

interface SaleInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const SaleInvoiceModal = ({ isOpen, onClose, sale }: SaleInvoiceModalProps) => {
  const { settings } = useSettings();
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!sale) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Invoice_SAL_${sale.receipt_no}.pdf`);
  };

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    
    const canvas = await html2canvas(receiptRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false
    });
    
    const link = document.createElement("a");
    link.download = `Invoice_SAL_${sale.receipt_no}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const customerName = sale.customer_name || sale.students?.full_name || 'Walk-in Customer';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-6 text-white flex justify-between items-center no-print">
          <h2 className="text-xl font-black uppercase tracking-tight">Invoice Viewer</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-16 bg-white overflow-y-auto max-h-[80vh]" id="receipt-content">
          <div ref={receiptRef} className="bg-white p-8 md:p-12 border-2 border-slate-100 rounded-[2rem] space-y-12">
            
            {/* Professional Header */}
            <div className="text-center space-y-6">
              {settings?.logo_url && (
                <img 
                  src={settings.logo_url} 
                  alt="KYK Academy" 
                  className="h-24 w-auto mx-auto object-contain"
                />
              )}
              <div className="space-y-1">
                <h1 className="text-4xl font-black text-[#0F4C81] tracking-tighter uppercase leading-none">
                  KYK BADMINTON ACADEMY
                </h1>
                <p className="text-[#FFC107] font-black uppercase tracking-[0.4em] text-xs">
                  SMASH YOUR LIMITS
                </p>
              </div>
            </div>

            <div className="h-[2px] bg-[#0F4C81]/10 w-full" />

            {/* Info Row */}
            <div className="flex flex-col md:flex-row justify-between gap-8 text-sm">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bill To</p>
                  <p className="text-2xl font-black text-[#0F4C81] uppercase">{customerName}</p>
                  {sale.students?.student_id_serial && (
                    <p className="font-bold text-slate-500">ID: #{sale.students?.student_id_serial}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Payment Mode</p>
                  <p className="font-black text-[#0F4C81] uppercase">{sale.payment_mode}</p>
                </div>
              </div>
              
              <div className="text-left md:text-right space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Invoice Number</p>
                  <p className="text-xl font-black text-[#0F4C81]">INV-SAL-{sale.receipt_no}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Billing Date</p>
                  <p className="font-black text-[#0F4C81] uppercase">{format(new Date(sale.created_at), 'dd/MM/yyyy')}</p>
                </div>
              </div>
            </div>

            {/* Invoice Body */}
            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4 border-b-2 border-[#0F4C81] pb-4 text-[10px] font-black uppercase tracking-widest text-[#0F4C81]">
                <div className="col-span-6">Item Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              
              <div className="space-y-4">
                {sale.sale_items?.map((item: any, i: number) => (
                  <div key={i} className="grid grid-cols-12 gap-4 text-sm font-bold text-slate-600">
                    <div className="col-span-6 font-black text-[#0F4C81]">{item.inventory?.name}</div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-2 text-right">{formatCurrency(item.unit_price)}</div>
                    <div className="col-span-2 text-right text-[#0F4C81]">{formatCurrency(item.subtotal)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="flex justify-end pt-8 border-t border-slate-100">
              <div className="w-full md:w-72 space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Tax Total</span>
                  <span>{formatCurrency(sale.tax_amount)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-red-400 uppercase">
                  <span>Discount Applied</span>
                  <span>-{formatCurrency(sale.discount_amount)}</span>
                </div>
                <div className="bg-[#0F4C81] text-white p-6 rounded-[1.5rem] shadow-xl shadow-[#0F4C81]/20 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black">{formatCurrency(sale.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-20 space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-400">Thank you for shopping with</p>
                <p className="text-lg font-black text-[#0F4C81] uppercase">KYK Badminton Academy</p>
              </div>
              <p className="text-[#FFC107] font-black uppercase tracking-[0.4em] text-[10px]">
                SMASH YOUR LIMITS
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 gap-4 no-print flex-col sm:flex-row">
          <Button 
            onClick={handlePrint} 
            variant="ghost"
            className="flex-1 h-14 rounded-2xl border-2 border-slate-200 text-slate-500 hover:bg-slate-100 font-black uppercase tracking-widest transition-all"
          >
            <Printer className="mr-2" size={18} /> Print
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white font-black uppercase tracking-widest transition-all"
          >
            <FileText className="mr-2" size={18} /> Download PDF
          </Button>
          <Button 
            onClick={handleDownloadImage} 
            className="flex-1 h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl transition-all"
          >
            <ImageIcon className="mr-2" size={18} /> Download Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaleInvoiceModal;