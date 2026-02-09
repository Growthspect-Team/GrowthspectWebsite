import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

export const VideoScrollSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Plynulejší průběh animace pomocí spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const vimeoId = "821037821";
    const vimeoHash = "5b0c8dac09";
    
    // Parametry pro náhled a plné přehrávání
    const previewSrc = `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&autoplay=1&loop=1&muted=1&background=1`;
    const fullSrc = `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&autoplay=1&title=0&byline=0&portrait=0`;

    // Změna: Větší rozsah pro smooth efekt (0.25)
    // Celková výška sekce snížena na 180vh pro "méně scrollu"
    const scale = useTransform(smoothProgress, [0, 0.2], [0.85, 1]);
    const borderRadius = useTransform(smoothProgress, [0, 0.2], ["2rem", "0rem"]);

    return (
        <div id="video-scroll-section" ref={containerRef} className="h-[180vh] relative w-full bg-brand-black">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ 
                        scale,
                        borderRadius
                    }}
                    className="relative w-full h-full overflow-hidden shadow-2xl bg-neutral-900"
                >
                    {!isPlaying ? (
                        <>
                            {/* Náhledové video (smyčka, bez zvuku) */}
                            <div className="absolute inset-0 pointer-events-none">
                                <iframe 
                                    src={previewSrc}
                                    className="w-full h-full scale-[1.2]" // Mírné zvětšení pro odstranění černých pruhů v background módu
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    title="Video Preview"
                                />
                            </div>
                            
                            {/* Overlay s tlačítkem Play */}
                            <div 
                                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer group z-20"
                                onClick={() => setIsPlaying(true)}
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1 }}
                                    className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
                                        <Play className="w-8 h-8 text-black fill-current ml-1" />
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    ) : (
                        /* Plné video (se zvukem a ovládáním) */
                        <iframe 
                            src={fullSrc}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Full Video"
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
};
