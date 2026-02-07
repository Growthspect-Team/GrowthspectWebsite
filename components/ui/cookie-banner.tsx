import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        // Simple delay to not show immediately on load
       const timer = setTimeout(() => setIsVisible(true), 1000);
       return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[100] max-w-[640px] w-[calc(100%-3rem)] bg-[#0A0A0A] text-white rounded-2xl shadow-2xl shadow-black/50 p-4 border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 flex-grow">
              <h3 className="text-base font-bold tracking-tight whitespace-nowrap text-white">{t('cookie.title')}</h3>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <p className="text-sm text-gray-400">
                {t('cookie.description')}{" "}
                <a href="#" className="underline underline-offset-2 hover:text-white transition-colors">{t('cookie.policy')}</a>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
               <button 
                onClick={() => {}}
                className="hidden md:block text-xs font-medium text-gray-500 hover:text-white transition-colors mr-2"
               >
                 {t('cookie.preferences')}
               </button>
               
                 <button
                    onClick={handleDeny}
                    className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                 >
                    {t('cookie.deny')}
                 </button>
                 <button
                    onClick={handleAccept}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
                 >
                    {t('cookie.accept')}
                 </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
