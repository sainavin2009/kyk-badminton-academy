"use client";

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  AlertTriangle,
  ArrowUpDown,
  Archive,
  History
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn, formatCurrency } from '@/lib/utils';

interface InventoryTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const InventoryTable = ({ items, onEdit, onDelete }: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C81] transition-colors" size={18} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:shadow-slate-200/40 transition-all text-sm" 
            placeholder="Search products or suppliers..." 
          />
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-14 px-6 rounded-2xl border-none bg-slate-50 font-bold flex items-center gap-2 hover:bg-slate-100 transition-all text-slate-500">
                <Filter size={18} />
                {filterCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl w-56">
              <DropdownMenuItem onClick={() => setFilterCategory('All')} className="font-bold">All Categories</DropdownMenuItem>
              {categories.map(cat => (
                <DropdownMenuItem key={cat} onClick={() => setFilterCategory(cat)} className="font-bold">{cat}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="h-14 px-6 rounded-2xl border-none bg-slate-50 font-bold flex items-center gap-2 hover:bg-slate-100 transition-all text-slate-500">
            <ArrowUpDown size={18} />
            Sort
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 h-14 pl-8">Product Name</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Category</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Stock Status</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Pricing (Cost/Sell)</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Supplier</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400 text-right pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const isLowStock = item.quantity <= item.min_stock;
                  return (
                    <TableRow key={item.id} className="group hover:bg-slate-50/50 border-slate-50 transition-colors">
                      <TableCell className="pl-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0F4C81]">{item.name}</span>
                          <span className="text-[10px] font-medium text-slate-400">{item.barcode || 'No Barcode'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-50 text-blue-600 rounded-lg px-2 py-1 shadow-none border-none uppercase text-[9px] font-black tracking-widest">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-black text-lg",
                            isLowStock ? "text-red-500" : "text-[#0F4C81]"
                          )}>
                            {item.quantity}
                          </span>
                          {isLowStock && (
                            <div className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase animate-pulse">
                              <AlertTriangle size={12} /> Low Stock
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-400">Cost: {formatCurrency(item.purchase_price)}</span>
                          <span className="text-sm font-black text-[#0F4C81]">Sell: {formatCurrency(item.selling_price)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-slate-600">{item.supplier || 'N/A'}</span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
                              <MoreVertical size={18} className="text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl w-48 p-2">
                            <DropdownMenuItem onClick={() => onEdit(item)} className="rounded-lg h-10 font-bold flex items-center gap-2">
                              <Edit3 size={16} className="text-amber-500" />
                              Update Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg h-10 font-bold flex items-center gap-2">
                              <History size={16} className="text-blue-500" />
                              Stock History
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                                  <Trash2 size={16} />
                                  Remove Product
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-[2.5rem]">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl font-black text-[#0F4C81] uppercase">Delete Product?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-slate-500 font-medium">
                                    Are you sure you want to remove <span className="font-bold text-[#0F4C81]">{item.name}</span>? This will wipe all historical data for this item.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-3">
                                  <AlertDialogCancel className="rounded-2xl h-14 font-bold border-none bg-slate-50">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => onDelete(item.id)}
                                    className="rounded-2xl h-14 font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white border-none"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 text-slate-300">
                      <div className="p-6 bg-slate-50 rounded-full"><Archive size={48} /></div>
                      <p className="font-bold uppercase text-[10px] tracking-widest">No inventory items found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;