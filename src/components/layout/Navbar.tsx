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

  // Handle scroll effects (shrink & scroll spy)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
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
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-lg h-16" 
          : "bg-transparent h-24"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group"
        >
          <div className={cn(
            "p-2 rounded-xl transition-all duration-300",
            scrolled ? "bg-[#0F4C81] text-[#FFC107]" : "bg-[#FFC107] text-[#0F4C81]"
          )}>
            <Trophy className="h-6 w-6" />
          </div>
          <span className={cn(
            "text-xl font-black tracking-tighter uppercase transition-colors duration-300",
            scrolled ? "text-[#0F4C81]" : "text-white"
          )}>
            KYK Academy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all relative group",
                scrolled 
                  ? (activeSection === item.href ? "text-[#0F4C81]" : "text-slate-500 hover:text-[#0F4C81]") 
                  : (activeSection === item.href ? "text-[#FFC107]" : "text-white/80 hover:text-white")
              )}
            >
              {item.name}
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#FFC107] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
          <div className="ml-4">
            <Button 
              asChild 
              className={cn(
                "rounded-full font-bold px-8 transition-all duration-300",
                scrolled 
                  ? "bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 shadow-md" 
                  : "bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 shadow-lg shadow-[#FFC107]/20"
              )}
            >
              <Link to="/join">Join Us</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors",
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all",
                    activeSection === item.href 
                      ? "bg-[#0F4C81]/5 text-[#0F4C81]" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4">
                <Button 
                  asChild 
                  className="w-full h-14 rounded-2xl bg-[#0F4C81] text-white font-bold text-lg"
                >
                  <Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
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