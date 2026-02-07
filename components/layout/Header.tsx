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
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent, itemLabel: string, targetId: string) => {
    e.preventDefault();
    if (itemLabel === 'Služby') {
      onNavigate('services');
    } else if (itemLabel === 'SCALEX') {
      onNavigate('scalex');
    } else if (itemLabel === 'Blog') {
      onNavigate('blog');
    } else if (itemLabel === 'Kariéra') {
      onNavigate('careers');
    } else if (itemLabel === 'Projekty') {
      onNavigate('projects'); // Need to handle this in App
    } else if (itemLabel === 'Domov') {
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
      className={cn(
        "fixed z-50 transition-all duration-300 w-full flex justify-center",
        isScrolled
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
                             ((item.label === 'Domov' || item.id === 'home') && activePage === 'home');

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
                    className="group bg-gradient-to-r from-brand-purple to-[#a855f7] hover:opacity-90 text-white rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] border-none !normal-case tracking-normal"
                    variant="primary"
                >
                    {t('nav.inquiry') || "Pojďme začít"}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
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
