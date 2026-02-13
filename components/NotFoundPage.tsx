import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const content = {
        cs: {
            title: '404',
            subtitle: 'Stránka nenalezena',
            description: 'Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.',
            homeButton: 'Zpět na hlavní stránku',
            contactButton: 'Kontaktujte nás',
        },
        en: {
            title: '404',
            subtitle: 'Page Not Found',
            description: "Sorry, the page you're looking for doesn't exist or has been moved.",
            homeButton: 'Back to Homepage',
            contactButton: 'Contact Us',
        },
    };

    const t = content[language];

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 text-center max-w-xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Large 404 */}
                    <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent select-none">
                        {t.title}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 -mt-6">
                        {t.subtitle}
                    </h2>
                    <p className="text-white/50 text-base md:text-lg mb-10 max-w-md mx-auto">
                        {t.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3.5 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                    >
                        {t.homeButton}
                    </button>
                    <button
                        onClick={() => navigate('/contact')}
                        className="px-8 py-3.5 border border-white/20 hover:border-white/40 text-white rounded-full font-medium transition-all duration-200 hover:scale-105"
                    >
                        {t.contactButton}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
