
import React from "react";
import { servicesCleevioData, servicesCleevioDataCs } from "./ServicesCleevioData";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const ServicesCleevio: React.FC = () => {
  const { language, t } = useLanguage();
  const servicesData = language === 'cs' ? servicesCleevioDataCs : servicesCleevioData;

  const [isMobile, setIsMobile] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="bg-black text-white relative w-full pt-20 sm:pt-32 lg:pt-52 pb-16 lg:pb-32 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row"
          >
              <div className="lg:w-9/12">
                  <span className="text-sm font-sans font-medium uppercase tracking-widest block mb-10 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
                      {t('services.badge')}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-12 leading-[1.1]">
                    {t('services.main_title')}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                      {t('services.main_title_highlight')}
                    </span>
                  </h2>
                  <p className="text-[22px] text-gray-400 max-w-3xl mb-12 leading-[1.25] font-light">
                    {t('services.main_subtitle')}
                  </p>
              </div>
              <div className="hidden lg:block lg:w-3/12"></div>
          </motion.div>

      {isMobile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col border-t border-white/10 mt-8"
        >
            {servicesData.map((service) => {
                const isOpen = expandedId === service.id;
                return (
                    <div key={service.id} className="border-b border-white/10">
                        <button
                            onClick={() => setExpandedId(isOpen ? null : service.id)}
                            className="flex items-center justify-between w-full py-6 text-left group"
                        >
                            <h3 className="text-2xl font-bold text-white group-hover:text-brand-purple transition-colors pr-4">
                                {service.title}
                            </h3>
                            <div className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 pt-2">
                                        <div className="relative w-24 h-24 mb-6 opacity-80">
                                            <img
                                                src={service.image}
                                                alt=""
                                                className="w-full h-full object-contain object-left"
                                            />
                                        </div>
                                        {service.description && (
                                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                        )}
                                        {service.subSections && (
                                            <div className="flex flex-col gap-8">
                                                {service.subSections.map((sub, i) => (
                                                    <div key={i} className="flex flex-col gap-4 pl-4 border-l border-white/10">
                                                        <h4 className="text-xl font-semibold text-white">{sub.title}</h4>
                                                        {sub.items && (
                                                            <ul className="space-y-2">
                                                                {sub.items.map((subItem, idx) => (
                                                                    <li key={idx} className="text-gray-400 text-sm leading-relaxed flex items-start gap-3">
                                                                        <span className="block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-brand-purple mt-2 flex-shrink-0" />
                                                                        {subItem}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {!service.subSections && service.features && (
                                            <div className="flex flex-col gap-0">
                                                {service.features.map((feature, i) => (
                                                    <div key={i} className="relative py-3 flex items-center justify-between">
                                                        <h4 className="text-base font-medium text-gray-300">
                                                            {feature}
                                                        </h4>
                                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,#0ea5e9,#8825ed,#ae1fed)] opacity-30" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </motion.div>
      ) : (
      servicesData.map((service, index) => {
        // Engineering is "long" -> relative positioning so it scrolls naturally
        // Others are sticky -> they stack
        const isLongService = service.subSections && service.subSections.length > 0;

        return (
        <React.Fragment key={service.id}>
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6, delay: index * 0.1 }}
             className={`${isLongService ? 'relative' : (isMobile ? 'relative' : 'sticky top-0')} flex flex-col lg:flex-row ${isMobile ? 'min-h-0' : 'min-h-screen'} group bg-black ${index > 0 ? 'shadow-[0_-1px_0_rgba(255,255,255,0.1)]' : ''}`}
             id={`service-${service.id}`}
             style={{ zIndex: index + 1 }}
           >
             {/* Gradient Separator */}
             {index > 0 && (
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-50 z-20" />
             )}
             
             {/* LEFT COLUMN */}
             <div className={`lg:w-5/12 flex flex-col justify-between py-6 lg:py-8 ${isLongService ? 'lg:sticky lg:top-0 lg:h-screen' : (isMobile ? 'relative' : 'relative lg:h-screen')} bg-black`}>
               {/* Header / Step */}
                <div className="flex flex-col gap-4 lg:gap-6 z-10 pt-8 lg:pt-24 justify-center h-full">
                    
                    <h2 
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight transition-colors"
                    >
                        {service.title}
                    </h2>

                     {/* Image */}
                    <div className={`mt-4 lg:mt-8 relative w-full aspect-square ${isMobile ? 'max-w-[200px]' : 'max-w-[300px]'} mx-auto opacity-60`}>
                         <img 
                          src={service.image} 
                          alt="" 
                          className="w-full h-full object-contain object-center"
                        />
                        {/* Cloud Fix */}
                        {service.id === 'cloud' && (
                            <div className="absolute bottom-0 left-0 w-full h-20 bg-black translate-y-2"></div>
                        )}
                    </div>
                </div>

             </div>

             {/* RIGHT CONTENT */}
             <div className={`lg:w-7/12 py-6 md:py-12 flex flex-col justify-center bg-black ${isMobile ? 'min-h-0' : 'min-h-screen'}`}>
                
                <div className="max-w-2xl mx-auto w-full"> 
                    
                    {/* Main Description */}
                    {service.description && (
                      <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12">
                         {service.description}
                      </p>
                    )}

                    {/* SubSection Content (Engineering) */}
                    {service.subSections && (
                        <div className="flex flex-col gap-16">
                            {service.subSections.map((sub, i) => (
                                <div key={i} className="flex flex-col gap-6 border-l-2 border-white/10 pl-8 py-2">
                                    <h3 className="text-3xl font-semibold text-white mb-2">{sub.title}</h3>
                                    
                                    {sub.items && (
                                        <ul className="space-y-3 mb-4">
                                            {sub.items.map((subItem, idx) => (
                                                <li key={idx} className="text-gray-400 text-lg leading-relaxed flex items-start gap-3">
                                                    <span className="block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-brand-purple mt-2.5 flex-shrink-0" />
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {sub.techStack && (
                                        <div className="mt-2">
                                            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2 font-mono text-sm text-gray-400">
                                                {sub.techStack.map((stack, idx) => (
                                                    <span key={idx} className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs">
                                                        {stack}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                     {sub.icons && (
                                        <div className="flex flex-wrap gap-4 pt-4 mt-auto">
                                            {sub.icons.map((icon, iconIdx) => (
                                                <div key={iconIdx} className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity text-white">
                                                    {icon}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Standard Service Content (AI, Design, Cloud) */}
                    {!service.subSections && (
                        <>
                             {/* Features List */}
                            {service.features && (
                                <div className="flex flex-col mb-12">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="relative py-4 flex items-center justify-between group/item hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg cursor-default">
                                            <h3 className="text-xl font-medium text-gray-300 group-hover/item:text-white transition-colors">
                                                {feature}
                                            </h3>
                                            {/* Gradient Separator - removed condition to show on last item too */}
                                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,#0ea5e9,#8825ed,#ae1fed)] opacity-30" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                </div>

             </div>
           </motion.div>
        </React.Fragment>
        );
      })
      )}
      </div>
    </section>
  );
};
