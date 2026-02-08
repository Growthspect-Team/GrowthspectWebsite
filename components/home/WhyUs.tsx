import React, { useRef } from 'react';
import { Container } from '../UI';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const WhyUs = () => {
    const navigate = useNavigate();
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
                                <span className="text-brand-purple font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                                    ECOMMERCE GROWTH
                                </span>
                                <h2 className="text-5xl md:text-6xl lg:text-9xl font-sans font-bold text-white tracking-tighter leading-[0.9]">
                                    SCALEX
                                </h2>
                                <p className="mt-8 text-xl text-gray-400 max-w-md leading-relaxed">
                                    Komplexní ekosystém pro akceleraci vašeho e-shopu. Audit, Design, Marketing a Expanze v jednom balíčku.
                                </p>
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
                                className="relative w-full aspect-[4/3] lg:aspect-square bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between group shadow-2xl"
                            >
                                {/* Abstract Orbit Visual - Reused/Adapted */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
                                    <motion.div 
                                        style={{ rotate: shapeRotate }}
                                        className="w-full h-full flex items-center justify-center opacity-30 md:opacity-60"
                                    >
                                        {/* Simplified Orbit for Background */}
                                        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                                            <div className="absolute inset-0 rounded-full border-[1px] border-brand-purple/20 transform rotate-45 scale-y-75" />
                                            <div className="absolute inset-0 rounded-full border-[1px] border-brand-purple/20 transform -rotate-45 scale-y-75" />
                                            <div className="absolute inset-4 md:inset-10 rounded-full border-[1px] border-white/5 transform rotate-12 scale-y-90" />
                                            
                                            {/* Glowing Center */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-purple/30 blur-[100px] rounded-full" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card Content Top */}
                                <div className='relative z-10 pt-4 flex justify-between items-start'>
                                     <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1 text-xs font-mono text-brand-purple uppercase tracking-wider">
                                        All-in-One Solution
                                     </div>
                                    {/* Icon Top Right */}
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-brand-purple/20 transition-colors duration-500">
                                        <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                                    </div>
                                </div>

                                {/* Card Content Bottom */}
                                <div className='relative z-10'>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-6 leading-tight tracking-tight">
                                        Maximalizujte svůj <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-violet-400 to-white">tržní potenciál</span>
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                                        Propojujeme datovou analytiku s kreativním designem a výkonnostním marketingem. Výsledkem je udržitelný a predikovatelný růst.
                                    </p>
                                    
                                    <button 
                                        onClick={() => navigate('/scalex')}
                                        className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
                                    >
                                        <span className="relative z-10">Objevit SCALEX</span>
                                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                 </Container>
             </div>
        </section>
    );
};
