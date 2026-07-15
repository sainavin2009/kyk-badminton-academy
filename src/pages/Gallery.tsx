"use client";

import React from 'react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import VideoCard from '@/components/video/VideoCard';
import { GalleryItem } from '@/components/gallery/GalleryCard';

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
    type: 'image',
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
  }
];

const featuredVideos = [
  {
    title: "Academy Training Philosophy",
    description: "Discover how we combine traditional techniques with modern sports science to create champions.",
    thumbnail: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=2070",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Philosophy"
  },
  {
    title: "Mastering the Backhand Smash",
    description: "Detailed breakdown of the footwork and wrist action required for the perfect backhand smash.",
    thumbnail: "https://images.unsplash.com/photo-1613912111169-58bc44933a0e?q=80&w=2070",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Tutorial"
  }
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Featured Videos Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tight">Featured Training Videos</h2>
            <div className="w-16 h-1.5 bg-[#FFC107] mt-2 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredVideos.map((video, idx) => (
              <VideoCard key={idx} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-[#0F4C81] tracking-tight">Photo Archive</h2>
            <div className="w-16 h-1.5 bg-[#FFC107] mt-2 rounded-full" />
          </div>
          <GalleryGrid items={galleryData} />
        </div>
      </section>
    </div>
  );
};

export default Gallery;