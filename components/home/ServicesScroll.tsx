import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "../../lib/data";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export const ServicesScroll = ({ onSelectService }: { onSelectService: (id: string) => void }) => {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section className="bg-black text-white relative">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN - STICKY MENU */}
        <div className="hidden lg:flex w-1/3 flex-col justify-center h-screen sticky top-0 pl-16 xl:pl-24 z-20 pointer-events-none">
          <div className="space-y-6 pointer-events-auto">
             <h2 className="text-sm font-mono text-brand-purple tracking-widest uppercase mb-10 opacity-70">
                Naše Služby
             </h2>
             <div className="flex flex-col gap-4">
                {services.map((service) => (
                    <ServiceMenuItem 
                        key={service.id} 
                        service={service} 
                        isActive={service.id === activeId} 
                        onClick={() => {
                            const el = document.getElementById(`service-${service.id}`);
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />
                ))}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SCROLLABLE CONTENT */}
        <div className="w-full lg:w-2/3 relative z-10">
            {services.map((service, index) => (
                <ServiceSection 
                    key={service.id} 
                    service={service} 
                    index={index}
                    setActiveId={setActiveId}
                    onSelect={onSelectService}
                />
            ))}
        </div>

      </div>
    </section>
  );
};

const ServiceMenuItem = ({ service, isActive, onClick }: { service: any, isActive: boolean, onClick: () => void }) => {
    return (
        <motion.button 
            onClick={onClick}
            className="group text-left flex items-center gap-4 py-2 transition-all duration-300 w-fit"
            animate={{ 
                x: isActive ? 10 : 0,
                opacity: isActive ? 1 : 0.4
            }}
        >
            <span className={cn(
                "text-2xl xl:text-3xl font-medium tracking-tight transition-colors duration-300",
                isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
            )}>
                {service.title}
            </span>
        </motion.button>
    )
}

const ServiceSection = ({ service, index, setActiveId, onSelect }: { service: any, index: number, setActiveId: (id: string) => void, onSelect: (id: string) => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    useEffect(() => {
        if (isInView) {
            setActiveId(service.id);
        }
    }, [isInView, service.id, setActiveId]);

    return (
        <div 
            id={`service-${service.id}`}
            ref={ref}
            className="min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-20 relative group bg-black"
        >
            {/* Background Gradient Effect */}
             <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <motion.div 
                style={{ scale, opacity }}
                className="w-full max-w-4xl flex flex-col gap-12 relative z-10"
            >
                
                {/* Visual Representation (Substitute for Image) */}
                <div 
                    onClick={() => onSelect(service.id)}
                    className="w-full h-[40vh] md:h-[500px] bg-neutral-900 border border-white/10 rounded-2xl relative overflow-hidden cursor-pointer group/image"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 via-black to-black opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <service.icon 
                            className="w-32 h-32 md:w-48 md:h-48 text-brand-purple opacity-50 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-700 ease-out" 
                            strokeWidth={1}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            {service.title}
                        </h3>
                    </div>

                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                        {service.description}
                    </p>

                    {/* Features / Tags */}
                    <div className="flex flex-wrap gap-2">
                        {service.features?.map((feature: string, i: number) => (
                             <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-brand-purple/20 hover:border-brand-purple/30 transition-colors cursor-default">
                                {feature}
                             </span>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
