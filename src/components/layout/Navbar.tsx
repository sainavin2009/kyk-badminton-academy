"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Activities', path: '#activities' },
    { name: 'Contact', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg h-20" 
          : "bg-transparent h-28"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={cn(
            "p-2 rounded-xl transition-all shadow-lg",
            scrolled ? "bg-[#0F4C81] text-[#FFC107]" : "bg-[#FFC107] text-[#0F4C81]"
          )}>
            <Trophy className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-lg font-black tracking-tighter uppercase leading-none",
              scrolled ? "text-[#0F4C81]" : "text-white"
            )}>
              KYK Academy
            </span>
            <span className={cn(
              "text-[8px] font-bold uppercase tracking-widest",
              scrolled ? "text-slate-400" : "text-[#FFC107]"
            )}>
              Since 2014
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={cn(
                "px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#FFC107]",
                scrolled ? "text-[#0F4C81]" : "text-white"
              )}
            >
              {item.name}
            </a>
          ))}
          <Button 
            asChild 
            className={cn(
              "ml-4 rounded-full font-black px-8 h-12 shadow-lg",
              scrolled ? "bg-[#0F4C81] text-white" : "bg-[#FFC107] text-[#0F4C81]"
            )}
          >
            <Link to="/join">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden p-3 rounded-2xl",
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t p-8 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-2xl font-black uppercase tracking-tighter text-[#0F4C81] hover:text-[#FFC107]"
              >
                {item.name}
              </a>
            ))}
            <Button asChild className="w-full h-16 rounded-2xl bg-[#0F4C81] text-white font-black uppercase text-xl">
              <Link to="/join">Join Academy</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;