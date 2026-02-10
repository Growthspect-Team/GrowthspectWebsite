import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { services } from "../../lib/data";
import { Container, Section, FadeIn } from "../UI";
import { cn } from "../../lib/utils";

// Mapování detailních funkcí k jednotlivým službám (pro vizuální styl jako Cleevio)
const serviceFeatures: Record<string, string[]> = {
  'ai-agents': [
    "Analýza dat a predikce",
    "Automatizace zákaznické péče",
    "Optimalizace interních procesů",
    "24/7 Autonomní operace",
    "Integrace LLM modelů"
  ],
  'automation': [
    "End-to-end workflow orchestrace",
    "Pokročilý data scraping",
    "Komplexní systémové integrace",
    "Automatizovaný reporting",
    "Eliminace manuálních chyb"
  ],
  'software': [
    "Webové aplikace na míru",
    "Interní firemní nástroje",
    "Škálovatelná cloud architektura",
    "Bezpečnostní audit a hardening",
    "Moderní frontend (React/Next.js)"
  ],
  'rust': [ // Infrastruktura
    "High-performance backendy (Rust)",
    "Paměťová bezpečnost",
    "Mission-critical systémy",
    "Mikroslužby a kontejnerizace",
    "Nízkolatenční API"
  ],
  'data': [
    "Real-time datové pipelines",
    "Unifikace datových zdrojů",
    "Data Warehousing",
    "Business Intelligence API",
    "Zpracování Big Data"
  ]
};

export const ServicesAccordion = ({ onSelectService }: { onSelectService: (id: string) => void }) => {
  const [activeId, setActiveId] = useState<string | null>(services[0].id);

  return (
    <Section id="services" className="bg-brand-black relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <Container className="relative z-10">
        <FadeIn>
           <div className="mb-16 md:mb-24">
             <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
                Platformy
             </span>
             <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6">
                Komplexní <span className="text-gray-400">ekosystém</span>
              </h2>
           </div>
        </FadeIn>

        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => {
            const isActive = activeId === service.id;
            const features = serviceFeatures[service.id] || [];

            return (
              <div 
                key={service.id}
                className={cn(
                    "border-b border-white/10 transition-colors duration-500 group",
                    isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
              >
                <button
                  onClick={() => setActiveId(isActive ? null : service.id)}
                  className="w-full text-left py-8 md:py-10 flex items-center justify-between group-hover:pl-4 transition-all duration-300"
                >
                    <span className={cn(
                        "text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-300",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                    )}>
                        {service.title}
                    </span>
                    <span className={cn(
                        "p-2 rounded-full border transition-all duration-300",
                        isActive ? "border-sky-400 text-sky-400 rotate-45" : "border-white/10 text-gray-500 group-hover:border-white/30"
                    )}>
                        <Plus className="w-6 h-6" />
                    </span>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pb-16 pt-2 flex flex-col md:flex-row gap-8 md:gap-20">
                         {/* Icon section */}
                         <div className="md:w-1/3">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/10 to-brand-purple/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-6">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-lg mb-8">
                                {service.description}
                            </p>
                            
                            <button 
                                onClick={() => onSelectService(service.id)}
                                className="flex items-center gap-2 text-white bg-gradient-to-r from-sky-500/10 to-brand-purple/10 hover:from-sky-500 hover:to-brand-purple hover:text-white border border-sky-400/20 hover:border-transparent px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium tracking-wide group/btn w-fit"
                            >
                                Prozkoumat službu <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                         </div>

                         {/* Features list (Right side) */}
                         <div className="md:w-2/3 border-l border-white/5 pl-0 md:pl-12 pt-6 md:pt-0">
                             <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
                                Hlavní features
                             </h4>
                             <ul className="space-y-4">
                                {features.map((feature, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-lg md:text-xl text-gray-300 flex items-center gap-4 hover:text-white transition-colors"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-brand-purple md:mt-1" />
                                        {feature}
                                    </motion.li>
                                ))}
                             </ul>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
