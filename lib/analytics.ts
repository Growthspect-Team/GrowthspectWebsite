/**
 * Analytics & Event Tracking Utility
 * 
 * This module provides a unified interface for tracking user interactions,
 * page views, and custom events. It supports multiple analytics providers
 * and includes built-in support for heatmap tracking.
 */

// Event categories
export type EventCategory = 
  | 'navigation'
  | 'engagement'
  | 'conversion'
  | 'form'
  | 'video'
  | 'scroll'
  | 'click'
  | 'error';

// Event interface
export interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

// Page view interface
export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  language?: string;
}

// User properties
export interface UserProperties {
  language?: string;
  theme?: string;
  returning?: boolean;
  sessionCount?: number;
}

// Analytics configuration
interface AnalyticsConfig {
  debug?: boolean;
  googleAnalyticsId?: string;
  hotjarId?: string;
  enabled?: boolean;
}

class Analytics {
  private config: AnalyticsConfig = {
    debug: import.meta.env.DEV,
    enabled: true
  };
  
  private eventQueue: AnalyticsEvent[] = [];
  private initialized = false;

  /**
   * Initialize analytics with configuration
   */
  init(config?: Partial<AnalyticsConfig>) {
    this.config = { ...this.config, ...config };
    this.initialized = true;
    
    // Process queued events
    this.eventQueue.forEach(event => this.trackEvent(event));
    this.eventQueue = [];
    
    // Initialize Google Analytics if ID provided
    if (this.config.googleAnalyticsId) {
      this.initGoogleAnalytics(this.config.googleAnalyticsId);
    }
    
    // Initialize Hotjar if ID provided
    if (this.config.hotjarId) {
      this.initHotjar(this.config.hotjarId);
    }
    
    this.log('Analytics initialized', this.config);
  }

  /**
   * Track a page view
   */
  trackPageView(pageView: PageView) {
    if (!this.config.enabled) return;
    
    this.log('Page View:', pageView);
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', this.config.googleAnalyticsId, {
        page_path: pageView.path,
        page_title: pageView.title
      });
    }
    
    // Store in session for debugging
    this.storeEvent({
      category: 'navigation',
      action: 'page_view',
      label: pageView.path,
      metadata: pageView
    });
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.config.enabled) return;
    
    // Queue events if not initialized
    if (!this.initialized) {
      this.eventQueue.push(event);
      return;
    }
    
    this.log('Event:', event);
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata
      });
    }
    
    // Store event
    this.storeEvent(event);
  }

  /**
   * Track button/link clicks
   */
  trackClick(elementName: string, metadata?: Record<string, any>) {
    this.trackEvent({
      category: 'click',
      action: 'click',
      label: elementName,
      metadata
    });
  }

  /**
   * Track form submissions
   */
  trackFormSubmit(formName: string, success: boolean, metadata?: Record<string, any>) {
    this.trackEvent({
      category: 'form',
      action: success ? 'submit_success' : 'submit_error',
      label: formName,
      metadata
    });
  }

  /**
   * Track form field interactions
   */
  trackFormField(formName: string, fieldName: string, action: 'focus' | 'blur' | 'change') {
    this.trackEvent({
      category: 'form',
      action: `field_${action}`,
      label: `${formName}:${fieldName}`
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage: number, sectionId?: string) {
    this.trackEvent({
      category: 'scroll',
      action: 'scroll_depth',
      label: sectionId || 'page',
      value: percentage
    });
  }

  /**
   * Track video interactions
   */
  trackVideo(action: 'play' | 'pause' | 'complete' | 'progress', videoId: string, progress?: number) {
    this.trackEvent({
      category: 'video',
      action: `video_${action}`,
      label: videoId,
      value: progress
    });
  }

  /**
   * Track conversions
   */
  trackConversion(conversionType: string, value?: number, metadata?: Record<string, any>) {
    this.trackEvent({
      category: 'conversion',
      action: conversionType,
      value,
      metadata
    });
  }

  /**
   * Track errors
   */
  trackError(errorType: string, errorMessage: string, metadata?: Record<string, any>) {
    this.trackEvent({
      category: 'error',
      action: errorType,
      label: errorMessage,
      metadata
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: UserProperties) {
    if (!this.config.enabled) return;
    
    this.log('User Properties:', properties);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('set', 'user_properties', properties);
    }
  }

  /**
   * Track CTA clicks with specific conversion tracking
   */
  trackCTA(ctaName: string, location: string) {
    this.trackEvent({
      category: 'conversion',
      action: 'cta_click',
      label: ctaName,
      metadata: { location }
    });
  }

  /**
   * Track language change
   */
  trackLanguageChange(from: string, to: string) {
    this.trackEvent({
      category: 'engagement',
      action: 'language_change',
      label: `${from}_to_${to}`
    });
  }

  /**
   * Track service interest
   */
  trackServiceView(serviceId: string, serviceName: string) {
    this.trackEvent({
      category: 'engagement',
      action: 'service_view',
      label: serviceName,
      metadata: { serviceId }
    });
  }

  /**
   * Track project view
   */
  trackProjectView(projectTitle: string) {
    this.trackEvent({
      category: 'engagement',
      action: 'project_view',
      label: projectTitle
    });
  }

  /**
   * Track blog post read
   */
  trackBlogRead(slug: string, title: string, readPercentage?: number) {
    this.trackEvent({
      category: 'engagement',
      action: 'blog_read',
      label: title,
      value: readPercentage,
      metadata: { slug }
    });
  }

  // Private methods
  
  private log(...args: any[]) {
    if (this.config.debug) {
      console.log('[Analytics]', ...args);
    }
  }

  private storeEvent(event: AnalyticsEvent) {
    // Store in sessionStorage for debugging
    if (typeof window !== 'undefined') {
      const events = JSON.parse(sessionStorage.getItem('analytics_events') || '[]');
      events.push({
        ...event,
        timestamp: new Date().toISOString()
      });
      // Keep last 100 events
      if (events.length > 100) events.shift();
      sessionStorage.setItem('analytics_events', JSON.stringify(events));
    }
  }

  private initGoogleAnalytics(id: string) {
    if (typeof window === 'undefined') return;
    
    // Add gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  }

  private initHotjar(id: string) {
    if (typeof window === 'undefined') return;
    
    // Hotjar Tracking Code
    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: id, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }
}

// Export singleton instance
export const analytics = new Analytics();

// React hook for analytics
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAnalytics() {
  const location = useLocation();
  
  // Track page views on route change
  useEffect(() => {
    analytics.trackPageView({
      path: location.pathname,
      title: document.title,
      referrer: document.referrer
    });
  }, [location.pathname]);
  
  return analytics;
}

// Scroll depth tracker hook
export function useScrollDepthTracker(thresholds = [25, 50, 75, 100]) {
  useEffect(() => {
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);
      
      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          analytics.trackScrollDepth(threshold);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);
}

export default analytics;
