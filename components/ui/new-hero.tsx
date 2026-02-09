import React, { Suspense, lazy, useRef } from "react";
import { useLanguage } from "../LanguageContext";
import { Button } from "./button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Spotlight } from "./spotlight";
import { motion, useScroll, useTransform } from "framer-motion";
import TubesCursor from "./tubes-cursor";

interface NewHeroProps {
    onViewProjects?: () => void;
}

export function NewHero({ onViewProjects }: NewHeroProps) {
    const { t } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-sans">
            {/* Background Animation */}
            
            <motion.div style={{ opacity }} className="absolute inset-0 z-0">
                <TubesCursor />
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
            </motion.div>

             <motion.div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                {/* Parallax layer if needed */}
             </motion.div>

            {/* CONTENT LAYER */}
            <motion.div 
                className="relative z-10 grid grid-cols-1 lg:grid-cols-[fr_2fr] gap-12 items-center h-full px-4 max-w-7xl mx-auto pt-20 w-full"
            >
                <div className="flex flex-col items-start text-left justify-center">
                    {/* Hero Text */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-4xl lg:text-[92px] font-sans font-bold tracking-tight text-white mb-10 leading-[1.15]"
                    >
                        {t('hero.title.part1')} <br />
                        <span className="relative ">
                            <span className="text-[#a855f7]">
                                {t('hero.title.part2')}
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="text-lg md:text-[26px] text-gray-400 max-w-2xl mb-12 leading-[1.25] font-light"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="group relative overflow-hidden h-14 px-8 text-base font-medium tracking-tight transition-all bg-[linear-gradient(90deg,#8825ed,#ae1fed)] hover:opacity-90 text-white border-0 rounded-full shadow-[0_0_20px_rgba(136,37,237,0.4)]">
                            <span className="relative z-10 flex items-center">
                                {t('hero.cta.consult')} 
                                <div className="relative w-5 h-5 ml-2 overflow-hidden">
                                    <ArrowRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-[150%]" />
                                    <ArrowRight className="absolute inset-0 w-full h-full -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                                </div>
                            </span>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="group h-14 px-8 text-base font-medium tracking-tight border-white/20 bg-transparent hover:bg-transparent transition-all text-white rounded-full overflow-hidden"
                            onClick={onViewProjects}
                        >
                            <span className="flex items-center gap-2">
                                {t('hero.cta.projects')}
                                <div className="relative w-5 h-5 overflow-hidden">
                                    <ArrowUpRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full" />
                                    <ArrowUpRight className="absolute inset-0 w-full h-full -translate-x-full translate-y-full transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                                </div>
                            </span>
                        </Button>
                    </motion.div>
                </div>

                {/* Spacer for the right side graphic */}
                <div className="hidden lg:block w-full h-full"></div>
            </motion.div>

            {/* Subtle radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
    );
}
