"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
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

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
};

export default SEO;