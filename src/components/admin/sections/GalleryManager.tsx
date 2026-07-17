"use client";

import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  Play, 
  ChevronDown,
  Loader2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GalleryItemCard from './GalleryItemCard';
import MediaModal from '../modals/MediaModal';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface GalleryManagerProps {
  category: 'Badminton' | 'CrossFit';
}

const GalleryManager = ({ category }: GalleryManagerProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isReordering, setIsReordering] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'image' | 'video'>('image');
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('category', category)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error('Failed to load gallery: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Media asset removed');
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setModalMode(item.type);
    setIsModalOpen(true);
  };

  const handleAdd = (mode: 'image' | 'video') => {
    setEditingItem(null);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (savedItem: any) => {
    try {
      if (savedItem.id) {
        const { data, error } = await supabase
          .from('gallery_items')
          .update(savedItem)
          .eq('id', savedItem.id)
          .select();
        
        if (error) throw error;
        setItems(prev => prev.map(item => item.id === savedItem.id ? data[0] : item));
      } else {
        const { data, error } = await supabase
          .from('gallery_items')
          .insert([{ ...savedItem, order_index: items.length }])
          .select();
        
        if (error) throw error;
        setItems(prev => [...prev, data[0]]);
      }
    } catch (error: any) {
      toast.error('Operation failed: ' + error.message);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    setItems(newItems);
    setIsReordering(true);
    
    try {
      const updates = newItems.map((item, index) => ({
        id: item.id,
        order_index: index,
        title: item.title,
        url: item.url,
        type: item.type,
        category: category
      }));

      const { error } = await supabase.from('gallery_items').upsert(updates);
      if (error) throw error;
      setTimeout(() => setIsReordering(false), 1500);
    } catch (error: any) {
      console.error('Reorder update failed:', error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{category} Media Manager</h2>
            {isReordering && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-black uppercase animate-pulse">
                <CheckCircle2 size={12} /> Syncing Order
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium">Manage visuals for the {category.toLowerCase()} section.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={fetchItems} className="h-16 w-16 rounded-2xl text-slate-400">
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20">
                <Plus className="mr-2" />
                Upload Media
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl p-2 w-56">
              <DropdownMenuItem onClick={() => handleAdd('image')} className="rounded-xl h-12 font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ImageIcon size={16} /></div>
                Photo Asset
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAdd('video')} className="rounded-xl h-12 font-bold flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Play size={16} /></div>
                Video Asset
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder={`Search ${category.toLowerCase()} assets...`} 
        />
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-300">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black uppercase text-[10px] tracking-widest">Loading Media Vault...</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <Reorder.Group 
          axis="y" 
          values={items} 
          onReorder={handleReorder}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredItems.map((item) => (
            <Reorder.Item key={item.id} value={item} className="list-none">
              <GalleryItemCard item={item} onDelete={handleDelete} onEdit={handleEdit} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <h3 className="text-2xl font-black text-[#0F4C81] uppercase">No {category} Media</h3>
          <p className="text-slate-400 font-medium mt-2">Upload professional assets to showcase {category.toLowerCase()} training.</p>
        </div>
      )}

      <MediaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
        type={modalMode}
        fixedCategory={category}
      />
    </div>
  );
};

export default GalleryManager;