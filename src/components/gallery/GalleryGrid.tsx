"use client";

import React from 'react';
import GalleryCard, { GalleryItem } from './GalleryCard';

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p>No gallery items found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <GalleryCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default GalleryGrid;