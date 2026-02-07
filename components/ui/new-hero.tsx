import React, { Suspense, lazy, useRef, useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import { Button } from "./button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Spotlight } from "./spotlight";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

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

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    
    // Mouse tracking for spotlight effect
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent) {
      let { left, top } = currentTarget.getBoundingClientRect();
      
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
        <div 
            ref={ref} 
            className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-sans group"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Mouse Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(168, 85, 247, 0.12),
                        transparent 80%
                        )
                    `,
                }}
            />

            {/* Background Animation */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 opacity-40">
                
                {/* Spotlight Effects */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
            </motion.div>

            {/* CONTENT LAYER */}
            <motion.div style={{ y: textY }} className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center max-w-7xl pt-20">

                {/* Hero Text */}
                <h1 className="text-4xl lg:text-[82px] font-sans font-bold tracking-tight text-white mb-14 leading-[1.25] uppercase">
                    {t('hero.title.part1')} <br />
                    <span className="relative">
                        <span className="text-[#a855f7]">
                            {t('hero.title.part2')}
                        </span>
                        {/* Custom AI Sparkles */}
                        <div className="absolute -top-8 -right-12 lg:-right-24 lg:-top-10 flex gap-0 animate-pulse">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple w-8 h-8 lg:w-16 lg:h-16">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400 w-5 h-5 lg:w-10 lg:h-10 mt-4 -ml-2">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                            </svg>
                        </div>
                    </span>
                </h1>

                <p className="text-lg md:text-[24px] text-gray-400 max-w-3xl mb-16 leading-[1.25] font-light opacity-80">
                    {t('hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="h-14 px-8 text-base font-bold tracking-tight transition-all bg-gradient-to-r from-brand-purple to-[#a855f7] hover:opacity-90 text-white border-0 rounded-full shadow-[0_0_20px_rgba(136,37,237,0.4)]">
                        {t('hero.cta.consult')} <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="group h-14 px-8 text-base font-bold tracking-tight border-white/20 bg-transparent hover:bg-transparent transition-all text-white rounded-full overflow-hidden"
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
                </div>
            </motion.div>

            {/* Subtle radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
    );
}
