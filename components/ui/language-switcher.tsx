
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { analytics } from '../../lib/analytics';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'cs' as const, label: 'Čeština' },
        { code: 'en' as const, label: 'English' }
    ];

    const handleLanguageChange = (newLang: 'cs' | 'en') => {
        if (language !== newLang) {
            // Track language change
            analytics.trackLanguageChange(language, newLang);
            setLanguage(newLang);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1 bg-transparent hover:opacity-80 transition-all duration-300 group"
                aria-label={`Current language: ${language.toUpperCase()}. Click to change.`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <Globe className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white uppercase">
                    {language.toUpperCase()}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300",
                    isOpen && "rotate-180"
                )} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-36 bg-[#0B0B0C] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 z-50 backdrop-blur-xl"
                        role="listbox"
                        aria-label="Select language"
                    >
                        <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                role="option"
                                aria-selected={language === lang.code}
                                className={cn(
                                    "w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ",
                                    language === lang.code ? "text-brand-purple font-medium" : "text-gray-400 hover:text-white"
                                )}
                            >
                                <span>{lang.label}</span>
                                {language === lang.code && (
                                    <Check className="w-3.5 h-3.5 text-brand-purple" aria-hidden="true" />
                                )}
                            </button>
                        ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
