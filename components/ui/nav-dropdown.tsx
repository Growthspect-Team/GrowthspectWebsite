
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
  Globe,
  Linkedin,
  Instagram
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
            : 'gap-0 p-0'
          }`}
      >
        <div className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white text-black border-white' : 'group-hover:bg-white/10'}`}>
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
            className="absolute right-0 top-full mt-3 w-72 bg-[#0B0B0C]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-3"
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

              <div className="flex justify-center gap-3 py-2">
                 <a href="https://www.linkedin.com/in/growthspect-%E2%80%8E-046b74355/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-purple transition-colors"><Linkedin size={18} /></a>
                 <a href="https://instagram.com/growthspect" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-purple transition-colors"><Instagram size={18} /></a>
                 <a href="https://clutch.co/profile/growthspect" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-purple transition-colors flex items-center">
                    <svg width="63" height="18" viewBox="0 0 84 24" fill="none" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8555 0H25.6797V24H21.8555V0ZM39.0645 16.344C39.0645 20.017 35.9888 20.3098 35.0739 20.3098C32.788 20.3098 32.3721 18.1613 32.3721 16.8653V7.68H28.5479V16.8461C28.5479 19.1213 29.2592 20.999 30.5059 22.2509C31.6072 23.3578 33.2574 23.9626 35.0452 23.9626C36.3129 23.9626 38.1084 23.5661 39.0645 22.6896V24H42.8887V7.68H39.0645V16.344ZM50.5371 1.92H46.7129V7.68H43.8447V11.52H46.7129V24H50.5371V11.52H53.4053V7.68H50.5371V1.92ZM65.4487 19.1203C64.616 19.872 63.5166 20.2886 62.31 20.2886C59.6503 20.2886 57.697 18.3274 57.697 15.6346C57.697 12.9418 59.5881 11.063 62.31 11.063C63.4955 11.063 64.616 11.4595 65.4698 12.2112L66.0501 12.7123L68.6286 10.1242L67.9832 9.53952C66.466 8.16384 64.4516 7.392 62.3091 7.392C57.5288 7.392 54.0573 10.8557 54.0573 15.6144C54.0573 20.353 57.6119 23.9405 62.3091 23.9405C64.4917 23.9405 66.5272 23.1686 68.0253 21.7709L68.6487 21.1862L66.03 18.6L65.4487 19.1203ZM82.2782 9.10272C81.1768 7.9968 79.8861 7.392 78.0983 7.392C76.8306 7.392 75.3946 7.78848 74.4385 8.664V0H70.6143V24H74.4385V15.0096C74.4385 11.3366 77.0371 11.0448 77.952 11.0448C80.238 11.0448 80.1749 13.1942 80.1749 14.4883V24H83.9991V14.5085C83.9991 12.2333 83.5258 10.3555 82.2782 9.10272Z" fill="currentColor"></path>
                        <path d="M62.1848 12.9004C62.9181 12.9004 63.6214 13.1929 64.1399 13.7136C64.6584 14.2342 64.9497 14.9404 64.9497 15.6767C64.9497 16.413 64.6584 17.1192 64.1399 17.6399C63.6214 18.1605 62.9181 18.453 62.1848 18.453C61.4515 18.453 60.7483 18.1605 60.2297 17.6399C59.7112 17.1192 59.4199 16.413 59.4199 15.6767C59.4199 14.9404 59.7112 14.2342 60.2297 13.7136C60.7483 13.1929 61.4515 12.9004 62.1848 12.9004Z" fill="currentColor"></path>
                        <path d="M16.5025 17.972C15.0483 19.4744 13.0731 20.2885 10.9946 20.2885C6.73446 20.2885 3.63684 16.9285 3.63684 12.3167C3.63684 7.68371 6.73446 4.32371 10.9946 4.32371C13.053 4.32371 15.0062 5.13684 16.4824 6.61907L17.0637 7.20372L19.6202 4.63668L19.059 4.05204C16.9394 1.86036 14.0712 0.671875 10.9946 0.671875C4.71813 0.671875 0 5.68019 0 12.3368C0 18.9733 4.73917 23.9615 10.9946 23.9615C14.0923 23.9615 16.9604 22.7519 19.08 20.5602L19.6412 19.9756L17.1057 17.3672L16.5025 17.972Z" fill="currentColor"></path>
                    </svg>
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
