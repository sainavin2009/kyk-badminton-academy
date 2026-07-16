"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  Mail,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const MessagesManager = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      toast.error('Failed to load messages: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      toast.success(`Message marked as ${status}`);
    } catch (err: any) {
      toast.error('Update failed: ' + err.message);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0F4C81] tracking-tighter uppercase">Inquiry Inbox</h2>
          <p className="text-slate-500 font-medium">Manage incoming inquiries from the public website.</p>
        </div>
        
        <Button variant="ghost" onClick={fetchMessages} className="h-16 w-16 rounded-2xl text-slate-400">
          <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
        </Button>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-14 h-16 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus-visible:ring-2 focus-visible:ring-[#FFC107]" 
          placeholder="Search by name, email, or subject..." 
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-40 flex justify-center"><RefreshCw className="animate-spin text-slate-200" size={48} /></div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <Card key={msg.id} className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-64 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-[#0F4C81] text-sm uppercase">{msg.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{format(new Date(msg.created_at), 'PPP')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Mail size={14} /> {msg.email}
                    </div>
                    <Badge className={`rounded-full px-3 py-1 font-black uppercase text-[8px] tracking-widest border-none ${
                      msg.status === 'Read' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {msg.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex-grow space-y-3">
                  <h3 className="text-lg font-black text-[#0F4C81] uppercase tracking-tight">{msg.subject || 'No Subject'}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                    "{msg.message}"
                  </p>
                </div>

                <div className="flex items-start">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-12 w-12 rounded-xl hover:bg-slate-50">
                        <MoreVertical size={20} className="text-slate-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl w-48 p-2">
                      <DropdownMenuItem onClick={() => updateStatus(msg.id, 'Read')} className="rounded-lg font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" /> Mark as Read
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(msg.id, 'Unread')} className="rounded-lg font-bold flex items-center gap-2">
                        <Clock size={16} className="text-amber-500" /> Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteMessage(msg.id)} className="rounded-lg font-bold flex items-center gap-2 text-red-500 hover:bg-red-50">
                        <Trash2 size={16} /> Delete Inquiry
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <MessageSquare className="mx-auto text-slate-200 mb-4" size={48} />
            <h3 className="text-2xl font-black text-[#0F4C81] uppercase">No Messages</h3>
            <p className="text-slate-400 font-medium">Your inquiry inbox is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;