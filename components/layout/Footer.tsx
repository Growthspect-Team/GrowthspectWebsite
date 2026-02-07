import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Instagram, Linkedin, Github, Hand, ArrowUpRight, Phone, Mail, Map, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/constants';
import { motion } from 'framer-motion';

interface FooterProps {
    onNavigate?: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
      // If onNavigate is provided, use it for SPA navigation
      if (onNavigate) {
          e.preventDefault();
          if (id === 'home' || id === 'projects') {
              onNavigate('home');
              if (id === 'projects') {
                  setTimeout(() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
              }
          } else {
            onNavigate(id);
          }
      }
      // Fallback to default href behavior if onNavigate is missing
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black text-white p-2 md:p-6 lg:p-8 min-h-screen flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden flex flex-col"
      >
        
        {/* Top Bar with "Back to top" */}
        <div className="absolute top-8 right-8 z-20">
            <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
                <span className="opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300 ease-in-out hidden md:inline-block">
                    Zpátky nahoru
                </span>
                <span className="p-2 bg-white/5 rounded-full group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                     <ArrowUpRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                </span>
            </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full flex-1">
            
            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col relative z-10 w-full">
                
                {/* Upper Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 lg:mb-auto w-full">
                    
                    {/* CTA Column */}
                    <div className="lg:col-span-5 flex flex-col items-start justify-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-3xl md:text-4xl lg:text-6xl font-sans font-medium mb-8 leading-tight"
                        >
                            Připraveni na váš <br />
                            <span className="text-gray-500">další velký projekt?</span>
                        </motion.h2>
                        
                        <motion.a 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            href="mailto:team@growthspect.com" 
                            className="group flex items-center gap-3 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(136,37,237,0.3)] hover:shadow-[0_0_30px_rgba(136,37,237,0.5)] w-fit"
                        >
                            Pojďme začít
                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </motion.a>

                        <motion.div 
                             initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }}
                             transition={{ delay: 0.6 }}
                             className="mt-8 flex items-center gap-2 text-sm text-gray-500"
                        >
                             <div className="flex text-brand-purple">
                                 {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                             </div>
                             <span>{t('footer.badge')}</span>
                        </motion.div>
                    </div>

                    {/* Navigation Columns */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-3 lg:col-start-7 flex flex-col gap-4"
                    >
                        <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-4">Prozkoumat</h3>
                        <ul className="space-y-3">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <a 
                                        href={`/?view=${item.id}`} 
                                        onClick={(e) => handleNavClick(e, item.id)}
                                        className="text-lg md:text-xl text-white w-fit pb-1 hover-underline-animation purple left no-underline"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:col-span-3 flex flex-col gap-4"
                    >
                        <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-4">Ozvěte se</h3>
                        
                        <div className="space-y-6">
                            <a href="mailto:team@growthspect.com" className="flex items-center gap-3 text-lg text-white hover:text-brand-purple transition-colors group">
                                <Mail className="w-5 h-5 text-gray-500 group-hover:text-brand-purple transition-colors" />
                                team@growthspect.com
                            </a>
                            <a href="tel:+420775371556" className="flex items-center gap-3 text-lg text-white hover:text-brand-purple transition-colors group">
                                <Phone className="w-5 h-5 text-gray-500 group-hover:text-brand-purple transition-colors" />
                                +420 775 371 556
                            </a>

                             {/* Social Icons moved here */}
                             <div className="flex gap-4 mt-4">
                                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300"><Linkedin size={18}/></a>
                                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300"><Github size={18}/></a>
                                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300"><Instagram size={18}/></a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Big Footer Text - Full Width Now */}
                <div className="mt-auto pt-20 pb-8 w-full flex justify-center overflow-hidden">
                    <motion.h1 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-[9vw] md:text-[10.5vw] leading-none font-bold text-white/5 tracking-tighter select-none whitespace-nowrap hover:text-white/10 transition-colors duration-700 cursor-default w-full text-center"
                    >
                        GROWTHSPECT
                    </motion.h1>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs lg:text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-white">Growthspect</span>
                        <span>© 2026 GrowthSpect s.r.o.</span>
                    </div>
                    
                    <div className="flex gap-6">
                        <a 
                            href="/privacy-policy" 
                            onClick={(e) => {
                                if (onNavigate) {
                                    e.preventDefault();
                                    onNavigate('privacy-policy');
                                }
                            }}
                            className="hover:text-white transition-colors whitespace-nowrap"
                        >
                            Ochrana osobních údajů
                        </a>
                        <span className="hidden md:inline">Built for future.</span>
                    </div>
                </div>

            </div>
        </div>
      </motion.div>
    </footer>
  );
};

