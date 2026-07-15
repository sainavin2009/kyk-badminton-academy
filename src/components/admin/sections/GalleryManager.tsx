"use client";

import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Eye, 
  Image as ImageIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GalleryManagerProps {
  title: string;
  type: 'badminton' | 'crossfit';
}

const GalleryManager = ({ title, type }: GalleryManagerProps) => {
  // Placeholder data
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `${title} Action Shot ${i + 1}`,
    date: 'Oct 12, 2023',
    size: '1.2 MB'
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">{title} Gallery</h2>
          <p className="text-slate-500 font-medium">Manage and upload media for the {title} section.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-[#0F4C81] text-white hover:bg-[#FFC107] hover:text-[#0F4C81] font-black uppercase tracking-widest transition-all shadow-xl shadow-[#0F4C81]/20 group">
          <Plus className="mr-2 group-hover:rotate-90 transition-transform" />
          Upload New Media
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm font-medium" 
            placeholder="Search media assets..." 
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl bg-white border-none shadow-sm text-slate-500 font-bold">
          <Filter className="mr-2" size={18} />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden rounded-[2.5rem] border-none shadow-sm group hover:shadow-2xl transition-all duration-500">
            <div className="aspect-square bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                <ImageIcon size={64} />
              </div>
              <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button className="p-3 bg-white/90 backdrop-blur rounded-xl text-[#0F4C81] hover:bg-[#FFC107] transition-colors shadow-lg">
                  <Eye size={18} />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-1">
              <h4 className="font-bold text-[#0F4C81] truncate">{item.title}</h4>
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <span>{item.date}</span>
                <span>{item.size}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;