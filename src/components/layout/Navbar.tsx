"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="text-green-600 h-8 w-8" />
          <span className="text-xl font-bold tracking-tighter">KYK ACADEMY</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="rounded-full bg-green-600 hover:bg-green-700">
            <Link to="/join">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b p-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="w-full rounded-full bg-green-600">
            <Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;