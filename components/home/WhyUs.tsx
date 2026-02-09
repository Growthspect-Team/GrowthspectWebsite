import React, { useRef } from 'react';
import { Container } from '../UI';
import { ArrowRight, Megaphone, PenTool, ShoppingCart, Activity, Users, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const WhyUs = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isDesktop, setIsDesktop] = React.useState(true);

    React.useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Animations
    // 1. Entrance (0 - 0.25)
    // Combined X animation: Slide In (-100% -> 0%) then Center Correction (0% -> -50%)
    const titleX = useTransform(scrollYProgress, 
        [0, 0.25, 0.35, 0.6], 
        ["-100%", "0%", "0%", "-50%"]
    );
    
    // Left movement: Starts at 0, moves to Center Line (100% of col width on Desktop, 50% on Mobile)
    const centerTarget = isDesktop ? "100%" : "50%";
    const titleLeft = useTransform(scrollYProgress, 
        [0, 0.25, 0.35, 0.6], 
        ["0%", "0%", "0%", centerTarget]
    );

    // Other left elements just slide in
    const leftElementsX = useTransform(scrollYProgress, [0, 0.25], ["-100%", "0%"]);
    const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

    // Right side slides in from right
    const rightX = useTransform(scrollYProgress, [0.05, 0.3], ["100%", "0%"]);
    const rightEntranceOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
    const rightScale = useTransform(scrollYProgress, [0.05, 0.3], [0.85, 1]);

    // 2. Transformation Phase (0.35 - 0.6)
    // Everything except title fades out
    const contentFadeOut = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);
    // Right side also fades out completely here
    const rightOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);
    
    // Title Scale
    const titleScale = useTransform(scrollYProgress, [0.35, 0.6], [1, 2.5]);

    // Parallax for the abstract shapes inside the card
    const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section 
            ref={containerRef} 
            className="w-full bg-brand-black min-h-[350vh] relative" 
        >
             <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                 {/* Subtle background glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[150px] rounded-full pointer-events-none" />

                 <Container className="w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center h-full">
                        
                        {/* Left Side - Slides in from left */}
                        <motion.div 
                            className="lg:pr-10 flex flex-col justify-center h-full relative z-20"
                        >
                            <motion.div style={{ x: leftElementsX, opacity: contentFadeOut }}>
                                <span className="font-mono text-xs tracking-[0.3em] uppercase mb-6 block bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent w-fit">
                                    ECOMMERCE GROWTH
                                </span>
                            </motion.div>
                            
                            <motion.h2 
                                style={{ 
                                    scale: titleScale,
                                    x: titleX,
                                    left: titleLeft,
                                    transformOrigin: "center center",
                                    position: "relative",
                                    width: "fit-content"
                                }}
                                className="text-5xl md:text-6xl lg:text-9xl font-sans font-bold text-white tracking-tighter leading-[0.9]"
                            >
                                SCALEX
                            </motion.h2>

                            <motion.div style={{ x: leftElementsX, opacity: contentFadeOut }}>
                                <p className="mt-8 text-xl text-gray-400 max-w-md leading-relaxed">
                                    Komplexní ekosystém pro akceleraci vašeho e-shopu. Audit, Design, Marketing a Expanze v jednom balíčku.
                                </p>
                                <button 
                                    onClick={() => navigate('/scalex')}
                                    className="mt-10 group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-[#a855f7] text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] w-fit"
                                >
                                    <span className="relative z-10">Objevit SCALEX</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Card slides in from right */}
                        <div className="h-full flex items-center py-20">
                            <motion.div 
                                style={{ 
                                    x: rightX,
                                    opacity: useTransform(scrollYProgress, (v) => Math.min(rightEntranceOpacity.get(), rightOpacity.get())), // Combine entrance and fade out
                                    scale: rightScale,
                                }}
                                className="relative w-full aspect-[4/3] lg:aspect-square bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between group shadow-2xl"
                            >
                                {/* Abstract Orbit Visual */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
                                    <motion.div 
                                        style={{ rotate: shapeRotate }}
                                        className="w-full h-full flex items-center justify-center opacity-30 md:opacity-60"
                                    >
                                        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                                            <div className="absolute inset-0 rounded-full border-[1px] border-brand-purple/20 transform rotate-45 scale-y-75" />
                                            <div className="absolute inset-0 rounded-full border-[1px] border-brand-purple/20 transform -rotate-45 scale-y-75" />
                                            <div className="absolute inset-4 md:inset-10 rounded-full border-[1px] border-white/5 transform rotate-12 scale-y-90" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-purple/30 blur-[100px] rounded-full" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card Content Top */}
                                <div className='relative z-10 pt-4 flex justify-between items-start'>
                                     <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1 text-xs font-mono text-brand-purple uppercase tracking-wider">
                                        All-in-One Solution
                                     </div>
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
                                    <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-lg">
                                        Propojujeme datovou analytiku s kreativním designem a výkonnostním marketingem. Výsledkem je udržitelný a predikovatelný růst.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                 </Container>
             </div>
        </section>
    );
};
