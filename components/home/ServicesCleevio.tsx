
import React from "react";
import { servicesCleevioData, servicesCleevioDataCs } from "./ServicesCleevioData";
import { useLanguage } from "../LanguageContext";

export const ServicesCleevio: React.FC = () => {
  const { language, t } = useLanguage();
  const servicesData = language === 'cs' ? servicesCleevioDataCs : servicesCleevioData;

  return (
    <section className="bg-black text-white relative w-full pt-20 lg:pt-0">
      <div className="w-full max-w-[1920px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row">
              <div className="lg:w-5/12 p-8 xl:p-16 pt-0 pb-8 lg:py-16">
                  <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-6 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
                      {t('services.badge')}
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('services.main_title')}</h2>
                  <p className="text-gray-400 text-lg lg:text-xl max-w-2xl">{t('services.main_subtitle')}</p>
              </div>
              <div className="hidden lg:block lg:w-7/12"></div>
          </div>

      {servicesData.map((service, index) => {
        // Engineering is "long" -> relative positioning so it scrolls naturally
        // Others are sticky -> they stack
        const isLongService = service.subSections && service.subSections.length > 0;

        return (
        <React.Fragment key={service.id}>
           <div 
             className={`${isLongService ? 'relative' : 'sticky top-0'} flex flex-col lg:flex-row min-h-screen group bg-black ${index > 0 ? 'shadow-[0_-1px_0_rgba(255,255,255,0.1)]' : ''}`}
             id={`service-${service.id}`}
             style={{ zIndex: index + 1 }}
           >
             {/* Gradient Separator */}
             {index > 0 && (
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 z-20" />
             )}
             
             {/* LEFT COLUMN */}
             <div className={`lg:w-5/12 flex flex-col justify-between p-8 xl:p-16 ${isLongService ? 'lg:sticky lg:top-0 lg:h-screen' : 'relative lg:h-screen'} bg-black`}>
               {/* Header / Step */}
                <div className="flex flex-col gap-6 z-10 pt-12 lg:pt-24 justify-center h-full">
                    
                    <h2 
                        className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight transition-colors"
                    >
                        {service.title}
                    </h2>

                     {/* Image */}
                    <div className="mt-8 relative w-full aspect-square max-w-[300px] mx-auto opacity-60">
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
             <div className="lg:w-7/12 p-8 md:px-16 md:py-12 xl:px-24 xl:py-12 flex flex-col justify-center bg-black min-h-screen">
                
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
                                                    <span className="block w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0" />
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
                                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,#8825ed,#ae1fed)] opacity-50" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                </div>

             </div>
           </div>
        </React.Fragment>
        );
      })}
      </div>
    </section>
  );
};
