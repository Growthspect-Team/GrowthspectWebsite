import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { X, Check } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useLanguage();

  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        // Simple delay to not show immediately on load
       const timer = setTimeout(() => setIsVisible(true), 1000);
       return () => clearTimeout(timer);
    } else {
        // Load saved preferences if available
        const savedPrefs = localStorage.getItem('cookie-preferences');
        if (savedPrefs) {
            try {
                setPreferences(JSON.parse(savedPrefs));
            } catch (e) {
                console.error('Error parsing cookie preferences', e);
            }
        }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify({ analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookie-consent', 'denied');
    localStorage.setItem('cookie-preferences', JSON.stringify({ analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setShowPreferences(false);
    setIsVisible(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
           key="success-toast"
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
           className="fixed bottom-6 right-6 z-[120] bg-white text-black px-6 py-4 rounded-full shadow-2xl flex items-center gap-3"
        >
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Check size={14} strokeWidth={3} />
            </div>
            <span className="font-semibold text-sm">{t('cookie.preferences.success')}</span>
        </motion.div>
      )}

      {isVisible && !showPreferences && !showSuccess && (
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
                onClick={() => setShowPreferences(true)}
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

      {showPreferences && (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowPreferences(false)}
         >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">{t('cookie.preferences.title')}</h3>
                    <button 
                        onClick={() => setShowPreferences(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 mb-8">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 opacity-70 cursor-not-allowed">
                        <span className="text-sm font-medium text-white">{t('cookie.preferences.necessary')}</span>
                        <div className="w-5 h-5 rounded border border-white/30 bg-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-sm" />
                        </div>
                    </div>

                    {/* Analytics */}
                    <div 
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    >
                        <span className="text-sm font-medium text-white">{t('cookie.preferences.analytics')}</span>
                         <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${preferences.analytics ? 'bg-white border-white' : 'border-white/30'}`}>
                            {preferences.analytics && <div className="w-3 h-3 bg-black rounded-sm" />}
                        </div>
                    </div>

                     {/* Marketing */}
                     <div 
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    >
                        <span className="text-sm font-medium text-white">{t('cookie.preferences.marketing')}</span>
                         <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${preferences.marketing ? 'bg-white border-white' : 'border-white/30'}`}>
                            {preferences.marketing && <div className="w-3 h-3 bg-black rounded-sm" />}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleSavePreferences}
                        className="flex-1 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                    >
                        {t('cookie.preferences.save')}
                    </button>
                </div>
            </motion.div>
         </motion.div>
      )}
    </AnimatePresence>
  );
};
