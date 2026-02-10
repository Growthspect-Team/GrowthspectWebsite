import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Instagram, Linkedin, Hand, ArrowUpRight, Phone, Mail, Map, MapPin } from 'lucide-react';
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
                            href="/contact"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onNavigate) onNavigate('contact');
                            }}
                            className="group flex items-center gap-3 bg-[linear-gradient(90deg,#0ea5e9,#8825ed,#ae1fed)] hover:opacity-90 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3),0_0_30px_rgba(136,37,237,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5),0_0_40px_rgba(136,37,237,0.5)] w-fit"
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
                             <div className="flex text-[#8825ed]">
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
                        <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-4">Connect</h3>
                        
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
                                 <a href="https://www.linkedin.com/in/growthspect-%E2%80%8E-046b74355/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300"><Linkedin size={18}/></a>
                                 <a href="https://instagram.com/growthspect" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300"><Instagram size={18}/></a>
                                 <a href="https://clutch.co/profile/growthspect" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300">
                                    <svg width="63" height="18" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2320_51751)">
                                            <path d="M21.8555 0H25.6797V24H21.8555V0ZM39.0645 16.344C39.0645 20.017 35.9888 20.3098 35.0739 20.3098C32.788 20.3098 32.3721 18.1613 32.3721 16.8653V7.68H28.5479V16.8461C28.5479 19.1213 29.2592 20.999 30.5059 22.2509C31.6072 23.3578 33.2574 23.9626 35.0452 23.9626C36.3129 23.9626 38.1084 23.5661 39.0645 22.6896V24H42.8887V7.68H39.0645V16.344ZM50.5371 1.92H46.7129V7.68H43.8447V11.52H46.7129V24H50.5371V11.52H53.4053V7.68H50.5371V1.92ZM65.4487 19.1203C64.616 19.872 63.5166 20.2886 62.31 20.2886C59.6503 20.2886 57.697 18.3274 57.697 15.6346C57.697 12.9418 59.5881 11.063 62.31 11.063C63.4955 11.063 64.616 11.4595 65.4698 12.2112L66.0501 12.7123L68.6286 10.1242L67.9832 9.53952C66.466 8.16384 64.4516 7.392 62.3091 7.392C57.5288 7.392 54.0573 10.8557 54.0573 15.6144C54.0573 20.353 57.6119 23.9405 62.3091 23.9405C64.4917 23.9405 66.5272 23.1686 68.0253 21.7709L68.6487 21.1862L66.03 18.6L65.4487 19.1203ZM82.2782 9.10272C81.1768 7.9968 79.8861 7.392 78.0983 7.392C76.8306 7.392 75.3946 7.78848 74.4385 8.664V0H70.6143V24H74.4385V15.0096C74.4385 11.3366 77.0371 11.0448 77.952 11.0448C80.238 11.0448 80.1749 13.1942 80.1749 14.4883V24H83.9991V14.5085C83.9991 12.2333 83.5258 10.3555 82.2782 9.10272Z" fill="currentColor"></path>
                                            <path d="M62.1848 12.9004C62.9181 12.9004 63.6214 13.1929 64.1399 13.7136C64.6584 14.2342 64.9497 14.9404 64.9497 15.6767C64.9497 16.413 64.6584 17.1192 64.1399 17.6399C63.6214 18.1605 62.9181 18.453 62.1848 18.453C61.4515 18.453 60.7483 18.1605 60.2297 17.6399C59.7112 17.1192 59.4199 16.413 59.4199 15.6767C59.4199 14.9404 59.7112 14.2342 60.2297 13.7136C60.7483 13.1929 61.4515 12.9004 62.1848 12.9004Z" fill="currentColor"></path>
                                            <path d="M16.5025 17.972C15.0483 19.4744 13.0731 20.2885 10.9946 20.2885C6.73446 20.2885 3.63684 16.9285 3.63684 12.3167C3.63684 7.68371 6.73446 4.32371 10.9946 4.32371C13.053 4.32371 15.0062 5.13684 16.4824 6.61907L17.0637 7.20372L19.6202 4.63668L19.059 4.05204C16.9394 1.86036 14.0712 0.671875 10.9946 0.671875C4.71813 0.671875 0 5.68019 0 12.3368C0 18.9733 4.73917 23.9615 10.9946 23.9615C14.0923 23.9615 16.9604 22.7519 19.08 20.5602L19.6412 19.9756L17.1057 17.3672L16.5025 17.972Z" fill="currentColor"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2320_51751">
                                                <rect width="84" height="24" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                 </a>
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
                        <span>© 2026 Všechna práva vyhrazena</span>
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

