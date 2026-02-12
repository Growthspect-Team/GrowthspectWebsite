import React, { useRef } from 'react';
import { Section, Container, FadeIn } from '../UI';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrandShape } from '../ui/brand-shape';

const aboutCards = [
    {
        id: "01",
        title: "Mindset Zakladatelů",
        description: "Nestavíme jen software, budujeme byznys. K vašemu projektu přistupujeme se stejnou péčí, dravostí a smyslem pro detail, jako k našim vlastním startupům.",
        variant: "sphere" as const,
        video: "https://assets.mixkit.co/videos/preview/mixkit-thick-purple-smoke-on-black-background-20822-large.mp4"
    },
    {
        id: "02",
        title: "Akcelerace pomocí AI",
        description: "Využíváme nejnovější AI nástroje pro radikální zrychlení vývoje a snížení nákladů. Co jiným trvá měsíce, my dodáváme v řádu týdnů, aniž bychom slevili z kvality.",
        variant: "prism" as const,
        video: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-holographic-interface-94-large.mp4"
    },
    {
        id: "03",
        title: "Design, Build & Scale",
        description: "Jsme s vámi od prvního nápadu až po globální expanzi. Navrhujeme, vyvíjíme a škálujeme robustní systémy, které jsou připraveny na nápor milionů uživatelů.",
        variant: "sphere" as const,
        video: "https://assets.mixkit.co/videos/preview/mixkit-white-polygonal-network-structure-260-large.mp4"
    }
];

const AboutSectionMobile = () => (
    <section className="relative bg-brand-black py-20">
        <Container>
            <FadeIn>
                <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-5 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
                    KDO JSME?
                </span>
                <h2 className="text-3xl sm:text-4xl font-sans font-medium text-white leading-[1.1] tracking-tight text-balance mb-5">
                    Partner pro digitální <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#a855f7]">růst a AI.</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed max-w-md mb-10">
                    <span className="text-white">Měníme pravidla hry.</span> Stavíme na moderních technologiích a využíváme sílu AI k tvorbě řešení, která promění vaše výzvy v konkurenční výhodu.
                </p>
            </FadeIn>

            <div className="flex flex-col gap-6">
                {aboutCards.map((card, index) => (
                    <FadeIn key={card.id} delay={index * 0.1}>
                        <div className="relative w-full min-h-[320px] bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between group">
                            <span className="absolute bottom-4 right-4 text-5xl font-oldschool font-bold text-white/5 select-none pointer-events-none">
                                {card.id}
                            </span>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                <div className="scale-110 opacity-40">
                                    <BrandShape variant={card.variant} />
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent z-20" />
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-35 mix-blend-screen"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    >
                                        <source src={card.video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>

                            <div className="relative z-10 w-full flex justify-end">
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-sans font-medium text-white mb-3 leading-[1.1]">
                                    {card.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </Container>
    </section>
);

export const AboutSection = () => {
    const targetRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]); 

    // ---- MOBILE: Vertical stacked layout ----
    if (isMobile) {
        return <AboutSectionMobile />;
    }

    // ---- DESKTOP: Horizontal scroll experience ----
    return (
        <section ref={targetRef} className="relative h-[250vh] bg-brand-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div 
                    style={{ x }}
                    className="flex items-center gap-16 pl-20 pr-20 w-max"
                >
                    {/* 1. Intro Slide */}
                    <div className="w-[35vw] shrink-0 flex flex-col justify-center">
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
                            <h2 className="text-5xl lg:text-7xl font-sans font-medium text-white leading-[1.1] tracking-tight text-balance mb-8">
                                Partner pro digitální <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#a855f7]">růst a AI.</span>
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
                            className="w-[50vw] h-[80vh] shrink-0"
                        >
                            <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-[2.5rem] p-12 overflow-hidden flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500">
                                
                                {/* Background Number */}
                                <span className="absolute bottom-12 right-12 text-[8rem] font-oldschool font-bold text-white/5 select-none pointer-events-none transition-colors duration-300">
                                    {card.id}
                                </span>

                                {/* Visual Element */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                    <div className="scale-150 opacity-60 group-hover:scale-[1.6] group-hover:opacity-80 transition-all duration-700 ease-out">
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

                                <div className="relative z-10 w-full flex justify-end">
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <h3 className="text-4xl lg:text-5xl font-sans font-medium text-white mb-6 leading-[1.1]">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
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
