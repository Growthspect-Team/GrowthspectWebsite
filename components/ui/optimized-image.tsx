import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ImageSource {
  src: string;
  width: number;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataUrl?: string;
  sizes?: string;
  srcSet?: ImageSource[];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Generate srcset string from image sources
 */
function generateSrcSet(sources: ImageSource[]): string {
  return sources.map(s => `${s.src} ${s.width}w`).join(', ');
}

/**
 * Generate Unsplash optimized URLs with different widths
 */
function getUnsplashSrcSet(baseUrl: string, widths: number[] = [400, 800, 1200, 1600, 2000]): ImageSource[] {
  // Check if it's an Unsplash URL
  if (!baseUrl.includes('unsplash.com')) {
    return [];
  }
  
  // Parse the URL to add/modify width parameter
  const url = new URL(baseUrl);
  
  return widths.map(width => {
    const newUrl = new URL(baseUrl);
    newUrl.searchParams.set('w', width.toString());
    newUrl.searchParams.set('q', '80'); // Quality
    newUrl.searchParams.set('auto', 'format'); // Auto format (WebP when supported)
    newUrl.searchParams.set('fit', 'crop');
    
    return {
      src: newUrl.toString(),
      width
    };
  });
}

/**
 * Generate default sizes attribute based on common breakpoints
 */
function getDefaultSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

/**
 * OptimizedImage Component
 * 
 * A responsive image component with:
 * - Lazy loading
 * - srcset for responsive images
 * - Blur placeholder
 * - Automatic Unsplash optimization
 * - Width/height for CLS prevention
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataUrl,
  sizes,
  srcSet,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate srcset from Unsplash URLs or use provided srcSet
  const imageSrcSet = srcSet 
    ? generateSrcSet(srcSet) 
    : generateSrcSet(getUnsplashSrcSet(src));

  // Default sizes if not provided
  const imageSizes = sizes || getDefaultSizes();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current) {
            // Start loading when in viewport
            imgRef.current.loading = 'eager';
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder blur style
  const blurStyle = placeholder === 'blur' && blurDataUrl && !isLoaded
    ? {
        backgroundImage: `url(${blurDataUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
        transform: 'scale(1.1)'
      }
    : {};

  // Object fit styles
  const objectFitStyles = {
    objectFit,
    objectPosition
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-gray-800 flex items-center justify-center text-gray-500",
          className
        )}
        style={{ width, height }}
      >
        <svg 
          className="w-12 h-12 opacity-50" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-500"
          style={blurStyle}
          aria-hidden="true"
        />
      )}
      
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        srcSet={imageSrcSet || undefined}
        sizes={imageSrcSet ? imageSizes : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          !isLoaded && placeholder === 'blur' ? "opacity-0" : "opacity-100",
          className
        )}
        style={{
          ...objectFitStyles,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

/**
 * Responsive image presets for common use cases
 */
export const ImagePresets = {
  hero: {
    sizes: '100vw',
    widths: [640, 1024, 1536, 2048]
  },
  card: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    widths: [400, 600, 800, 1000]
  },
  thumbnail: {
    sizes: '(max-width: 640px) 50vw, 200px',
    widths: [200, 400]
  },
  avatar: {
    sizes: '100px',
    widths: [100, 200]
  }
};

/**
 * Hook for preloading critical images
 */
export function useImagePreload(src: string) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [src]);
}

export default OptimizedImage;
