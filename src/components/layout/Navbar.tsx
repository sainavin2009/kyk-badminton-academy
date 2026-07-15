"use client";

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md h-16" : "bg-transparent h-20"
      )}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Trophy className={cn("transition-colors duration-300 h-8 w-8", scrolled ? "text-[#0F4C81]" : "text-[#FFC107]")} />
          <span className={cn("text-xl font-black tracking-tighter uppercase", scrolled ? "text-[#0F4C81]" : "text-white")}>
            KYK ACADEMY
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "text-sm font-bold uppercase tracking-widest transition-colors relative py-2",
                scrolled ? "text-slate-600 hover:text-[#0F4C81]" : "text-white/80 hover:text-white",
                isActive && (scrolled ? "text-[#0F4C81]" : "text-[#FFC107]")
              )}
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFC107] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button asChild className="rounded-full bg-[#FFC107] text-[#0F4C81] hover:bg-[#FFC107]/90 font-bold px-6">
            <Link to="/join">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn("md:hidden p-2 rounded-lg", scrolled ? "text-[#0F4C81]" : "text-white")} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-white border-b shadow-xl p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "block text-lg font-bold uppercase tracking-wider p-2 rounded-xl transition-colors",
                isActive ? "bg-slate-50 text-[#0F4C81]" : "text-slate-600"
              )}
            >
              {item.name}
            </NavLink>
          ))}
          <Button asChild className="w-full h-12 rounded-xl bg-[#0F4C81] font-bold">
            <Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;