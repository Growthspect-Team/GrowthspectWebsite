import React, { useRef } from 'react';
import { Container } from '../UI';
import { useLanguage } from '../LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const WhyUs = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    
    // Track scroll progress of the entire tall section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animations driven by scroll progress
    // detailed animation for the card coming into view
    // 0 -> 0.4: Card moves up into place
    const cardY = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"]);
    const cardScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]); // Fades in slightly faster
    
    // Parallax for the abstract shapes inside the card
    const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

    return (
        <section 
            ref={containerRef} 
            className="w-full bg-brand-black min-h-[300vh] relative" 
        >
             <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                 <Container className="w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center h-full">
                        
                        {/* Left Side - Sticky Title */}
                        <div className="lg:pr-10 flex flex-col justify-center h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-gray-500 font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                                    {t('whyus.label')}
                                </span>
                                <h2 className="text-5xl md:text-6xl lg:text-8xl font-sans font-bold text-white tracking-tight leading-[0.9]">
                                    {t('whyus.title')}
                                </h2>
                            </motion.div>
                        </div>

                        {/* Right Side - Scrolling/Revealing Card */}
                        <div className="h-full flex items-center py-20"> {/* Wrapper to center card vertically */}
                            <motion.div 
                                style={{ 
                                    y: cardY,
                                    scale: cardScale,
                                    opacity: cardOpacity
                                }}
                                className="relative w-full aspect-[4/3] lg:aspect-square bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between group shadow-2xl"
                            >
                                {/* Abstract Orbit Visual - Reused/Adapted */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
                                    <motion.div 
                                        style={{ rotate: shapeRotate }}
                                        className="w-full h-full flex items-center justify-center opacity-30 md:opacity-60"
                                    >
                                        {/* Simplified Orbit for Background */}
                                        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                                            <div className="absolute inset-0 rounded-full border-[1px] border-white/20 transform rotate-45 scale-y-75" />
                                            <div className="absolute inset-0 rounded-full border-[1px] border-white/20 transform -rotate-45 scale-y-75" />
                                            <div className="absolute inset-4 md:inset-10 rounded-full border-[1px] border-white/10 transform rotate-12 scale-y-90" />
                                            
                                            {/* Glowing Center */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-purple/20 blur-[80px] rounded-full" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card Content Top */}
                                <div className='relative z-10 pt-4 flex justify-end'>
                                    {/* Icon Top Right */}
                                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    </div>
                                </div>

                                {/* Card Content Bottom */}
                                <div className='relative z-10'>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-6 leading-tight tracking-tight">
                                        We help our clients to <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">shine online</span>
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                                        {t('whyus.description')}
                                    </p>
                                    
                                    <button className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        <span className="relative z-10">{t('whyus.button')}</span>
                                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                 </Container>
             </div>
        </section>
    );
}
