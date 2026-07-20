"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';
import { Button } from '@/components/ui/button';
import { PackagePlus, RefreshCw, AlertCircle, Archive, ShoppingCart, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const InventoryManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('name');

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error('Failed to load inventory: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Product removed from inventory');
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (selectedProduct) {
        const { data, error } = await supabase
          .from('inventory')
          .update(formData)
          .eq('id', selectedProduct.id)
          .select();

        if (error) throw error;
        toast.success('Product details updated');
        setItems(prev => prev.map(i => i.id === selectedProduct.id ? data[0] : i));
      } else {
        const { data, error } = await supabase
          .from('inventory')
          .insert([formData])
          .select();

        if (error) throw error;
        toast.success('New product added to inventory');
        setItems(prev => [...prev, data[0]]);
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error('Operation failed: ' + error.message);
    }
  };

  const lowStockCount = items.filter(i => i.quantity <= i.min_stock).length;
  const totalValue = items.reduce((acc, i) => acc + (i.purchase_price * i.quantity), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Inventory Management</h2>
          <p className="text-slate-500 font-medium">Control stock levels, pricing, and supplier records for pro equipment.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={fetchInventory}
            className="h-16 w-16 rounded-2xl text-slate-400 hover:text-[#0F4C81] hover:bg-white shadow-sm"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <Button 
            onClick={handleAdd}
            className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group"
          >
            <PackagePlus className="mr-3 group-hover:scale-110 transition-transform" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Archive size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Products</p>
            <h3 className="text-3xl font-black text-[#0F4C81]">{items.length}</h3>
          </div>
        </Card>
        
        <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Low Stock Alerts</p>
            <h3 className="text-3xl font-black text-amber-600">{lowStockCount}</h3>
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] bg-[#0F4C81] text-white border-none shadow-xl flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FFC107] flex items-center justify-center">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">Inventory Value</p>
            <h3 className="text-3xl font-black">{formatCurrency(totalValue)}</h3>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
          <RefreshCw className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Scanning Inventory Database...</p>
        </div>
      ) : (
        <InventoryTable 
          items={items} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* Form Modal */}
      <InventoryForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </div>
  );
};

export default InventoryManager;