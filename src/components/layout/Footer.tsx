"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    quick: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Programs', path: '/programs' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Contact', path: '/contact' },
    ],
    programs: [
      { name: 'Beginner Foundation', path: '/programs' },
      { name: 'Intermediate Core', path: '/programs' },
      { name: 'Elite Competitive', path: '/programs' },
      { name: 'Adult Fitness', path: '/programs' },
    ],
    social: [
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Youtube, href: '#', label: 'Youtube' },
    ]
  };

  return (
    <footer className="bg-[#0A2A47] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#FFC107] rounded-lg group-hover:rotate-12 transition-transform">
                <Trophy className="text-[#0F4C81] h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">KYK Academy</span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Nurturing the next generation of badminton champions through discipline, dedication, and world-class training techniques.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0F4C81] transition-all"
                  aria-label={item.label}
                >
                  <item.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Quick Navigation
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#FFC107] rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/60 hover:text-[#FFC107] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FFC107] rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Programs */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Our Programs
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#FFC107] rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/60 hover:text-[#FFC107] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FFC107] rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#FFC107] rounded-full" />
            </h4>
            <p className="text-white/60 mb-6">Stay updated with our latest tournament results and academy news.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC107] transition-all"
              />
              <button className="absolute right-2 top-2 h-10 px-4 bg-[#FFC107] text-[#0F4C81] rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#FFC107]/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-medium">
            © 2026 <span className="text-white/60">KYK Badminton Academy</span>. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold text-white/40 uppercase tracking-widest">
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#FFC107] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;