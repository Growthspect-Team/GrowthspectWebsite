import React from 'react';
import { Section, Container } from '../UI';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
    return (
        <Section className="bg-brand-black py-24 md:py-32 relative overflow-hidden">
            <Container>
                <div className="flex flex-col gap-12 lg:gap-24 relative z-10">
                    
                    {/* Top Text Content */}
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-20">
                         {/* Label */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/6 pt-2"
                        >
                             <span className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                                Kdo jsme?
                             </span>
                        </motion.div>

                        {/* Main Statement */}
                         <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:w-4/6"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-white leading-[1.15] tracking-tight text-center lg:text-left text-balance">
                                Nezávislé vývojové a designové studio. <span className="text-white/50">Tvoříme digitální budoucnost</span> pomocí AI a technologie.
                            </h2>
                            
                            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                                <button className="group relative pr-8 pl-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-[#a855f7] text-white font-semibold text-base transition-all duration-300 hover:opacity-90 active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]">
                                    O GrowthSpect
                                    <div className="relative w-4 h-4 overflow-hidden">
                                        <ArrowUpRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
                                        <ArrowUpRight className="absolute inset-0 w-full h-full -translate-x-[150%] translate-y-[150%] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>



                </div>
            </Container>
        </Section>
    );
};
