import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Tvoříme chytrá řešení v digitálním prostředí. AI agenti, automatizace a robustní systémy.",
  keywords,
  image = "https://growthspect.com/og-image.jpg"
}) => {
  const siteTitle = "Growthspect | Enterprise AI & Systems";
  const fullTitle = title ? `${title} | Growthspect` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};
