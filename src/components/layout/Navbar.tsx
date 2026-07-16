"use client";

import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, ChevronRight, Lock, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSettings();
  const { session } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-[#0F4C81] shadow-xl h-20" : "bg-[#0F4C81]/90 backdrop-blur-md h-24"
    )}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="Logo" className="h-12 w-auto object-contain" />
          ) : (
            <div className="p-3 bg-[#FFC107] rounded-2xl">
              <Trophy className="h-6 w-6" strokeWidth={2.5} />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase text-white leading-none">
              {settings?.hero_heading || 'KYK Academy'}
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
                  "relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all",
                  isActive(item.path) ? "text-[#FFC107]" : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Button asChild className="rounded-full bg-[#FFC107] text-[#0F4C81] font-black px-8 h-12 shadow-xl">
            <Link to="/join" className="flex items-center gap-2">Join Elite Squad <ChevronRight size={16} /></Link>
          </Button>
        </div>

        {/* Mobile Nav Trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden p-4 text-white bg-white/10 rounded-2xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0F4C81] border-t border-white/10 p-8 flex flex-col gap-6 lg:hidden shadow-2xl overflow-y-auto max-h-[80vh]"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-xl font-black uppercase tracking-widest transition-all",
                  isActive(item.path) ? "text-[#FFC107]" : "text-white/70 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <hr className="border-white/10 my-2" />
            
            <div className="flex flex-col gap-4">
              <Button asChild className="rounded-full bg-[#FFC107] text-[#0F4C81] font-black w-full h-14 shadow-xl text-lg">
                <Link to="/join" onClick={() => setIsOpen(false)}>Join Elite Squad</Link>
              </Button>
              
              {/* Admin Link at the bottom of mobile menu */}
              <Link 
                to={session ? "/admin" : "/admin/login"}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-white/20 text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest"
              >
                {session ? <LayoutDashboard size={14} /> : <Lock size={14} />}
                {session ? "Dashboard" : "Admin Login"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default memo(Navbar);