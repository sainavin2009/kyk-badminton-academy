"use client";

import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Using passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-[#0F4C81] shadow-[0_4px_30px_rgba(0,0,0,0.3)] h-20" 
          : "bg-[#0F4C81]/90 backdrop-blur-md h-24"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg">
            <Trophy className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none text-white">
              KYK Academy
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FFC107]">
              Est. 2014
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all group",
                  isActive(item.path) ? "text-[#FFC107]" : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-4 right-4 h-0.5 bg-[#FFC107] transition-transform duration-300 origin-left",
                  isActive(item.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </div>
          
          <Button 
            asChild 
            className="rounded-full bg-[#FFC107] text-[#0F4C81] font-black px-8 h-12 shadow-xl hover:scale-105 hover:bg-white active:scale-95 transition-all"
          >
            <Link to="/join" className="flex items-center gap-2">
              Join Elite Squad
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-4 rounded-2xl text-white bg-white/10 active:scale-90 transition-all"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-[#0F4C81] z-50 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" className="flex items-center gap-4" onClick={() => setIsOpen(false)}>
                <div className="p-3 bg-[#FFC107] text-[#0F4C81] rounded-2xl">
                  <Trophy className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase text-white">KYK Academy</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-4 text-white bg-white/10 rounded-2xl">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 mb-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-5xl font-black uppercase tracking-tighter transition-colors",
                      isActive(item.path) ? "text-[#FFC107]" : "text-white/40 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <Button asChild className="w-full h-20 rounded-3xl bg-[#FFC107] text-[#0F4C81] font-black uppercase text-2xl shadow-2xl">
              <Link to="/join">Join Now</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default memo(Navbar);