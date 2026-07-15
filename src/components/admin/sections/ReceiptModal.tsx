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
import { Trophy, Printer, Download, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const ReceiptModal = ({ isOpen, onClose, payment }: ReceiptModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Receipt_${payment.receipt_no}.pdf`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#0F4C81] p-6 text-white flex justify-between items-center no-print">
          <DialogTitle className="text-xl font-black uppercase tracking-tight">Payment Receipt</DialogTitle>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-12 bg-white" ref={receiptRef}>
          {/* Receipt Content */}
          <div className="border-4 border-[#0F4C81] p-10 space-y-10 relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-12">
              <Trophy size={400} />
            </div>

            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl">
                  <Trophy size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-[#0F4C81] uppercase leading-none">KYK Academy</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">Elite Training Center</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-black text-[#0F4C81] uppercase tracking-tighter">RECEIPT</h2>
                <p className="text-[10px] font-bold text-slate-400">NO: #{payment.receipt_no}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Student Details</p>
                  <p className="font-black text-[#0F4C81] text-lg uppercase">{payment.students?.name}</p>
                  <p className="font-bold text-slate-500">ID: #{payment.students?.student_id_serial}</p>
                  <p className="font-medium text-slate-400">{payment.students?.phone}</p>
                </div>
              </div>
              <div className="text-right space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Date Issued</p>
                  <p className="font-black text-[#0F4C81]">{format(new Date(payment.created_at), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Payment Method</p>
                  <p className="font-black text-[#0F4C81] uppercase">{payment.payment_method}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-black text-[#0F4C81] uppercase">{payment.payment_type} Fee</p>
                  {payment.billing_month && (
                    <p className="text-xs font-bold text-slate-400">Month: {format(new Date(payment.billing_month), 'MMMM yyyy')}</p>
                  )}
                </div>
                <p className="text-xl font-black text-[#0F4C81]">${payment.amount}</p>
              </div>
            </div>

            <div className="flex justify-between items-end pt-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 italic">"Engineering Excellence since 2014"</p>
                <p className="text-[9px] font-bold text-slate-300">Authorized Digital Signature</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Total Amount Paid</p>
                <div className="bg-[#0F4C81] text-white px-8 py-3 rounded-2xl">
                  <span className="text-2xl font-black">${payment.amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 gap-4 no-print">
          <Button 
            onClick={handleDownloadPDF}
            className="flex-1 h-14 rounded-2xl bg-white text-[#0F4C81] hover:bg-slate-100 border border-slate-200 font-bold uppercase tracking-widest text-xs"
          >
            <Download className="mr-2" size={16} />
            Download PDF
          </Button>
          <Button 
            onClick={handlePrint}
            className="flex-1 h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0F4C81]/20"
          >
            <Printer className="mr-2" size={16} />
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;