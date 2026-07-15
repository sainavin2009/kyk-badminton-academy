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
  CheckCircle2
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
import { toast } from 'sonner';

interface GalleryManagerProps {
  title: string;
  type: 'badminton' | 'crossfit';
}

const INITIAL_ITEMS = [
  { id: '1', title: 'Power Smash', description: 'Elite technique demonstration', type: 'video' as const, url: '#', thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800' },
  { id: '2', title: 'Court Footwork', description: 'Speed drills for beginners', type: 'image' as const, url: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=800' },
  { id: '3', title: 'Tournament Day', description: 'Final match highlights', type: 'image' as const, url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800' },
  { id: '4', title: 'Junior Training', description: 'Building the foundation', type: 'video' as const, url: '#', thumbnail: 'https://images.unsplash.com/photo-1613912111169-58bc44933a0e?q=80&w=800' },
  { id: '5', title: 'Elite Smash', description: 'Max power demonstration', type: 'image' as const, url: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=800' },
  { id: '6', title: 'Warmup Routine', description: 'Preventing injuries', type: 'image' as const, url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800' },
];

const GalleryManager = ({ title, type }: GalleryManagerProps) => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [isReordering, setIsReordering] = useState(false);

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
    toast.info(`Editing: ${item.title} (Modal integration ready)`);
  };

  const handleReorder = (newItems: any[]) => {
    setItems(newItems);
    if (!isReordering) {
      setIsReordering(true);
      setTimeout(() => setIsReordering(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{title} Gallery</h2>
            {isReordering && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-black uppercase animate-bounce">
                <CheckCircle2 size={12} /> Saving Order
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium">Drag assets to reorder, or use controls to manage media.</p>
        </div>
        <Button className="h-16 px-10 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group">
          <Plus className="mr-2 group-hover:rotate-90 transition-transform" />
          Add Media Assets
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
            placeholder="Search by title or description..." 
          />
        </div>
        
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-16 px-6 rounded-2xl bg-white border-none shadow-sm text-slate-500 font-black uppercase tracking-widest hover:text-[#0F4C81]">
                <Filter className="mr-2" size={18} />
                Type: {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl p-2 w-48">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Filter Media</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('all')} className="rounded-xl h-10 font-bold">Show All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('image')} className="rounded-xl h-10 font-bold flex items-center gap-2">
                <ImageIcon size={14} /> Images Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('video')} className="rounded-xl h-10 font-bold flex items-center gap-2">
                <Play size={14} /> Videos Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="h-16 px-6 rounded-2xl bg-white border-none shadow-sm text-slate-500 font-black uppercase tracking-widest hover:text-[#0F4C81]">
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
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase tracking-tight">No assets found</h3>
            <p className="text-slate-400 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => { setSearch(''); setFilter('all'); }}
            className="text-[#0F4C81] font-black uppercase tracking-widest underline decoration-2 underline-offset-4"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;