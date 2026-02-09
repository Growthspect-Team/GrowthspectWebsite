import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../UI';
import { cn } from '../../lib/utils';
import { useLanguage } from '../LanguageContext';
import { LanguageSwitcher } from '../ui/language-switcher';
import { NavDropdown } from '../ui/nav-dropdown';
import { NAV_ITEMS } from '../../lib/constants';

interface HeaderProps {
  onNavigate: (page: 'home' | 'services' | 'scalex' | 'blog' | 'services' | 'careers') => void;
  activePage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoSection, setIsVideoSection] = useState(false);
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Basic scroll detection
    const isScrolledDown = latest > 50;
    
    // Check if we are in the video section
    const videoSection = document.getElementById('video-scroll-section');
    let inVideo = false;
    
    if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        // If the section is covering most of the screen or we are inside it
        // rect.top <= 0 means we scrolled past the start
        // rect.bottom > 0 means we haven't scrolled past the end
        // Adjust logic: We want transparent header specifically when the video is "active"
        // The sticky container is h-screen. 
        if (rect.top <= 100 && rect.bottom >= 100) {
            inVideo = true;
        }
    }

    if (inVideo !== isVideoSection) {
        setIsVideoSection(inVideo);
    }

    if (isScrolledDown !== isScrolled) {
      setIsScrolled(isScrolledDown);
    }
  });

  const handleNavClick = (e: React.MouseEvent, itemLabel: string, targetId: string) => {
    e.preventDefault();
    if (itemLabel === 'Služby') {
      onNavigate('services');
    } else if (itemLabel === 'Scalex') {
      onNavigate('scalex');
    } else if (itemLabel === 'Blog') {
      onNavigate('blog');
    } else if (itemLabel === 'Kariéra') {
      onNavigate('careers');
    } else if (itemLabel === 'Projekty') {
      onNavigate('projects'); // Need to handle this in App
    } else if (itemLabel === 'Domů') {
        onNavigate('home');
    } else {
         // Fallback for anchors
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Helper for mobile menu (which expects specific signature or logic)
  // The original App.tsx had onSelect={handleMenuAction} for NavDropdown. 
  // We need to implement handleMenuAction logic here or pass it down.
  // Looking at App.tsx, handleMenuAction was not checking `itemLabel`, but id used in switch.
  // Let's implement a local handler that calls onNavigate.
  
  const handleMenuAction = (id: string) => {
      switch (id) {
        case 'home': onNavigate('home'); break;
        case 'services': onNavigate('services'); break;
        case 'careers': onNavigate('careers'); break;
        case 'scalex': onNavigate('scalex'); break;
        case 'blog': onNavigate('blog'); break;
        case 'projects': onNavigate('projects'); break;
        case 'contact':
            onNavigate('contact');
            break;
      }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed z-[100] transition-all duration-300 w-full flex justify-center",
        // Pokud jsme ve video sekci, chceme transparentní pozadí (isVideoSection override)
        // Jinak standardní logika podle isScrolled
        (isScrolled && !isVideoSection)
          ? "top-0 bg-[#0B0B0C]/85 backdrop-blur-md border-b border-white/5 py-3 md:py-4"
          : "top-0 bg-transparent py-4 md:py-6"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => onNavigate('home')}
        >
          <img
            src="https://www.growthspect.com/Growthspect%20AI%20white.png"
            alt="Growthspect AI"
            className="h-12 md:h-12 object-contain"
          />
        </div>

        {/* Center: Nav Items */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => {
            const labelKey = `nav.${item.id}`;
            const label = t(labelKey) !== labelKey ? t(labelKey) : item.label;
            const isActive = (item.label === 'Služby' && activePage === 'services') || 
                             (item.label === 'Blog' && activePage === 'blog') ||
                             (item.label === 'Scalex' && activePage === 'scalex') ||
                             (item.label === 'Projekty' && activePage === 'projects') ||
                             ((item.label === 'Domů' || item.id === 'home') && activePage === 'home');

            return (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.label, item.id)}
                className={cn(
                  "relative text-[15px] font-medium transition-all duration-300 pb-1 no-underline",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white hover-underline-animation left"
                )}
              >
                {label}
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full opacity-80" 
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 lg:gap-6">
             <div className="hidden md:block">
               <LanguageSwitcher />
             </div>
             
             <div className="hidden md:block">
                <Button 
                    onClick={(e: any) => handleMenuAction('contact')} 
                    className="group bg-[linear-gradient(90deg,#8825ed,#ae1fed)] hover:opacity-90 text-white rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] border-none !normal-case tracking-normal overflow-hidden cursor-pointer"
                    variant="primary"
                >
                    <span className="relative z-10">{t('nav.inquiry') || "Domluvit mini-audit"}</span>
                    <div className="relative w-4 h-4 ml-1 overflow-hidden">
                        <ArrowRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-[150%]" />
                         <ArrowRight className="absolute inset-0 w-full h-full -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                    </div>
                </Button>
             </div>

            {/* Mobile Menu Toggle */}
             <div className="md:hidden">
                <NavDropdown onSelect={handleMenuAction} />
             </div>
        </div>
      </div>
    </motion.header>
  );
};
