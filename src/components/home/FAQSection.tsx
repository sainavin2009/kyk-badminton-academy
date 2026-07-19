"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FAQ } from '@/types/faq';

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        console.error("FAQ Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveFAQs();
  }, []);

  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#0F4C81]/5 text-[#0F4C81] text-[10px] font-black uppercase tracking-widest border border-[#0F4C81]/10"
             >
               Knowledge Base
             </motion.span>
             <h2 className="text-4xl md:text-6xl font-black text-[#0F4C81] uppercase tracking-tighter leading-none">
               Got <span className="text-[#FFC107]">Questions?</span>
             </h2>
             <p className="text-slate-500 font-medium max-w-lg mx-auto italic">
               Everything you need to know about starting your elite journey with KYK Badminton Academy.
             </p>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="w-8 h-8 border-4 border-[#FFC107] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : faqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4 w-full">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <AccordionItem 
                    value={faq.id} 
                    className="border-none bg-white rounded-[2rem] px-8 py-2 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-5 text-left w-full">
                        <div className="w-10 h-10 rounded-2xl bg-[#0F4C81]/5 text-[#0F4C81] flex items-center justify-center shrink-0 group-hover:bg-[#FFC107] transition-colors">
                          <Plus className="w-5 h-5 group-data-[state=open]:hidden" />
                          <Minus className="w-5 h-5 hidden group-data-[state=open]:block" />
                        </div>
                        <span className="text-lg font-black text-[#0F4C81] uppercase tracking-tight leading-tight">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pl-14">
                      <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-[#FFC107] pl-6 py-2">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
               <HelpCircle className="mx-auto mb-4 text-slate-200" size={48} />
               <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No FAQs available at the moment.</p>
            </div>
          )}

          <div className="text-center pt-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Can't find what you're looking for?</p>
            <a 
              href="#contact" 
              className="text-sm font-black text-[#0F4C81] uppercase tracking-[0.2em] border-b-2 border-[#FFC107] hover:text-[#FFC107] transition-colors"
            >
              Speak with a Consultant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;