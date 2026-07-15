"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="text-green-500 h-8 w-8" />
              <span className="text-xl font-bold tracking-tighter">KYK ACADEMY</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Nurturing the next generation of badminton champions with world-class training and facilities.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-green-500 transition-colors">Programs</Link></li>
              <li><Link to="/gallery" className="hover:text-green-500 transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Programs</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>Beginner Foundation</li>
              <li>Intermediate Core</li>
              <li>Elite Competitive</li>
              <li>Adult Fitness</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 text-slate-400 hover:text-green-500 cursor-pointer" />
              <Facebook className="h-5 w-5 text-slate-400 hover:text-green-500 cursor-pointer" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-green-500 cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} KYK Badminton Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;