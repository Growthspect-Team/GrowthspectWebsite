import React from 'react';
import { ArrowRight, Megaphone, PenTool, ShoppingCart, Activity, Users, Calendar } from 'lucide-react';
import { Section, Container, FadeIn, Heading, Text, Button } from '../UI';
import { useLanguage } from '../LanguageContext';

export const ScalexTeaser = ({ onNavigate }: { onNavigate: () => void }) => {
  const { t } = useLanguage();
  return (
    <Section id="scalex" className="bg-brand-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent opacity-30" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              <span className="text-brand-purple font-mono text-xs uppercase tracking-widest font-semibold">{t('scalex.teaser.label')}</span>
            </div>

            <Heading level="h2" className="mb-6">
              <span className="text-brand-purple drop-shadow-[0_0_20px_rgba(136,37,237,0.5)]">SCALEX:</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {t('scalex.teaser.title')}
              </span>
            </Heading>

            <Text className="mb-8 text-lg max-w-lg">
              {t('scalex.teaser.description')}
            </Text>

            <Button onClick={onNavigate} className="group">
              {t('scalex.teaser.cta')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden group hover:border-brand-purple/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

              <div className="relative z-20 w-24 h-24 bg-[#0B0B0C] border border-brand-purple/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(136,37,237,0.2)] group-hover:shadow-[0_0_50px_rgba(136,37,237,0.4)] transition-shadow duration-500">
                <div className="text-2xl font-display font-bold text-white tracking-tighter">S</div>
              </div>

              <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-xl bg-[#1A1A1C] border border-white/10 flex items-center justify-center text-gray-400 z-10 hover:text-white hover:border-brand-purple/50 hover:bg-brand-purple/10 transition-all duration-300"
                    style={{ transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)` }}
                  >
                    {i === 0 && <Megaphone className="w-5 h-5" />}
                    {i === 1 && <PenTool className="w-5 h-5" />}
                    {i === 2 && <ShoppingCart className="w-5 h-5" />}
                    {i === 3 && <Activity className="w-5 h-5" />}
                    {i === 4 && <Users className="w-5 h-5" />}
                    {i === 5 && <Calendar className="w-5 h-5" />}
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.7]" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.4]" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};
