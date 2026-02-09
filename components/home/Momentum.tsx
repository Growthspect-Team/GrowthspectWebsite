import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../UI';
import { ArrowUpRight, BarChart3, Star, Zap, Gauge, Layers } from 'lucide-react';

export const Momentum = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="w-full bg-brand-black py-24 lg:py-32 relative overflow-hidden text-white border-y border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,50,255,0.05),transparent_40%)]" />

            <Container className="relative z-10">
                {/* 3-Column Header Layout like requested */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-24 items-start">
                    
                    {/* Col 1: Main Title */}
                    <div className="lg:col-span-1">
                        <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight leading-[1.05] text-white">
                            Rychlý start. <br />
                            Snadný růst.
                        </h2>
                    </div>

                    {/* Col 2: Feature 1 */}
                    <div className="lg:pl-8">
                        <Gauge className="w-6 h-6 text-brand-primary mb-6" />
                        <h3 className="text-xl font-medium text-white mb-3">Rychleji díky AI</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Nejsme jen vývojáři, jsme architekti digitálních produktů. Díky AI-first přístupu a modernímu stacku dodáváme robustní aplikace v rekordním čase – bez technického dluhu a zbytečné byrokracie.
                        </p>
                    </div>

                    {/* Col 3: Feature 2 */}
                    <div className="lg:pl-8">
                        <Layers className="w-6 h-6 text-brand-primary mb-6" />
                        <h3 className="text-xl font-medium text-white mb-3">Partnerství s vizí</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Přinášíme "Founder's mindset" do každého projektu. Nečekáme na zadání, ale proaktivně hledáme cesty, jak váš byznys posunout dál. Flexibilně škálujeme tým podle toho, co váš růst právě vyžaduje.
                        </p>
                    </div>

                </div>



            </Container>
        </section>
    );
};
