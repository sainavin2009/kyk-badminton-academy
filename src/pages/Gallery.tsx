"use client";

import React from 'react';
import GalleryGrid from '../components/gallery/GalleryGrid';
import { GalleryItem } from '../components/gallery/GalleryCard';

const galleryData: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    title: "Morning Drills",
    category: "Training",
    thumbnail: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070",
  },
  {
    id: 2,
    type: 'video',
    title: "Smash Technique",
    category: "Mastery",
    thumbnail: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070",
  },
  {
    id: 3,
    type: 'image',
    title: "Junior Champions",
    category: "Victory",
    thumbnail: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070",
  },
  {
    id: 4,
    type: 'image',
    title: "Elite Fitness",
    category: "Strength",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
  },
  {
    id: 5,
    type: 'video',
    title: "Footwork Drills",
    category: "Agility",
    thumbnail: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=2070",
  },
  {
    id: 6,
    type: 'image',
    title: "Tournament Finals",
    category: "Events",
    thumbnail: "https://images.unsplash.com/photo-1613912111169-58bc44933a0e?q=80&w=2070",
  },
  {
    id: 7,
    type: 'image',
    title: "Coaching Session",
    category: "Mentorship",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
  },
  {
    id: 8,
    type: 'image',
    title: "Academy Grounds",
    category: "Facility",
    thumbnail: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070",
  }
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-[#0F4C81] text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC107]/20 text-[#FFC107] text-xs font-black tracking-widest uppercase mb-6">
            Visual Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Academy Gallery</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Witness the hard work, passion, and victories that define the KYK Badminton Academy experience.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <GalleryGrid items={galleryData} />
        </div>
      </section>
    </div>
  );
};

export default Gallery;