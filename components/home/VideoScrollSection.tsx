import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

export const VideoScrollSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const vimeoId = "821037821";
    const vimeoHash = "5b0c8dac09";
    
    // Přidáno playsinline=1 pro lepší podporu na iOS
    const previewSrc = `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&autoplay=1&loop=1&muted=1&background=1&playsinline=1`;
    const fullSrc = `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&autoplay=1&title=0&byline=0&portrait=0&playsinline=1`;

    // Mobile: smaller scale range, shorter scroll
    const scale = useTransform(smoothProgress, [0, 0.2], [isMobile ? 0.92 : 0.85, 1]);
    const borderRadius = useTransform(smoothProgress, [0, 0.2], [isMobile ? "1rem" : "2rem", "0rem"]);

    return (
        <div id="video-scroll-section" ref={containerRef} className={`${isMobile ? 'h-auto py-12 md:py-24' : 'h-[180vh]'} relative w-full bg-brand-black`}>
            <div className={`${isMobile ? 'relative w-full flex items-center justify-center px-4' : 'sticky top-0 h-screen overflow-hidden flex items-center justify-center'}`}>
                <motion.div
                    style={{ 
                        scale: isMobile ? 1 : scale,
                        borderRadius: isMobile ? "1rem" : borderRadius
                    }}
                    className={`relative w-full overflow-hidden shadow-2xl bg-neutral-900 ${isMobile ? 'aspect-video w-full max-w-[90vw]' : 'h-full'}`}
                >
                    {!isPlaying ? (
                        <>
                            {/* Náhledové video (smyčka, bez zvuku) */}
                            <div className="absolute inset-0 pointer-events-none">
                                <iframe 
                                    src={previewSrc}
                                    className="w-full h-full scale-[1.2] md:scale-[1.2]"
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
                                    className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg"
                                >
                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
                                        <Play className="w-5 h-5 md:w-8 md:h-8 text-black fill-current ml-0.5" />
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
