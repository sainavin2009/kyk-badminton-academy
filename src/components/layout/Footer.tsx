"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight, Lock, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { session } = useAuth();
  
  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Training Programs', path: '/programs' },
      { name: 'Media Gallery', path: '/gallery' },
      { name: 'Join Academy', path: '/join' },
    ],
    programs: [
      { name: 'Junior Foundation', path: '/programs' },
      { name: 'Elite Competitive', path: '/programs' },
      { name: 'Adult Performance', path: '/programs' },
      { name: 'Strength & Conditioning', path: '/programs' },
    ],
    contact: [
      { icon: MapPin, text: '123 Smash Court, Badminton Valley, SC 54321' },
      { icon: Phone, text: '+1 (234) 567-890' },
      { icon: Mail, text: 'info@kykacademy.com' },
    ],
    social: [
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Youtube, href: '#', label: 'Youtube' },
    ]
  };

  return (
    <footer className="bg-[#0A2A47] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="p-2.5 bg-[#FFC107] rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#FFC107]/20">
                <Trophy className="text-[#0F4C81] h-7 w-7" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase leading-none">KYK Academy</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFC107] uppercase">Badminton Excellence</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm font-medium">
              We provide world-class badminton coaching and fitness training to help athletes reach their full potential through discipline and expert guidance.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ y: -4 }}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all duration-300"
                  aria-label={item.label}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />
              Quick Explore
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-2 text-white/50 hover:text-[#FFC107] transition-all duration-300 font-medium"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />
              Our Programs
            </h4>
            <ul className="space-y-4">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-2 text-white/50 hover:text-[#FFC107] transition-all duration-300 font-medium"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />
              Get In Touch
            </h4>
            <ul className="space-y-6">
              {footerLinks.contact.map((item, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC107] group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-all duration-300">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-semibold tracking-tight">
            © {currentYear} <span className="text-white/70">KYK Badminton Academy</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            
            {/* Admin/Dashboard subtle link */}
            <Link 
              to={session ? "/admin" : "/admin/login"}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all font-black"
            >
              {session ? <LayoutDashboard size={12} /> : <Lock size={12} />}
              {session ? "Dashboard" : "Admin"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;