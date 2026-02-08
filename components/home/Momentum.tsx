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
                        <h3 className="text-xl font-medium text-white mb-3">Rychlost bez kompromisů</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Dodáváme v řádu dnů, ne měsíců. Náš optimalizovaný proces eliminuje zbytečnou byrokracii agenturního světa, zatímco zachovává prvotřídní kvalitu a smysl pro detail, který si vaše značka zaslouží.
                        </p>
                    </div>

                    {/* Col 3: Feature 2 */}
                    <div className="lg:pl-8">
                        <Layers className="w-6 h-6 text-brand-primary mb-6" />
                        <h3 className="text-xl font-medium text-white mb-3">Flexibilní spolupráce</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Zvolte si měsíční paušál pro kontinuální rozvoj nebo projektovou spolupráci pro specifické potřeby. Škárujte kapacity nahoru nebo dolů přesně podle toho, jak se vyvíjí váš byznys.
                        </p>
                    </div>

                </div>

                {/* 3. CARDS (Restored) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    
                    {/* Card 1 - AI Driven */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 relative flex flex-col justify-end group hover:bg-white/[0.05] transition-colors"
                    >
                         <div className="absolute top-8 right-8">
                            <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                         </div>
                         <div className="h-full flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-primary/20 to-purple-500/20 blur-xl absolute" />
                             <Zap className="w-16 h-16 text-white/80 relative z-10" strokeWidth={1} />
                         </div>
                         <div>
                             <h3 className="text-xl font-medium text-white mb-2">AI-Driven Vývoj</h3>
                             <p className="text-sm text-white/50">Využíváme nejnovější technologie pro radikální zrychlení vývoje bez kompromisů v kvalitě.</p>
                         </div>
                    </motion.div>

                    {/* Card 2 - Stats 3x */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 relative flex flex-col justify-between group hover:bg-white/[0.05] transition-colors overflow-hidden"
                    >
                        <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/3 w-64 h-64 border border-white/5 rounded-full" />
                        <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/3 w-48 h-48 border border-white/5 rounded-full" />
                        
                        <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-8">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="text-6xl font-sans font-bold text-white mb-2 tracking-tighter">
                                3x
                            </div>
                            <p className="text-white/50 font-medium">Rychlejší Time-to-Market</p>
                            <div className="w-full h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-brand-primary"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "75%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                     {/* Card 3 - Review / Social Proof */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 relative flex flex-col justify-end group hover:bg-white/[0.05] transition-colors"
                    >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0 rounded-2xl" />
                         {/* Placeholder for image if we had one, otherwise a nice gradient */}
                         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-[-1] rounded-2xl" />
                         
                         <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-xl tracking-tight">GROWTHSPECT</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-bold">4.9/5</span>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(i => (
                                            <Star key={i} className="w-3 h-3 fill-white text-white" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
                                <span>Domluvit audit</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                         </div>
                    </motion.div>

                </div>
            </Container>
        </section>
    );
};
