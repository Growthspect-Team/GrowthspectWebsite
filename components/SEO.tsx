import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://growthspect.com';

// Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Growthspect",
  "url": BASE_URL,
  "logo": `${BASE_URL}/assets/Branding/Growthspect_AI_white.png`,
  "description": "Enterprise AI & Systems Studio specializing in AI agents, automation, and high-performance data platforms.",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "team@growthspect.com",
    "contactType": "sales",
    "availableLanguage": ["Czech", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/growthspect",
    "https://clutch.co/profile/growthspect"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CZ"
  }
};

// Structured Data for WebSite with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Growthspect",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description,
  keywords,
  image = `${BASE_URL}/og-image.jpg`,
  type = 'website',
  publishedTime,
  author,
  noIndex = false
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const defaultDescriptions = {
    cs: "Tvoříme vysoce výkonné datové platformy, AI agenty a robustní firemní software. Pomáháme firmám škálovat pomocí moderní infrastruktury a automatizace.",
    en: "We build high-performance data platforms, AI agents, and robust enterprise software. We help companies scale using modern infrastructure and automation."
  };
  
  const siteTitle = "Growthspect | Enterprise AI & Systems Studio | Build, Automate & Scale";
  const fullTitle = title ? `${title} | Growthspect` : siteTitle;
  const metaDescription = description || defaultDescriptions[language];
  const canonicalUrl = `${BASE_URL}${location.pathname}`;
  
  // Alternate language URLs
  const alternateUrls = {
    cs: canonicalUrl,
    en: canonicalUrl // Same URL, different content based on language
  };

  // Article schema for blog posts
  const articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": metaDescription,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author || "Growthspect Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Growthspect",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/assets/Branding/Growthspect_AI_white.png`
      }
    },
    "datePublished": publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate languages */}
      <link rel="alternate" hrefLang="cs" href={alternateUrls.cs} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.cs} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Growthspect" />
      <meta property="og:locale" content={language === 'cs' ? 'cs_CZ' : 'en_US'} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};
