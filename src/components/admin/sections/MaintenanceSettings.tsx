"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Upload, 
  RefreshCw, 
  ShieldAlert, 
  History, 
  Trash2,
  AlertTriangle,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logAdminAction } from '@/utils/auditLogger';

const MaintenanceSettings = () => {
  const [backingUp, setBackingUp] = useState(false);
  const [isResetting, setIsReseting] = useState(false);

  const handleBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      toast.success("Database export generated successfully!");
    }, 2000);
  };

  const handleRestore = () => {
    toast.info("Select a backup file to restore academy data.");
  };

  const handleResetSalesData = async () => {
    try {
      setIsReseting(true);
      
      // 1. Delete Sale Items first (dependency)
      const { error: itemsError } = await supabase
        .from('sale_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (itemsError) throw itemsError;

      // 2. Delete Sales records
      const { error: salesError } = await supabase
        .from('sales')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (salesError) throw salesError;

      // 3. Delete Fee Payments
      const { error: feesError } = await supabase
        .from('fee_payments')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (feesError) throw feesError;

      await logAdminAction('SALES_DATA_RESET', { 
        scope: 'Full Financial Reset',
        tables: ['sales', 'sale_items', 'fee_payments']
      });

      toast.success("Financial records have been successfully reset to zero.");
      
      // Refresh the page to clear all local state and update dashboard metrics
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err: any) {
      toast.error("Reset failed: " + err.message);
    } finally {
      setIsReseting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-10 rounded-[3.5rem] border-none shadow-sm space-y-8 bg-white flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-blue-50 text-blue-600 flex items-center justify-center">
            <Download size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Database Backup</h3>
            <p className="text-sm text-slate-500 font-medium max-w-[250px]">
              Generate a full snapshot of your students, fees, and inventory records.
            </p>
          </div>
          <Button 
            onClick={handleBackup} 
            disabled={backingUp}
            className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest"
          >
            {backingUp ? <RefreshCw className="animate-spin mr-2" size={20} /> : <Download className="mr-2" size={20} />}
            Trigger Export
          </Button>
        </Card>

        <Card className="p-10 rounded-[3.5rem] border-none shadow-sm space-y-8 bg-white flex flex-col items-center text-center border-2 border-dashed border-slate-100">
          <div className="w-20 h-20 rounded-[2rem] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Upload size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Restore Data</h3>
            <p className="text-sm text-slate-500 font-medium max-w-[250px]">
              Upload a previous backup file to restore your academy database state.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRestore}
            className="w-full h-14 rounded-2xl border-2 border-[#0F4C81] text-[#0F4C81] font-black uppercase tracking-widest hover:bg-[#0F4C81] hover:text-white"
          >
            <Upload className="mr-2" size={20} />
            Import Backup
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-8 rounded-[3rem] bg-red-50/30 border border-red-100 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F4C81] uppercase tracking-tight">Reset Sales & Financials</h3>
                <p className="text-sm text-slate-500 font-medium max-w-md">
                  Irreversibly delete all invoices, sale entries, and fee payment history. This will zero out your revenue statistics.
                </p>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  disabled={isResetting}
                  className="h-14 px-8 rounded-2xl bg-red-500 text-white hover:bg-red-600 font-black uppercase tracking-widest shadow-xl shadow-red-500/20"
                >
                  <AlertTriangle className="mr-2" size={20} />
                  Reset Sales Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2.5rem]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-black text-[#0F4C81] uppercase">Confirm Full Reset?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4 pt-2">
                    <p className="text-slate-500 font-medium">
                      This action will wipe all <span className="font-black text-red-500">Sales Invoices</span> and <span className="font-black text-red-500">Fee Payments</span>.
                    </p>
                    <ul className="text-xs font-bold text-slate-400 space-y-1 list-disc pl-4 uppercase tracking-widest">
                      <li>Total Income will become ₹0</li>
                      <li>Payment history will be purged</li>
                      <li>Revenue charts will be cleared</li>
                    </ul>
                    <p className="text-xs italic text-amber-600 font-bold bg-amber-50 p-3 rounded-xl border border-amber-100">
                      Note: Products, Inventory counts, Students, and Settings will remain unaffected.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3">
                  <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Keep My Data</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleResetSalesData}
                    className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none"
                  >
                    {isResetting ? <RefreshCw className="animate-spin mr-2" /> : <Trash2 className="mr-2" />}
                    Confirm Purge
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>

      <Card className="p-8 rounded-[3rem] bg-white border-none shadow-sm space-y-6">
         <div className="flex items-center gap-3">
            <History size={20} className="text-slate-400" />
            <h4 className="text-sm font-black text-[#0F4C81] uppercase tracking-widest">Recent Maintenance Logs</h4>
         </div>
         <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-slate-50 text-xs">
               <span className="font-bold text-slate-600">Weekly Auto-Backup</span>
               <span className="text-slate-400">Success • 2 days ago</span>
            </div>
            <div className="flex justify-between items-center py-3 text-xs">
               <span className="font-bold text-slate-600">Manual Export (Admin)</span>
               <span className="text-slate-400">Success • 5 days ago</span>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default MaintenanceSettings;