import React from 'react';
import { Section, Container, FadeIn } from '../UI';
import { useLanguage } from '../LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyUs = () => {
    const { t } = useLanguage();

    return (
        <Section className="bg-brand-black overflow-hidden py-24 select-none">
             <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                    {/* Content */}
                    <FadeIn direction="up" className="relative z-10 order-2 lg:order-1">
                        <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 block">
                            {t('whyus.label')}
                        </span>
                         <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-8">
                            {t('whyus.title')}
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                            {t('whyus.description')}
                        </p>
                        
                        <button className="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300">
                             <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                             {t('whyus.button')}
                        </button>
                    </FadeIn>

                    {/* Visual - Abstract Orbit */}
                    <FadeIn className="relative h-[400px] w-full flex items-center justify-center order-1 lg:order-2 perspective-[1000px]">
                        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                            
                            {/* Orbit Ring Container - Tilted */}
                            <motion.div 
                                initial={{ rotate: -15 }}
                                animate={{ rotate: -15 }}
                                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                            >
                                {/* The Ring itself - flattened by scaleY to look like 3D circle */}
                                <div className="absolute inset-0 rounded-full border-[3px] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] transform scale-y-[0.45]">
                                    
                                </div>

                                {/* Satellites - Need to counter-scale to look round */}
                                {/* Top-Rightish */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="absolute top-[15%] right-[15%] w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-400 shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20"
                                />

                                {/* Left */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="absolute top-[45%] left-[-5%] w-10 h-10 rounded-full bg-gradient-to-b from-gray-200 to-gray-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-0 opacity-80"
                                />

                                 {/* Bottom */}
                                 <motion.div 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="absolute bottom-[-2%] left-[45%] w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-400 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-30"
                                />

                            </motion.div>

                            {/* Central Sphere */}
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute z-10 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.2),0_10px_40px_rgba(0,0,0,0.3)]"
                            >
                                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
                            </motion.div>

                        </div>
                    </FadeIn>
                </div>
             </Container>
        </Section>
    );
}
