import React, { useRef } from 'react';
import { Section, Container } from '../UI';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrandShape } from '../ui/brand-shape';

const aboutCards = [
    {
        id: "01",
        title: "Mindset Zakladatelů",
        description: "Nestavíme jen software, budujeme byznys. K vašemu projektu přistupujeme se stejnou péčí, dravostí a smyslem pro detail, jako k našim vlastním startupům.",
        variant: "sphere" as const,
        // Abstract fluid motion - representing adaptability and organic growth
        video: "https://assets.mixkit.co/videos/preview/mixkit-thick-purple-smoke-on-black-background-20822-large.mp4"
    },
    {
        id: "02",
        title: "Akcelerace pomocí AI",
        description: "Využíváme nejnovější AI nástroje pro radikální zrychlení vývoje a snížení nákladů. Co jiným trvá měsíce, my dodáváme v řádu týdnů, aniž bychom slevili z kvality.",
        variant: "prism" as const,
        // Tech data/particles - representing AI and speed
        video: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-holographic-interface-94-large.mp4"
    },
    {
        id: "03",
        title: "Design, Build & Scale",
        description: "Jsme s vámi od prvního nápadu až po globální expanzi. Navrhujeme, vyvíjíme a škálujeme robustní systémy, které jsou připraveny na nápor milionů uživatelů.",
        variant: "sphere" as const,
        // Structure/Geometric - representing building and scaling
        video: "https://assets.mixkit.co/videos/preview/mixkit-white-polygonal-network-structure-260-large.mp4"
    }
];

export const AboutSection = () => {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We have:
    // 1. Intro Section (~40vw on desktop)
    // 2. 3 Cards (~45vw each on desktop)
    // Gaps included roughly.
    // Total approximate width content: 40 + (3 * 45) = 175vw 
    // Viewport: 100vw
    // Scroll needed: -(175 - 100) = -75vw approx. 
    // Let's overshoot slightly to ensure padding/margin visibility: -85vw or use percentages relative to track.
    
    // Using simple viewport units for transform is often cleaner for "infinite" rails
    // On mobile, everything is stacked or larger. Let's optimize for desktop horizontal feel first.
    // We'll use a transform that moves the track to the left.
    
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]); 

    return (
        <section ref={targetRef} className="relative h-[250vh] bg-brand-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div 
                    style={{ x }}
                    className="flex items-center gap-8 md:gap-16 pl-6 md:pl-20 pr-20 w-max"
                >
                    {/* 1. Intro Slide */}
                    <div className="w-[85vw] md:w-[35vw] shrink-0 flex flex-col justify-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-6 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
                                KDO JSME?
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium text-white leading-[1.1] tracking-tight text-balance mb-8">
                                Partner pro digitální <span className="text-[#a855f7]">růst a AI.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                <span className="text-white">Měníme pravidla hry.</span> Stavíme na moderních technologiích a využíváme sílu AI k tvorbě řešení, která promění vaše výzvy v konkurenční výhodu.
                            </p>
                        </motion.div>
                    </div>

                    {/* 2. Cards Slides */}
                    {aboutCards.map((card, index) => (
                        <div 
                            key={card.id}
                            className="w-[90vw] md:w-[60vw] lg:w-[50vw] h-[75vh] md:h-[80vh] shrink-0"
                        >
                            <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500">
                                
                                {/* Background Number */}
                                <span className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-[8rem] font-oldschool font-bold text-white/5 select-none pointer-events-none transition-colors duration-300">
                                    {card.id}
                                </span>

                                {/* Visual Element - Fallback & layering */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                    <div className="scale-125 md:scale-150 opacity-60 group-hover:scale-[1.6] group-hover:opacity-80 transition-all duration-700 ease-out">
                                            <BrandShape variant={card.variant} />
                                    </div>
                                </div>

                                {/* Video Background Element */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <div className="relative w-full h-full">
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent z-20" />
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-screen"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        >
                                            <source src={card.video} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>

                                {/* Content Top (Empty for now) */}
                                <div className="relative z-10 w-full flex justify-end">
                                    {/* Maybe an icon or decorative dot */}
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                                
                                {/* Content Bottom */}
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-white mb-6 leading-[1.1]">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
                                        {card.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                    
                    {/* Padding at the end to ensure last card isn't flush against edge immediately if mapped incorrectly */}
                    <div className="w-[5vw] shrink-0" />
                </motion.div>
            </div>
        </section>
    );
};
