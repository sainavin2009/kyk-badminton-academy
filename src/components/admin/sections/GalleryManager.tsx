"use client";

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  Play, 
  ArrowUpDown,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import GalleryItemCard from './GalleryItemCard';
import MediaModal from './MediaModal';
import { toast } from 'sonner';

interface GalleryManagerProps {
  title: string;
  type: 'badminton' | 'crossfit';
}

const INITIAL_ITEMS = [
  { id: '1', title: 'Elite Deadlift', description: 'Form check for heavy lifting', type: 'video' as const, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
  { id: '2', title: 'WOD Session', description: 'Group intensity at its peak', type: 'image' as const, url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
  { id: '3', title: 'Ring Muscle Ups', description: 'Advanced gymnastics work', type: 'image' as const, url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800' },
  { id: '4', title: 'Kettlebell Flow', description: 'Functional strength routines', type: 'video' as const, url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800' },
];

const GalleryManager = ({ title, type }: GalleryManagerProps) => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [isReordering, setIsReordering] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'image' | 'video'>('image');
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success('Media asset deleted successfully');
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

  const handleSaveItem = (savedItem: any) => {
    if (editingItem) {
      setItems(prev => prev.map(item => item.id === savedItem.id ? savedItem : item));
    } else {
      setItems(prev => [savedItem, ...prev]);
    }
  };

  const handleReorder = (newItems: any[]) => {
    setItems(newItems);
    if (!isReordering) {
      setIsReordering(true);
      setTimeout(() => setIsReordering(false), 1500);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{title} Gallery</h2>
            {isReordering && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-black uppercase animate-bounce">
                <CheckCircle2 size={12} /> Order Saved
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium">Manage your {title.toLowerCase()} media assets. Drag to reorder.</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group">
              <Plus className="mr-2 group-hover:rotate-90 transition-transform" />
              Add Media
              <ChevronDown className="ml-2 w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl p-2 w-56">
            <DropdownMenuItem onClick={() => handleAdd('image')} className="rounded-xl h-12 font-bold flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ImageIcon size={16} /></div>
              Upload Photo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAdd('video')} className="rounded-xl h-12 font-bold flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Play size={16} /></div>
              Upload Video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107] transition-all" 
            placeholder="Search by title or description..." 
          />
        </div>
        
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-16 px-6 rounded-2xl bg-white border-none shadow-sm text-slate-500 font-black uppercase tracking-widest hover:text-[#0F4C81] transition-all">
                <Filter className="mr-2" size={18} />
                Type: {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl p-2 w-48">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Filter Content</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('all')} className="rounded-xl h-10 font-bold cursor-pointer">Show All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('image')} className="rounded-xl h-10 font-bold flex items-center gap-2 cursor-pointer">
                <ImageIcon size={14} /> Images
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('video')} className="rounded-xl h-10 font-bold flex items-center gap-2 cursor-pointer">
                <Play size={14} /> Videos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="h-16 px-6 rounded-2xl bg-white border-none shadow-sm text-slate-500 font-black uppercase tracking-widest hover:text-[#0F4C81] transition-all">
            <ArrowUpDown className="mr-2" size={18} />
            Bulk Actions
          </Button>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <Reorder.Group 
          axis="y" 
          values={items} 
          onReorder={handleReorder}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredItems.map((item) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className="list-none"
            >
              <GalleryItemCard 
                item={item} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="py-32 text-center space-y-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 shadow-sm">
            <Search size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">No assets match your search</h3>
            <p className="text-slate-400 font-medium">Try different keywords or check your filters.</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => { setSearch(''); setFilter('all'); }}
            className="text-[#0F4C81] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:bg-transparent"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Unified Media Modal */}
      <MediaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
        type={modalMode}
      />
    </div>
  );
};

export default GalleryManager;