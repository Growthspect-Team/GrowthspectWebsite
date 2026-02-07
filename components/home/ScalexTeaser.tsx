import React, { useRef, useState } from 'react';
import { ArrowRight, Megaphone, PenTool, ShoppingCart, Activity, Users, Calendar } from 'lucide-react';
import { Section, Container, FadeIn, Heading, Text, Button } from '../UI';
import { useLanguage } from '../LanguageContext';
import { Spotlight } from '../ui/spotlight';

export const ScalexTeaser = ({ onNavigate }: { onNavigate: () => void }) => {
  const { t } = useLanguage();
  const fadeContainerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fadeContainerRef.current) return;
    
    const rect = fadeContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Section id="scalex" className="bg-brand-black border-t border-white/5 relative overflow-hidden">
      {/* Background Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              <span className="text-brand-purple font-mono text-xs uppercase tracking-widest font-semibold drop-shadow-[0_0_8px_rgba(136,37,237,0.5)]">
                {t('scalex.teaser.label')}
              </span>
            </div>

            <Heading level="h2" className="mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-purple to-brand-purple/60 drop-shadow-[0_0_25px_rgba(136,37,237,0.4)]">SCALEX:</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                {t('scalex.teaser.title')}
              </span>
            </Heading>

            <Text className="mb-8 text-lg max-w-lg text-gray-400 leading-relaxed">
              {t('scalex.teaser.description')}
            </Text>

            <Button 
              onClick={onNavigate} 
              className="group bg-gradient-to-r from-brand-purple to-[#a855f7] hover:opacity-90 text-white rounded-full px-8 py-4 font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] border-none"
              variant="primary"
            >
              <span className="relative z-10 flex items-center">
                {t('scalex.teaser.cta')} 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </FadeIn>

          <FadeIn delay={0.2} className="relative perspective-1000" >
            <div 
              ref={fadeContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden group hover:border-brand-purple/30 transition-all duration-200 preserve-3d"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 mask-image-[radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

              {/* Central Planet */}
              <div className="relative z-20 w-28 h-28 bg-[#0B0B0C] border border-brand-purple/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(136,37,237,0.3)] group-hover:shadow-[0_0_60px_rgba(136,37,237,0.5)] transition-all duration-500 transform group-hover:scale-105">
                 <div className="absolute inset-0 rounded-full bg-brand-purple/10 animate-pulse" />
                 <span className="text-4xl font-display font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">S</span>
              </div>

              {/* Orbit Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                 <div className="w-[280px] h-[280px] rounded-full border border-dashed border-white/30" />
              </div>

              {/* Orbiter Container */}
              <div className="absolute inset-0 animate-[spin_60s_linear_infinite] group-hover:[animation-play-state:paused]">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-2xl bg-[#0F0F10]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 z-10 hover:text-white hover:border-brand-purple hover:bg-brand-purple/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(136,37,237,0.3)] transition-all duration-300 cursor-pointer"
                    style={{ transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)` }}
                  >
                    {i === 0 && <Megaphone className="w-6 h-6" />}
                    {i === 1 && <PenTool className="w-6 h-6" />}
                    {i === 2 && <ShoppingCart className="w-6 h-6" />}
                    {i === 3 && <Activity className="w-6 h-6" />}
                    {i === 4 && <Users className="w-6 h-6" />}
                    {i === 5 && <Calendar className="w-6 h-6" />}
                  </div>
                ))}
              </div>

              {/* Inner Decorative Rings */}
              <div className="absolute inset-0 rounded-full border border-brand-purple/5 scale-[0.6]" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};
