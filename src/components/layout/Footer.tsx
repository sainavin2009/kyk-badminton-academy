"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, MapPin, Phone, Mail, ArrowRight, Lock, LayoutDashboard, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { session } = useAuth();
  const { contactInfo, settings } = useSettings();
  
  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Training Programs', path: '/programs' },
      { name: 'Media Gallery', path: '/gallery' },
      { name: 'Join Academy', path: '/join' },
    ],
    programs: [
      { name: 'Beginner to Advanced Coaching', path: '/programs' },
      { name: 'Advanced Coaching Program', path: '/programs' },
    ]
  };

  const socialIcons = [
    { 
      icon: Instagram, 
      href: contactInfo?.instagram_url || 'https://www.instagram.com/kyk_badminton_academy/', 
      label: 'Instagram',
      target: '_blank'
    },
    { 
      icon: MessageSquare, 
      href: `https://wa.me/${(contactInfo?.whatsapp_number || '919363978810').replace(/\D/g, '')}`, 
      label: 'WhatsApp',
      target: '_blank'
    },
    { 
      icon: Mail, 
      href: `mailto:${contactInfo?.email || 'kykacademy1104@gmail.com'}`, 
      label: 'Email',
      target: '_self'
    },
  ];

  const contactDetails = [
    { 
      icon: MapPin, 
      text: contactInfo?.address || 'No. 65, Appasamy Street, Kolathur, Chennai' 
    },
    { 
      icon: Phone, 
      text: contactInfo?.primary_phone || '+91 93639 78810' 
    },
    { 
      icon: Mail, 
      text: contactInfo?.email || 'kykacademy1104@gmail.com' 
    },
  ];

  return (
    <footer className="bg-[#0A2A47] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-12 w-auto object-contain" />
              ) : (
                <div className="p-2.5 bg-[#FFC107] rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#FFC107]/20">
                  <Trophy className="text-[#0F4C81] h-7 w-7" strokeWidth={2.5} />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase leading-none">
                   {settings?.hero_heading || 'KYK Academy'}
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFC107] uppercase">
                  {settings?.hero_subheading ? (
                    settings.hero_subheading.length > 30 
                      ? "SMASH YOUR LIMITS" 
                      : settings.hero_subheading
                  ) : "SMASH YOUR LIMITS"}
                </span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm font-medium">
              World-class badminton coaching and CrossFit training on international standard courts.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((item, idx) => (
                <motion.a 
                  key={idx} 
                  href={item.href} 
                  target={item.target}
                  rel={item.target === '_blank' ? "noopener noreferrer" : ""}
                  whileHover={{ y: -4 }} 
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all duration-300" 
                  aria-label={item.label}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2"><span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />Explore</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}><Link to={link.path} className="group flex items-center gap-2 text-white/50 hover:text-[#FFC107] transition-all font-medium"><ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2"><span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />Programs</h4>
            <ul className="space-y-4">
              {footerLinks.programs.map((link) => (
                <li key={link.name}><Link to={link.path} className="group flex items-center gap-2 text-white/50 hover:text-[#FFC107] transition-all font-medium"><ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2"><span className="w-6 h-0.5 bg-[#FFC107] rounded-full" />Contact</h4>
            <ul className="space-y-6">
              {contactDetails.map((item, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC107] group-hover:bg-[#FFC107] group-hover:text-[#0F4C81] transition-all duration-300"><item.icon size={18} /></div>
                  <span className="text-sm font-medium text-white/70 leading-relaxed group-hover:text-white transition-colors whitespace-pre-line">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-semibold tracking-tight">© {currentYear} <span className="text-white/70">{settings?.hero_heading || 'KYK Academy'}</span>.</p>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Privacy</Link>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Terms</Link>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <Link to={session ? "/admin" : "/admin/login"} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all font-black">
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