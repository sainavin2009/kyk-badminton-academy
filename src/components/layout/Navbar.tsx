"use client";

import React, { useState, useEffect } from 'react';
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
    { name: 'Home', path: isHome ? '#home' : '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isHome && path.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 ease-in-out",
        scrolled 
          ? "bg-white/90 backdrop-blur-2xl shadow-xl h-20" 
          : "bg-transparent h-28"
      )}
    >
      <div className="container mx-auto px-8 h-full flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className={cn(
            "p-3 rounded-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg",
            scrolled ? "bg-[#0F4C81] text-[#FFC107]" : "bg-[#FFC107] text-[#0F4C81]"
          )}>
            <Trophy className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-black tracking-tighter uppercase leading-none transition-colors",
              scrolled ? "text-[#0F4C81]" : "text-white"
            )}>
              KYK Academy
            </span>
            <span className={cn(
              "text-[8px] font-black uppercase tracking-[0.3em] transition-colors",
              scrolled ? "text-slate-400" : "text-[#FFC107]"
            )}>
              Est. 2014
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => item.path.startsWith('#') && handleNavClick(e as any, item.path)}
                className={cn(
                  "relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all group",
                  scrolled ? "text-[#0F4C81]/70 hover:text-[#0F4C81]" : "text-white/70 hover:text-white"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-4 right-4 h-0.5 bg-[#FFC107] scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                  location.pathname === item.path && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>
          
          <Button 
            asChild 
            className={cn(
              "rounded-full font-black px-8 h-12 shadow-xl hover:scale-105 active:scale-95 transition-all",
              scrolled ? "bg-[#0F4C81] text-white" : "bg-[#FFC107] text-[#0F4C81]"
            )}
          >
            <Link to="/join" className="flex items-center gap-2">
              Join Elite Squad
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-4 rounded-2xl transition-all active:scale-90",
            scrolled ? "text-[#0F4C81] bg-slate-100" : "text-white bg-white/10"
          )} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
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

            <div className="flex flex-col gap-8 mb-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black uppercase tracking-tighter text-white/50 hover:text-[#FFC107] transition-colors"
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

export default Navbar;