import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { services } from "../../lib/data";
import { Section, Container, FadeIn } from "../UI";
import { cn } from "../../lib/utils";
import { ArrowRight, Plus } from "lucide-react";

// -- Data & mapování features --
const serviceFeatures: Record<string, string[]> = {
  'ai-agents': [
    "Generativní AI konzultace",
    "Agentní systémy a AI automatizace",
    "LLM Integrace",
    "Machine learning",
    "Modernizace zastaralých systémů"
  ],
  'automation': [
    "End-to-end workflow orchestrace",
    "Pokročilý data scraping",
    "Komplexní systémové integrace",
    "Automatizovaný reporting",
    "Eliminace manuálních chyb"
  ],
  'software': [
    "Custom Software",
    "Webové aplikace na míru",
    "Interní firemní nástroje",
    "Škálovatelná cloud architektura",
    "Moderní frontend (React/Next.js)"
  ],
  'rust': [ // Infrastruktura
    "Cloudové poradenství",
    "Vývoj cloudové infrastruktury",
    "DevOps",
    "Migrace a modernizace cloudu",
    "High-performance backendy"
  ],
  'data': [
    "Real-time datové pipelines",
    "Unifikace datových zdrojů",
    "Data Warehousing",
    "Business Intelligence API",
    "Zpracování Big Data"
  ]
};

const ServiceItem = ({
  service,
  isActive,
  onClick,
  features,
  indexRaw
}: {
  service: any,
  isActive: boolean,
  onClick: () => void,
  features: string[],
  indexRaw: number
}) => {
  return (
    <motion.div
        layout
        className={cn(
            "border-t border-white/10 overflow-hidden relative group",
            isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
        )}
        initial={false}
        onClick={onClick}
    >
      {/* Container for content */}
      <motion.div 
        layout 
        className={cn(
            "w-full flex flex-col md:flex-row px-4 md:px-0 transition-all duration-500",
            isActive ? "py-12 md:py-16" : "py-6 md:py-8 items-center"
        )}
      >
        
        {/* Left / Title Section */}
        <motion.div 
            layout 
            className={cn(
                "flex flex-col relative z-20 transition-all duration-500",
                isActive ? "w-full md:w-5/12 ml-0" : "w-full ml-0"
            )}
        >
             {/* Icon - Large when active, hidden/different when inactive? 
                 Cleevio logic: Active shows big icon above title. Inactive shows nothing or small. 
             */}
             <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                         <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-lg shadow-brand-purple/10">
                            <service.icon className="w-8 h-8 md:w-10 md:h-10" />
                         </div>
                    </motion.div>
                )}
             </AnimatePresence>

             <div className="flex items-center justify-between w-full">
                <motion.h3 
                    layout="position"
                    className={cn(
                        "font-bold tracking-tight transition-colors duration-300 leading-tight",
                        isActive ? "text-4xl md:text-6xl text-white" : "text-2xl md:text-3xl text-gray-500 group-hover:text-gray-300"
                    )}
                >
                    {service.title}
                </motion.h3>
                
                {/* Plus Icon only when inactive */}
                {!isActive && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 ml-4 group-hover:border-brand-purple group-hover:text-white transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </motion.div>
                )}
             </div>

             {/* Description - Only Active */}
             <AnimatePresence>
                 {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="mt-6 md:mt-8 max-w-sm"
                    >
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed hidden md:block">
                            {service.description}
                        </p>
                    </motion.div>
                 )}
             </AnimatePresence>
        </motion.div>

        {/* Right / Content Section - Only Active */}
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full md:w-7/12 mt-8 md:mt-0 md:pl-16 md:border-l border-white/5 flex flex-col justify-end"
                >
                     <div className="space-y-4">
                        {features.map((feature, i) => (
                             <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                className="group/item flex items-center gap-4 cursor-pointer"
                             >
                                <span className="h-px w-4 bg-brand-purple/50 group-hover/item:w-8 group-hover/item:bg-brand-purple transition-all duration-300" />
                                <span className="text-lg md:text-xl text-gray-300 group-hover/item:text-white transition-colors font-medium">
                                    {feature}
                                </span>
                             </motion.div>
                        ))}
                     </div>
                     
                     <div className="mt-10 md:mt-12">
                         <button 
                             className="flex items-center gap-3 text-brand-purple hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group/btn"
                             onClick={(e) => {
                                 e.stopPropagation();
                                 onClick();
                             }}
                         >
                             Více informací <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                         </button>
                     </div>
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
};

export const ServicesScrollAccordion = ({ onSelectService }: { onSelectService: (id: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Cleevio has a long scroll distance to give distinct pauses
  const SCROLL_FACTOR = 0.8; // Multiplier for screen height per item
  const TOTAL_HEIGHT = (services.length * 80); // vh units

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      const totalSteps = services.length;
      const exactStep = latest * totalSteps;
      const index = Math.min(
          Math.floor(exactStep),
          totalSteps - 1
      );
      
      if (index !== activeStep) {
          setActiveStep(index);
      }
  });

  return (
    <div className="relative bg-brand-black">
         {/* Container for scroll height */}
        <div ref={containerRef} style={{ height: `${TOTAL_HEIGHT}vh` }} className="absolute inset-0 w-full pointer-events-none" />

        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <Section id="services" className="w-full">
                <Container className="relative">
                    {/* Brand Header - similar to Cleevio subtle top nav or section indicator */}
                    <div className="absolute top-0 left-4 md:left-8 top-8 opacity-50 hidden md:block">
                        <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                            Platformy & Služby
                        </span>
                    </div>

                     {/* The Accordion List */}
                    <div className="flex flex-col w-full max-w-5xl mx-auto border-b border-white/10">
                        {services.map((service, index) => (
                            <ServiceItem
                                key={service.id}
                                service={service}
                                isActive={activeStep === index}
                                onClick={() => onSelectService(service.id)}
                                features={serviceFeatures[service.id] || []}
                                indexRaw={index}
                            />
                        ))}
                    </div>

                </Container>
            </Section>
        </div>
    </div>
  );
};
