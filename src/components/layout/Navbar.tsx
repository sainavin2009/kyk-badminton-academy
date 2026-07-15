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
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    { name: 'Activities', href: 'activities' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${href}`);
    } else {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg h-20" 
          : "bg-transparent h-28"
      )}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg p-1"
          aria-label="KYK Academy Home"
        >
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-300 shadow-lg",
              scrolled ? "bg-[#0F4C81] text-[#FFC107]" : "bg-[#FFC107] text-[#0F4C81]"
            )}
          >
            <Trophy className="h-6 w-6" />
          </motion.div>
          <span className={cn(
            "text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors duration-300",
            scrolled ? "text-[#0F4C81]" : "text-white"
          )}>
            KYK Academy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-widest transition-all relative group rounded-lg",
                scrolled 
                  ? (activeSection === item.href ? "text-[#0F4C81]" : "text-slate-500 hover:text-[#0F4C81]") 
                  : (activeSection === item.href ? "text-[#FFC107]" : "text-white/80 hover:text-white")
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#FFC107] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
          <div className="ml-6">
            <Button 
              asChild 
              className={cn(
                "rounded-full font-black px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl",
                scrolled 
                  ? "bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90" 
                  : "bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 shadow-[#FFC107]/20"
              )}
            >
              <Link to="/join">Join Now</Link>
            </Button>
          </div>
        </div>

        <button 
          className={cn(
            "md:hidden p-3 rounded-2xl transition-all active:scale-90",
            scrolled ? "text-[#0F4C81] bg-slate-100" : "text-white bg-white/10 backdrop-blur-md"
          )} 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden border-t"
          >
            <div className="p-8 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl text-xl font-black uppercase tracking-tight transition-all",
                    activeSection === item.href 
                      ? "bg-[#0F4C81]/5 text-[#0F4C81]" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-6">
                <Button 
                  asChild 
                  className="w-full h-16 rounded-2xl bg-[#0F4C81] text-white font-black text-xl uppercase tracking-tight shadow-xl"
                  onClick={() => setIsOpen(false)}
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