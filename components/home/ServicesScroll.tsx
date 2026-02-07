import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { services } from "../../lib/data";
import { Section, Container, FadeIn } from "../UI";
import { ArrowRight } from "lucide-react";

export const ServicesScroll = ({ onSelectService }: { onSelectService: (id: string) => void }) => {
  const content = services.map((service) => ({
    title: service.title,
    description: (
      <div className="flex flex-col gap-4">
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          {service.description}
        </p>
        <button 
            onClick={() => onSelectService(service.id)}
            className="flex items-center gap-2 text-brand-purple hover:text-white transition-colors mt-4 text-xs font-mono uppercase tracking-wider group w-fit"
        >
            Více informací <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    ),
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-brand-purple/5 border border-brand-purple/20 backdrop-blur-sm rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-10 rounded-full bg-brand-purple/10 border border-brand-purple/20 glow-purple relative z-10 group-hover:scale-110 transition-transform duration-500">
            <service.icon className="w-20 h-20 text-brand-purple" strokeWidth={1} />
        </div>
      </div>
    ),
  }));

  return (
    <Section id="services" className="bg-black relative overflow-hidden py-10 md:py-20">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <Container className="relative z-10">
        <FadeIn>
           <div className="mb-12 md:mb-16">
             <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
                Platformy
             </span>
             <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6">
                Komplexní <span className="text-gray-400">ekosystém</span>
              </h2>
             <p className="text-gray-500 text-sm max-w-md leading-relaxed">
               Od autonomních AI agentů po enterprise infrastrukturu. Vše propojené, škálovatelné a připravené na růst.
             </p>
           </div>
        </FadeIn>
        
        <div className="w-full border border-white/5 rounded-2xl bg-white/[0.01]">
            <StickyScroll 
                content={content} 
                contentClassName="bg-black/50 border border-white/10 hidden md:flex items-center justify-center p-4" 
                className="h-[60vh] md:h-[40rem]"
            />
        </div>
      </Container>
    </Section>
  );
}
