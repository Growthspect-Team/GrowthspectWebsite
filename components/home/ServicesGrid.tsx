import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Section, Container, FadeIn } from '../UI';
import { useLanguage } from '../LanguageContext';
import { services } from '../../lib/data';

export const ServicesGrid = ({ onSelectService }: { onSelectService: (id: string) => void }) => {
  const { t } = useLanguage();

  return (
    <Section id="services" className="bg-black relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <Container className="relative z-10">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
                Platformy
              </span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
                Komplexní <span className="text-gray-400">ekosystém</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Od autonomních AI agentů po enterprise infrastrukturu. Vše propojené, škálovatelné a připravené na růst.
            </p>
          </div>
        </FadeIn>

        {/* Services Grid - New Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, idx) => (
            <FadeIn
              key={service.id}
              delay={idx * 0.08}
              className="h-full"
            >
              <div
                onClick={() => onSelectService(service.id)}
                className="group relative h-full min-h-[320px] bg-white/[0.02] border border-white/5 p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
              >
                {/* Service Number */}
                <div className="absolute top-6 right-6 text-[80px] font-bold text-white/[0.03] leading-none select-none group-hover:text-white/[0.06] transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-brand-purple/50 group-hover:bg-brand-purple/10 transition-all duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-[calc(100%-120px)]">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-600 uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                      Více informací
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover line accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </FadeIn>
          ))}
        </div>

      </Container>
    </Section>
  );
};
