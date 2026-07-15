"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg h-20" 
          : "bg-transparent h-28"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-300 shadow-lg",
              scrolled || location.pathname !== '/' ? "bg-[#0F4C81] text-[#FFC107]" : "bg-[#FFC107] text-[#0F4C81]"
            )}
          >
            <Trophy className="h-6 w-6" strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-black tracking-tighter uppercase leading-none transition-colors",
              scrolled || location.pathname !== '/' ? "text-[#0F4C81]" : "text-white"
            )}>
              KYK Academy
            </span>
            <span className={cn(
              "text-[8px] font-black tracking-[0.3em] uppercase transition-opacity",
              scrolled || location.pathname !== '/' ? "text-[#0F4C81]/50" : "text-[#FFC107]"
            )}>
              Elite Training
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-widest transition-all relative group",
                scrolled || location.pathname !== '/'
                  ? (isActive(item.path) ? "text-[#0F4C81]" : "text-slate-400 hover:text-[#0F4C81]") 
                  : (isActive(item.path) ? "text-[#FFC107]" : "text-white/80 hover:text-white")
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.path) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FFC107] rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <div className="ml-6">
            <Button 
              asChild 
              className={cn(
                "rounded-full font-black px-8 h-12 transition-all duration-300 shadow-xl",
                scrolled || location.pathname !== '/'
                  ? "bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90" 
                  : "bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 shadow-[#FFC107]/20"
              )}
            >
              <Link to="/join">Join Now</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden p-3 rounded-2xl transition-all",
            scrolled || location.pathname !== '/' ? "text-[#0F4C81] bg-slate-100" : "text-white bg-white/10 backdrop-blur-md"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden border-t"
          >
            <div className="p-8 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block w-full p-4 rounded-2xl text-xl font-black uppercase tracking-tight transition-all",
                    isActive(item.path) 
                      ? "bg-[#0F4C81]/5 text-[#0F4C81]" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6">
                <Button 
                  asChild 
                  className="w-full h-16 rounded-2xl bg-[#0F4C81] text-white font-black text-xl uppercase tracking-tight shadow-xl"
                >
                  <Link to="/join">Join Academy</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;