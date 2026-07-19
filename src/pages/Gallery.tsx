"use client";

import React, { useEffect, useState } from 'react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import VideoCard from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from('gallery_items')
        .select('*')
        .order('order_index', { ascending: true });
      
      setItems(data || []);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const imageItems = items.filter(i => i.type === 'image');
  const videoItems = items.filter(i => i.type === 'video');

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Academy Media Gallery"
        description="Visual highlights from KYK Badminton Academy. Explore photos and videos of our elite training sessions, tournaments, and victory moments."
        path="/gallery"
      />

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

      {loading ? (
        <div className="py-40 flex justify-center">
          <Loader2 className="animate-spin text-[#0F4C81]" size={48} />
        </div>
      ) : (
        <>
          {/* Featured Videos Section */}
          {videoItems.length > 0 && (
            <section className="py-24 bg-slate-50">
              <div className="container mx-auto px-4">
                <div className="mb-12">
                  <h2 className="text-3xl font-black text-[#0F4C81] tracking-tight uppercase">Featured Videos</h2>
                  <div className="w-16 h-1.5 bg-[#FFC107] mt-2 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {videoItems.map((video, idx) => (
                    <VideoCard 
                      key={idx} 
                      title={video.title}
                      description={video.description}
                      thumbnail={video.thumbnail || video.url}
                      videoUrl={video.url}
                      category={video.category}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Image Grid */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-[#0F4C81] tracking-tight uppercase">Photo Archive</h2>
                <div className="w-16 h-1.5 bg-[#FFC107] mt-2 rounded-full" />
              </div>
              <GalleryGrid 
                items={imageItems.map(i => ({
                  id: i.id,
                  type: 'image',
                  title: i.title,
                  category: i.category,
                  thumbnail: i.url
                }))} 
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Gallery;