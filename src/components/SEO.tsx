"use client";

import { useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  children?: React.ReactNode;
}

const SEO = ({ 
  title, 
  description, 
  path, 
  image, 
  type = 'website', 
  noindex = false,
  children 
}: SEOProps) => {
  const { settings } = useSettings();
  const siteName = settings?.hero_heading || 'KYK Badminton Academy';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = window.location.origin;
  const url = `${baseUrl}${path}`;
  const ogImage = image || (settings?.logo_url || `${baseUrl}/og-image.jpg`);

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    updateMeta('description', description);

    // Robots
    if (noindex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    // Open Graph
    updateMeta('og:type', type, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', ogImage, 'property');
    updateMeta('og:site_name', siteName, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', url);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [fullTitle, description, url, ogImage, siteName, type, noindex]);

  return null;
};

export default SEO;