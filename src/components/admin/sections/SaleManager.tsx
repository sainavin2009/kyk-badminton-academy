"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Search, 
  RefreshCw, 
  FileText,
  DollarSign,
  Package,
  Plus
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import SaleForm from './SaleForm';
import SaleInvoiceModal from './SaleInvoiceModal';
import { formatCurrency } from '@/lib/utils';

const SaleManager = () => {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: saleData, error: saleError } = await supabase
        .from('sales')
        .select(`
          *,
          students (id, full_name, student_id),
          sale_items (
            *,
            inventory (id, name)
          )
        `)
        .order('created_at', { ascending: false });

      if (saleError) throw saleError;
      setSales(saleData || []);

      const { data: invData } = await supabase.from('inventory').select('*').order('name');
      setProducts(invData || []);
    } catch (error: any) {
      toast.error('Sync failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSale = async (formData: any) => {
    try {
      const { items, discount_amount, tax_rate, customer_name, payment_mode } = formData;
      
      const subtotal = items.reduce((acc: number, item: any) => acc + (item.quantity * item.unit_price), 0);
      const tax_amount = (subtotal - discount_amount) * (tax_rate / 100);
      const total_amount = subtotal - discount_amount + tax_amount;

      if (!customer_name) {
        throw new Error("Customer name is required for generation.");
      }

      const { data: saleHead, error: saleError } = await supabase
        .from('sales')
        .insert([{
          customer_name: customer_name,
          payment_mode: payment_mode,
          discount_amount: discount_amount,
          tax_amount: tax_amount,
          total_amount: total_amount
        }])
        .select()
        .single();

      if (saleError) throw saleError;

      const saleItems = items.map((item: any) => ({
        sale_id: saleHead.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.quantity * item.unit_price
      }));

      const { error: itemsError } = await supabase.from('sale_items').insert(saleItems);
      if (itemsError) throw itemsError;

      toast.success('✅ Sale recorded successfully.');
      setIsSaleModalOpen(false);
      
      const { data: fullSale } = await supabase
        .from('sales')
        .select(`
          *,
          students (id, full_name, student_id),
          sale_items (
            *,
            inventory (id, name)
          )
        `)
        .eq('id', saleHead.id)
        .single();
      
      setSelectedSale(fullSale);
      setIsInvoiceModalOpen(true);
      fetchData(); 
    } catch (error: any) {
      toast.error('Sale failed: ' + error.message);
    }
  };

  const filteredSales = sales.filter(s => 
    (s.customer_name || s.students?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.receipt_no?.toString().includes(searchTerm)
  );

  const totalSalesVal = sales.reduce((acc, s) => acc + Number(s.total_amount), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Equipment Sales</h2>
          <p className="text-slate-500 font-medium">Generate invoices and track inventory movements.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchData} className="h-16 w-16 rounded-2xl text-slate-400">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={() => setIsSaleModalOpen(true)}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest shadow-xl"
          >
            <Plus className="mr-3" /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC107]">Total Revenue</p>
              <h3 className="text-4xl font-black tracking-tighter">{formatCurrency(totalSalesVal)}</h3>
            </div>
            <span className="text-white/20 text-5xl font-black">₹</span>
          </div>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingCart size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Transactions</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{sales.length}</h3>
          </div>
        </Card>
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <Package size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Items</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{products.length}</h3>
          </div>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 h-16 rounded-2xl border-none bg-slate-50 font-bold focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
            placeholder="Search invoice or customer..." 
          />
        </div>

        <div className="rounded-[2.5rem] overflow-hidden border border-slate-50">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="pl-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Invoice</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Customer</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Items</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Method</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Total</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="h-64 text-center text-slate-300">Loading...</TableCell></TableRow>
              ) : filteredSales.length > 0 ? (
                filteredSales.map((s) => (
                  <TableRow key={s.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-8 py-6 font-black text-[#0F4C81]">#SAL-{s.receipt_no}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F4C81]">{s.customer_name || s.students?.full_name || 'Walk-in Customer'}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{format(new Date(s.created_at), 'MMM dd, yyyy')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-slate-500">{s.sale_items?.length} products</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 px-2 py-1 rounded text-slate-500">{s.payment_mode}</span>
                    </TableCell>
                    <TableCell className="text-lg font-black text-[#0F4C81]">{formatCurrency(s.total_amount)}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Button 
                        onClick={() => { setSelectedSale(s); setIsInvoiceModalOpen(true); }}
                        variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-[#FFC107]/10"
                      >
                        <FileText size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="h-64 text-center text-slate-300 uppercase text-[10px] font-black tracking-widest">No sales records.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <SaleForm 
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        onSave={handleCreateSale}
        products={products}
      />

      <SaleInvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        sale={selectedSale}
      />
    </div>
  );
};

export default SaleManager;