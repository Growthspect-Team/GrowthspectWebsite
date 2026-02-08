import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../../lib/data";
import { ArrowRight, Plus } from "lucide-react";

export const ServicesHorizontal = ({ onSelectService }: { onSelectService?: (id: string) => void }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Fixed scroll range for reliable navigation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-neutral-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Grid - subtle and technical */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }} />

        <motion.div 
            style={{ x }} 
            className="flex gap-8 md:gap-12 px-8 md:px-20 items-center"
        >
           {/* 1. Intro Block - Stays dark to contrast with the cards */}
           <div className="shrink-0 w-[85vw] md:w-[500px] flex flex-col justify-center max-w-2xl pr-10">
                <span className="text-brand-purple font-sans font-medium text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-brand-purple"></span>
                    Portfolio Služeb
                </span>
                <h2 className="text-5xl md:text-7xl font-sans font-medium text-white tracking-tight mb-8 leading-[1.1]">
                    Vytváříme<br/>
                    <span className="text-neutral-500 italic">digitální</span><br/>
                    budoucnost.
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed max-w-md">
                    Prozkoumejte naše klíčové oblasti expertízy. Od vývoje na míru po pokročilou umělou inteligenci.
                </p>
           </div>

           {/* 2. Service Cards - Uniform Size, Clean "Cleevio-like" structure */}
           {services.map((service, index) => (
             <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                onClick={() => onSelectService?.(service.id)} 
             />
           ))}
           
           {/* Extra spacer at the end */}
           <div className="shrink-0 w-40"></div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, onClick }: any) => {
    const i = index + 1;
    const num = i.toString().padStart(2, '0');

    return (
        <div 
            onClick={onClick}
            className="shrink-0 w-[85vw] md:w-[480px] h-[60vh] md:h-[600px] bg-white text-black p-8 md:p-12 flex flex-col justify-between group cursor-pointer transition-all duration-500 border border-white/10 overflow-hidden relative"
        >
             {/* Hover effect accent line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

             {/* Top Section */}
             <div>
                <div className="flex justify-between items-start mb-10">
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-6 h-6 text-brand-purple" strokeWidth={1.5} />
                    </div>
                    <span className="text-neutral-200 font-mono text-4xl font-semibold select-none">
                        {num}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-8 leading-tight tracking-tight">
                    {service.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-[1px] bg-neutral-200 mb-8 group-hover:w-full transition-all duration-700 ease-out" />

                {/* Important Information List */}
                <div className="space-y-3">
                    {service.features?.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 group/item">
                            <Plus className="w-4 h-4 text-brand-purple/40 group-hover/item:text-brand-purple transition-colors" />
                            <span className="text-neutral-600 text-sm md:text-base font-medium group-hover/item:text-neutral-900 transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                    {/* Fallback description if no features */}
                    {!service.features && (
                         <p className="text-neutral-500 text-sm leading-relaxed">{service.description}</p>
                    )}
                </div>
             </div>

             {/* Bottom Action */}
             <div className="flex items-center justify-between mt-auto pt-8 border-t border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Zjistit více
                </span>
                <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-brand-purple group-hover:border-brand-purple group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
             </div>
        </div>
    )
}
