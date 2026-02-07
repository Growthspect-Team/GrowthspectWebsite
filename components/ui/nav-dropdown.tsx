
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  LayoutGrid,
  Zap,
  MessageSquare,
  FileText,
  Briefcase,
  Globe
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface NavDropdownProps {
  onSelect: (action: string) => void;
  isVertical?: boolean;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ onSelect, isVertical = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (action: string) => {
    onSelect(action);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'cs' ? 'en' : 'cs');
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center group transition-all duration-300 ${isVertical
            ? 'flex-col gap-3 py-2 px-1'
            : 'gap-2 pr-1 pl-3'
          }`}
      >
        <span className={`text-sm font-medium text-white group-hover:text-brand-purple transition-colors ${isVertical ? '[writing-mode:vertical-rl] rotate-180' : ''
          }`}>
          Menu
        </span>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white text-black border-white' : 'group-hover:bg-white/10'}`}>
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(2px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full mt-3 w-64 bg-[#0B0B0C]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2"
          >
            <div className="space-y-1">
              <button onClick={() => handleSelect('services')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                <LayoutGrid className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div>
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white">{t('nav.services')}</div>
                  <div className="text-[10px] text-gray-500">{language === 'cs' ? 'Co nabízíme' : 'What we offer'}</div>
                </div>
              </button>
              <button onClick={() => handleSelect('scalex')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div>
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white">SCALEX</div>
                  <div className="text-[10px] text-gray-500">Partnership</div>
                </div>
              </button>
              <button onClick={() => handleSelect('projects')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div>
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white">{language === 'cs' ? 'Reference' : 'Portfolio'}</div>
                  <div className="text-[10px] text-gray-500">{language === 'cs' ? 'Naše práce' : 'Our work'}</div>
                </div>
              </button>
              <button onClick={() => handleSelect('blog')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                <FileText className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div>
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white">Blog</div>
                  <div className="text-[10px] text-gray-500">Insights</div>
                </div>
              </button>
              <div className="h-px bg-white/10 my-1" />

              {/* Language Switcher */}
              <button onClick={toggleLanguage} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                <Globe className="w-4 h-4 text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white">
                    {language === 'cs' ? 'Jazyk' : 'Language'}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {language === 'cs' ? 'Čeština' : 'English'}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-mono ${language === 'cs' ? 'text-brand-purple' : 'text-gray-500'}`}>CZ</span>
                  <span className="text-gray-600">/</span>
                  <span className={`text-xs font-mono ${language === 'en' ? 'text-brand-purple' : 'text-gray-500'}`}>EN</span>
                </div>
              </button>

              <div className="h-px bg-white/10 my-1" />
              <button onClick={() => handleSelect('contact')} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-brand-purple/20 rounded-lg transition-colors text-left group">
                <MessageSquare className="w-4 h-4 text-brand-purple" />
                <div>
                  <div className="text-sm font-medium text-white">{t('nav.contact')}</div>
                  <div className="text-[10px] text-brand-purple/80">{t('nav.inquiry')}</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
